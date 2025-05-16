from django.contrib.auth.hashers import check_password
from .models import User_Login

def check_credentials(user_id, password):
    try:
        user = User_Login.objects.get(user_id=user_id)
        if check_password(password, user.password):  # 평문 vs 해시 비교
            return True, user.user_name
    except User_Login.DoesNotExist:
        pass
    return False
