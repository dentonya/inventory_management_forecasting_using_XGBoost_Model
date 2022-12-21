"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from core.views import front,add_stock,view_stock,add_demand,view_demand,make_prediction,view_prediction,user_login

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("add_stock/",add_stock,name='add_stock_products'),
    path("login/", user_login, name='user_login'),
    path("view_stock/", view_stock, name='view_stock_products'),
    path("add_demand/",add_demand,name='add_product_demand'),
    path("view_demand/", view_demand, name='view_product_demand'),
    path("make_prediction/", make_prediction, name='make_prediction'),
    path("view_prediction/", view_prediction, name='view_prediction'),

]
