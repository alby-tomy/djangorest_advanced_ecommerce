from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .products import products  #dummy data

from .models import Products
from .serializer import ProdcutSerializers


@api_view(['GET'])
# Create your views here.
def getRoutes(request):
    return Response("Hi")

@api_view(['GET'])
def getProduct(request):
    products = Products.objects.all()
    serializer = ProdcutSerializers(products, many=True)
    return Response(serializer.data)