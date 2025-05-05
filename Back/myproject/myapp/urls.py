# myapp/urls.py
from django.urls import path
from .views import ItemUserProfileHandler

urlpatterns = [
    path('items/', ItemUserProfileHandler.as_view(), name='item-userprofile-handler'),
]