from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item, User_Login
from .serializers import ItemSerializer, User_LoginSerializer
from .auth_utils import check_credentials

class BaseModelHandler(APIView):
    def handle_data(self, data_type, data):
        if data_type == 'item':
            serializer = ItemSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors

        elif data_type == 'user_login':
            serializer = User_LoginSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors
        elif data_type == 'check_login':
            user_id   = data.get('user_id')
            password  = data.get('password')
        
            if check_credentials(user_id, password):
                return {'message': 'Login successful'}
            else:
                return None, {'message': 'Invalid credentials'}

        return None, {'error': 'Unknown data_type'}

class ItemUserProfileHandler(BaseModelHandler):
    def post(self, request):
        print("받은 데이터:", request.data)

        data_type = request.data.get('data_type')
        data_content = request.data.get('data')

        serializer, instance = self.handle_data(data_type, data_content)

        if serializer:
            # serializer일 수도 있고 dict일 수도 있음
            response_data = (
                serializer.data if hasattr(serializer, 'data') else serializer
            )
            return Response({
                'message': f'{data_type} 처리 완료!',
                'data': response_data
            }, status=status.HTTP_200_OK)

        return Response(instance, status=status.HTTP_400_BAD_REQUEST)
