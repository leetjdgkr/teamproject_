# myapp/urls.py
from django.urls import path
from .views import ItemList

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
]


# from django.urls import path
# from .views import ItemList, ItemCreate

# urlpatterns = [
#     path('api/items/', ItemList.as_view(), name='item-list'),  # GET 요청
#     path('api/items/create/', ItemCreate.as_view(), name='item-create'),  # POST 요청
# ]
