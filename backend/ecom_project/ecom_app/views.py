from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from .products import products  #dummy data
from .models import Products
from .serializer import MyTokenObtainPairSerializer, ProdcutSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import  UserSeralizerWithToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db import IntegrityError

# for sending mails and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import TokenGenerator, generate_token
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View



@api_view(['GET'])
# Create your views here.
def getRoutes(request):
    return Response("Hi")

@api_view(['GET'])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProdcutSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Products.objects.get(_id=pk)
    serializer = ProdcutSerializer(product, many=False)
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


@api_view(['POST'])
def registerView(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['fname'],
            last_name=data['lname'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']), is_active = False
        )
        
        # generate token for sending mail
        email_subject = "Activate Your Account"
        message  = render_to_string(
            "activate.html",
            {
                'user':user,
                'domain':'127.0.0.1:8000',
                'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                'token':generate_token.make_token(user)
            }
        )
        
        # print(message)
        email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [data['email']])
        email_message.send()
         
        serializer = UserSeralizerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except IntegrityError:  # Handle specific exception
        message = {'details': "User with this email already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:  # General exception handling for other issues
        message = {'details': str(e)}
        print(e)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
        except Exception as identifier:
            user = None
        
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request,"successactivate.html")
        else:
            return render(request,"activatefailed.html")