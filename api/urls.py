from django.urls import path
from .import views
urlpatterns = [
   
    path('',views.Home,name='home'),
    path('list/',views.List,name='list'),
    path('detail/<int:pk>',views.Detail,name='detail'),
    path('create/',views.Create,name='create'),
    path('update/<int:pk>',views.Update,name='update'),
    path('delete/<int:pk>',views.Delete,name='delete')
]
