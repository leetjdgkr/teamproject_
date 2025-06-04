from django.contrib.auth.hashers import check_password
from .models import User_Login_Info, Admin_Login_Info

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
        user = Admin_Login_Info.objects.get(admin_id=admin_id)
        if check_password(password, user.password):  # 평문 vs 해시 비교
            return True
    except Admin_Login_Info.DoesNotExist:
        pass
    return False