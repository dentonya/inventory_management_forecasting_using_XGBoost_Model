from django.db.models import fields
from rest_framework import serializers
from .models import Stock,Prediction,Demand,User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
        class Meta:
            model = Stock
            fields = '__all__'


class DemandSerializer(serializers.ModelSerializer):
        class Meta:
            model = Demand
            fields = '__all__'



class PredictionSerializer(serializers.ModelSerializer):
        class Meta:
             model = Prediction
             fields = '__all__'
