from django.db import models
from django.contrib.auth.hashers import make_password

class Item(models.Model):
    name        = models.CharField(max_length=100)  # 항목 이름
    description = models.TextField()  # 항목 설명

    def __str__(self):
        return self.name  # Item의 이름을 반환


class User_Login(models.Model):
    user_name = models.CharField(max_length=50, default='홍길동')   # 유저 이름
    user_id   = models.CharField(max_length=50)
    password  = models.CharField(max_length=100)
    
    def save(self, *args, **kwargs):
        # 비밀번호가 해시되지 않은 상태일 때만 해시
        if not self.password.startswith('pbkdf2_'):  # Django 기본 prefix 체크
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class Admin_Login(models.Model):
    admin_name = models.CharField(max_length=50)       # 관리자 이름
    admin_id   = models.CharField(max_length=50)       # 관리자 ID
    password   = models.CharField(max_length=100)      # 관리자 비밀번호
    admin_code = models.CharField(max_length=20)       # 설정한 인증번호

    def save(self, *args, **kwargs):
        # 비밀번호가 해시되지 않은 상태일 때만 해시
        if not self.password.startswith('pbkdf2_'):  # Django 기본 prefix 체크
            self.password = make_password(self.password)
        super().save(*args, **kwargs)