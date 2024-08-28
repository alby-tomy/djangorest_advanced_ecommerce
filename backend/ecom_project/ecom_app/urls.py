from django.urls import path, include
from .views import getRoutes, getProduct, getProducts, getUserProfiles, MyTokenObtainPairView, getUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView 
)
from .views import registerView


urlpatterns = [
    path('', getRoutes, name="getRoutes"),
    path('products/', getProducts, name="getProduct"),
    path('product/<str:pk>', getProduct, name="getProducts"),
    path('user/login/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/profile/', getUserProfiles, name="get-user-profile"),
    path('user/details/', getUserView, name="get-user-details"),
    path('user/registration/',registerView, name="registration"),
]