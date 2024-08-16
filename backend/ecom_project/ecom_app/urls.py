from django.urls import path, include
from .views import getRoutes, getProduct


urlpatterns = [
    path('', getRoutes, name="getRoutes"),
    path('products/', getProduct, name="getProduct"),
]
