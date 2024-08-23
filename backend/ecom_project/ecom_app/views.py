from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from .products import products  #dummy data
from .models import Products
from .serializer import MyTokenObtainPairSerializer, ProdcutSerializers, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import  UserSeralizerWithToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User



@api_view(['GET'])
# Create your views here.
def getRoutes(request):
    return Response("Hi")

@api_view(['GET'])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProdcutSerializers(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Products.objects.get(_id=pk)
    serializer = ProdcutSerializers(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserView(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

