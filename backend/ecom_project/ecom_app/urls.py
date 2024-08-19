from django.urls import path, include
from .views import getRoutes, getProduct, getProducts


urlpatterns = [
    path('', getRoutes, name="getRoutes"),
    path('products/', getProducts, name="getProduct"),
    path('product/<str:pk>', getProduct, name="getProducts")
]
