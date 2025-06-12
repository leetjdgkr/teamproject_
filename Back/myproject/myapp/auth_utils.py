from django.contrib.auth.hashers import check_password
from .models import User_Login_Info, Admin_Login_Info
from django.forms.models import model_to_dict

def check_user_credentials(user_id, password):
    try:
        user = User_Login_Info.objects.get(user_id=user_id)
        if check_password(password, user.password):  # 평문 vs 해시 비교
            return True, user.user_name, user.employee_number
    except User_Login_Info.DoesNotExist:
        pass
    return False, None, None

def check_admin_credentials(admin_id, password, admin_code):
    try:
        admin = Admin_Login_Info.objects.get(admin_id=admin_id)
        if check_password(password, admin.password) and admin.admin_code == admin_code:
            # 로그인 성공 시, user_id 매칭되는 사용자 정보 가져오기
            all_users = User_Login_Info.objects.all()
            
            user_data_list = []
            for user in all_users:
                user_dict = model_to_dict(user)
                user_dict.pop('user_id', None)
                user_dict.pop('password', None)
                user_data_list.append(user_dict)
            
            return True, user_data_list
    except (Admin_Login_Info.DoesNotExist, User_Login_Info.DoesNotExist):
        pass
    return False, None