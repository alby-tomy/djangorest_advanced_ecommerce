from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products


@api_view(['GET'])
# Create your views here.
def getRoutes(request):
    return Response("Hi")

@api_view(['GET'])
def getProduct(request):
    return Response(products)