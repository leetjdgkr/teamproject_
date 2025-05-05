from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item, Info
from .serializers import ItemSerializer, InfoSerializer

class BaseModelHandler(APIView):
    def handle_data(self, data_type, data):
        """
        데이터 유형에 맞는 모델과 serializer를 선택하여 처리하는 함수
        """
        if data_type == 'item':
            serializer = ItemSerializer(data=data)
            model = Item
        elif data_type == 'info':
            serializer = InfoSerializer(data=data)
            model = Info
        else:
            return None, None

        if serializer.is_valid():
            instance = serializer.save()  # 데이터베이스에 저장
            return serializer, instance

        return None, serializer.errors
    
class ItemUserProfileHandler(BaseModelHandler):
    def post(self, request):
        print("✅ 받은 데이터:", request.data)

        data_type = request.data.get('type')
        data_content = request.data.get('data')  # 여기 추가!

        serializer, instance = self.handle_data(data_type, data_content)  # 수정된 부분!

        if serializer:
            return Response({
                'message': f'{data_type} 저장 완료!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(instance, status=status.HTTP_400_BAD_REQUEST)