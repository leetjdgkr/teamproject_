# serializers.py
from rest_framework import serializers
from .models import Item, User_Login

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'  # 'id', 'name', 'description'이 자동으로 포함됨
        
class User_LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Login
        fields = '__all__'