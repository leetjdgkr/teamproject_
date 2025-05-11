from django.contrib.auth.hashers import check_password
from .models import Info

def check_credentials(user_id, password):
    try:
        user = Info.objects.get(user_id=user_id)
        if check_password(password, user.password):  # 평문 vs 해시 비교
            return True
    except Info.DoesNotExist:
        pass
    return False
