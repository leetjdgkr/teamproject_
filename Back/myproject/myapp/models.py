from django.db import models
from django.contrib.auth.hashers import make_password

class Item(models.Model):
    name        = models.CharField(max_length=100)  # 항목 이름
    description = models.TextField()  # 항목 설명

    def __str__(self):
        return self.name  # Item의 이름을 반환


class User_Login_Info(models.Model):
    employee_number = models.CharField(max_length=50, primary_key=True)
    user_name       = models.CharField(max_length=50, default='홍길동')   # 유저 이름
    user_id         = models.CharField(max_length=50)
    password        = models.CharField(max_length=100)
    
    def save(self, *args, **kwargs):
        # 비밀번호가 해시되지 않은 상태일 때만 해시
        if not self.password.startswith('pbkdf2_'):  # Django 기본 prefix 체크
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class Admin_Login_Info(models.Model):
    admin_name = models.CharField(max_length=50)       # 관리자 이름
    admin_id   = models.CharField(max_length=50)       # 관리자 ID
    password   = models.CharField(max_length=100)      # 관리자 비밀번호
    admin_code = models.CharField(max_length=20)       # 설정한 인증번호

    def save(self, *args, **kwargs):
        # 비밀번호가 해시되지 않은 상태일 때만 해시
        if not self.password.startswith('pbkdf2_'):  # Django 기본 prefix 체크
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class Work_Info(models.Model):
    employee_number = models.ForeignKey(User_Login_Info, on_delete=models.CASCADE) # FK 선언
    user_name       = models.CharField(max_length=50)                              # 사용자 이름
    work_start      = models.DateTimeField()                                       # 작업 시작 시간 (날짜 + 시간)
    work_end        = models.DateTimeField()                                       # 작업 종료 시간 (날짜 + 시간)
    total_time      = models.CharField(max_length=20)                              # 일한 총 시간 (시간 간격)
    work_date       = models.DateField()                                           # 근무 날짜
    work_place      = models.CharField(max_length=100)                             # 근무 장소


class Work_Pay(models.Model):
    employee_number = models.ForeignKey(User_Login_Info, on_delete=models.CASCADE)  # FK 선언
    company         = models.CharField(max_length=50)                               # 회사명
    daily_wages     = models.IntegerField()                                         # 일급