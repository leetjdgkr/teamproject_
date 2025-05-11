from django.db import models
from django.contrib.auth.hashers import make_password

class Item(models.Model):
    name = models.CharField(max_length=100)  # 항목 이름
    description = models.TextField()  # 항목 설명

    def __str__(self):
        return self.name  # Item의 이름을 반환


class Info(models.Model):
    user_id = models.CharField(max_length=50)
    password = models.CharField(max_length=100, default='abcd1234')
    
    def save(self, *args, **kwargs):
        # 비밀번호가 해시되지 않은 상태일 때만 해시
        if not self.password.startswith('pbkdf2_'):  # Django 기본 prefix 체크
            self.password = make_password(self.password)
        super().save(*args, **kwargs)