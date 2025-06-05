from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemSerializer, User_Login_InfoSerializer, Work_InfoSerializer
from .auth_utils import check_user_credentials, check_admin_credentials

class BaseModelHandler(APIView):
    def handle_data(self, data_type, data):
        if data_type == 'item':
            serializer = ItemSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors
        
        elif data_type == 'work_info':
            serializer = Work_InfoSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors

        elif data_type == 'user_login_info':
            serializer = User_Login_InfoSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors
    
        elif data_type == 'check_user_login':  # 'check_user_login으로 변경해야함'
             user_id  = data.get('id')
             password = data.get('password')
     
             success, user_name, employee_number = check_user_credentials(user_id, password)
     
             if success:
                 return {'success': True, 'message': 'Login successful', 'user_name': user_name, 'employee_number' : employee_number}, None
             else:
                 return None, {'success': False, 'message': 'Invalid credentials'}
             
        elif data_type == 'check_admin_login':
                 admin_id   = data.get('id')
                 password   = data.get('password')
                 admin_code = data.get('admin_code')
         
                 success, admin_name = check_admin_credentials(admin_id, password, admin_code)
         
                 if success:
                     return {'success': True, 'message': 'Login successful', 'admin_name': admin_name}, None
                 else:
                     return None, {'success': False, 'message': 'Invalid credentials'}

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