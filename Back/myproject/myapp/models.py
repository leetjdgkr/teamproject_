from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)  # 항목 이름
    description = models.TextField()  # 항목 설명

    def __str__(self):
        return self.name  # Item의 이름을 반환


class Info(models.Model):
    user_id = models.CharField(max_length=50)
    password = models.CharField(max_length=100, default='abcd1234')