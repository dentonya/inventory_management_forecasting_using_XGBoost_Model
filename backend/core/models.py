from django.db import models


# Create your models here.
#user
class User(models.Model):
    username = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=15, null=True)

#Stock Model
class Stock(models.Model):
    product_code = models.CharField(max_length=15, unique=True)
    warehouse = models.CharField(max_length=15, null=True)
    order = models.IntegerField( null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

#Demand Model
class Demand(models.Model):
    Date = models.DateField(auto_now_add=True)
    Warehouse = models.CharField(max_length=15, null=True)
    Product_Code = models.CharField(max_length=15, unique=True)
    Product_Category = models.IntegerField(unique=True)
    Order_Demand = models.IntegerField( null=True)

    def __str__(self):
        return self.product_code

#Prediction Model
class Prediction(models.Model):
    product_code = models.CharField(max_length=15)
    warehouse = models.CharField(max_length=15, null=True)
    predictions = models.IntegerField(null=True)

    def __str__(self):
        return self.product_code
