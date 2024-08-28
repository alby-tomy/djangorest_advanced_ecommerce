from rest_framework import serializers
from .models import Products
from django.contrib.auth.models import  User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ProdcutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
   
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']
        
    def get_name(self, obj):
        first_name = obj.first_name
        last_name = obj.last_name
        name = first_name +' '+ last_name
        if name == '':
            name = obj.username
        return name
    
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff
                

class UserSeralizerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User    
        fields = ['id','_id','username','email','name','isAdmin','token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSeralizerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data


