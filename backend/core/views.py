import pickle

from django.contrib.auth import authenticate, login, logout
from django.http.response import JsonResponse
from django.shortcuts import render
import json
import pandas as pd
import json_tricks as jt
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import joblib
import xgboost as xgb
import numpy as np
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Stock, Prediction, Demand
from .serializers import StockSerializer, PredictionSerializer, DemandSerializer


# Create your views here.
def front(request):
    context = {}
    return render(request, "index.html", context)
#user login
api_view(['POST'])
def user_login(request):
    context ={}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'failed'})
    else:
        return JsonResponse({'status': 'failed'})

#logout
@api_view (['POST'])
def logout_view(request):
    logout(request)
    return JsonResponse({'success':'Successfully logged out'})


# add stock
@api_view(['POST'])
def add_stock(request):
    context = {}

    if request.method == 'POST':
        data = request.data
        serializer = StockSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            context['success'] = True
            context['message'] = 'Stock data added successfully'
            return Response(context, status=status.HTTP_201_CREATED)
        else:
            context['success'] = False
            context['message'] = "invalid data"
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


# view stock
@api_view(['GET'])
def view_stock(request):
    context = {}
    try:
        stock = Stock.objects.all()
    except Stock.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        stock = Stock.objects.all()
        serializer = StockSerializer(stock, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_demand(request):
    context = {}

    if request.method == 'POST':
        data = request.data
        serializer = DemandSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            context['success'] = True
            context['message'] = 'Added successfully'
            return Response(context, status=status.HTTP_201_CREATED)
        else:
            context['success'] = False
            context['message'] = "invalid data"
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


# view demand
@api_view(['GET'])
def view_demand(request):
    context = {}
    try:
        demand = Demand.objects.all()
    except Demand.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        demand = Demand.objects.all()
        serializer = DemandSerializer(demand, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# view predictions
@api_view(['GET'])
def view_prediction(request):
    context = {}
    try:
        predict = Prediction.objects.all()
    except Prediction.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        predict = Prediction.objects.all()
        serializer = PredictionSerializer(predict, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# predictions
@api_view(['GET'])
def make_prediction(request):
    data = Demand.objects.all()
    data_list = list(data.values())
    df = pd.DataFrame(data_list)
    print(df)
    ##future engeneering
    df['Date'] = pd.to_datetime(df['Date'], infer_datetime_format=True)
    df['year'] = df['Date'].dt.year
    df['month'] = df['Date'].dt.month
    df['day'] = df['Date'].dt.day
    df['week'] = df['Date'].dt.isocalendar().week.astype("int64")
    df['weekofyear'] = df['Date'].dt.weekofyear
    df['dayofweek'] = df['Date'].dt.dayofweek
    df['weekday'] = df['Date'].dt.weekday
    df['dayofyear'] = df['Date'].dt.dayofyear
    df['quarter'] = df['Date'].dt.quarter
    df['is_month_start'] = df['Date'].dt.is_month_start
    df['is_month_end'] = df['Date'].dt.is_month_end
    df['is_quarter_start'] = df['Date'].dt.is_quarter_start
    df['is_quarter_end'] = df['Date'].dt.is_quarter_end
    df['is_year_start'] = df['Date'].dt.is_year_start
    df['is_year_end'] = df['Date'].dt.is_year_end
    df['daily_avg'] = \
        df.groupby(['Product_Code', 'Warehouse', 'dayofweek'])[
            'Order_Demand'].transform('mean')
    df['monthly_avg'] = \
        df.groupby(['Product_Code', 'Warehouse', 'month'])[
            'Order_Demand'].transform('mean')
    df['mean_store_item_month'] = \
        df.groupby(['month', 'Product_Code', 'Warehouse'])[
            'Order_Demand'].transform("mean")
    df['item_month_sum'] = df.groupby(['month', 'Product_Code'])['Order_Demand'].transform(
        "sum")  # total demand of that item for all stores
    df['store_month_sum'] = \
        df.groupby(['month', 'Warehouse'])['Order_Demand'].transform(
            "sum")  # total sales  of that store for all items
    daily_avg = \
        df.groupby(['Product_Code', 'Warehouse', 'dayofweek'])[
            'Order_Demand'].mean().reset_index()

    df.groupby(['Product_Code', 'Warehouse', 'month'])[
        'Order_Demand'].mean().reset_index()

    df.groupby(['month', 'Product_Code', 'Warehouse'])[
        'Order_Demand'].mean().reset_index()
    item_month_sum = df.groupby(['month', 'Product_Code'])['Order_Demand'].sum().reset_index()
    store_month_sum = df.groupby(['month', 'Warehouse'])[
        'Order_Demand'].sum().reset_index()

    # Create mask for boolean values for train dataset
    df['is_month_start'] = df['is_month_start'].replace({True: 1, False: 0})
    df['is_month_end'] = df['is_month_end'].replace({True: 1, False: 0})
    df['is_quarter_start'] = df['is_quarter_start'].replace({True: 1, False: 0})
    df['is_quarter_end'] = df['is_quarter_end'].replace({True: 1, False: 0})
    df['is_year_start'] = df['is_year_start'].replace({True: 1, False: 0})
    df['is_year_end'] = df['is_year_end'].replace({True: 1, False: 0})

    # convert float to int
    df['daily_avg'] = df['daily_avg'].astype(np.int64)
    df['monthly_avg'] = df['monthly_avg'].astype(np.int64)
    df['mean_store_item_month'] = df['mean_store_item_month'].astype(np.int64)
    # train['store_item_shifted_365']=train['store_item_shifted_365'].astype(np.int64)
    print(df)
    df_data = df.drop(['Date'], axis=1)
    df_data['Warehouse'] = df_data['Warehouse'].astype(int, errors='ignore')
    df_data['Product_Code'] = df_data['Product_Code'].astype(int, errors='ignore')
    df_data = df_data.drop(['Order_Demand'], axis=1)
    df_data["Warehouse"] = pd.to_numeric(df_data["Warehouse"], errors='coerce')
    df_data["Product_Code"] = pd.to_numeric(df_data["Product_Code"], errors='coerce')
    # df_data["Date"] = pd.to_numeric(df_data["Date"], errors='coerce')
    df_data = df_data.drop(["id"], axis=1)

    test_data = pd.DataFrame(df.pop('Order_Demand'))
    print(test_data)
    pro_code = pd.DataFrame()
    pro_code = pro_code.assign(Product_Code=df_data['Product_Code'])
    print(pro_code)
    warehouse =pd.DataFrame()
    warehouse = warehouse.assign(Warehouse=df_data['Warehouse'])
    print(warehouse)



    dmatrix = xgb.DMatrix(df_data, enable_categorical=True)
    print(dmatrix)

    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    prediction = model.predict(dmatrix)

    prediction = prediction.tolist()
    pred =[int(item) for item in prediction]
    print(pred)


    #pro_code =pro_code.values.tolist()
    pro_code =pro_code['Product_Code'].astype(int).tolist()

    warehouse = warehouse['Warehouse'].astype(int).tolist()
    for x in zip(warehouse,pred,pro_code):
        Prediction.objects.create(warehouse=x[0],predictions=x[1],product_code=x[2])



    return JsonResponse(prediction, safe=False)
