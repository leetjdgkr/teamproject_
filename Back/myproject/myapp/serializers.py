# serializers.py
from rest_framework import serializers
from .models import Item, Info

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'  # 'id', 'name', 'description'이 자동으로 포함됨
        
class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'