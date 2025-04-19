from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ItemSerializer

class ItemList(APIView):
    def get(self, request):
        items = [
            {"id": 1, "name": "Item 1", "description": "Description 1"},
            {"id": 2, "name": "Item 2", "description": "Description 2"},
        ]
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Item
# from .serializers import ItemSerializer

# class ItemCreate(APIView):
#     def post(self, request):
#         serializer = ItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  # 데이터베이스에 저장
#             return Response(serializer.data, status=status.HTTP_201_CREATED)  # 성공적으로 저장되었으면 응답
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # 오류가 있으면 오류 응답
