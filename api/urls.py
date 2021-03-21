from django.urls import path, include
from . import views
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('homework', views.HomeworkViewSet, 'homework')
router.register('todo', views.TodoViewSet, 'todo')
router.register('student', views.StudentViewSet, 'student')

urlpatterns = [
  path('', include(router.urls)),
  path('auth/register/', views.RegistrationAPI.as_view()),
  path('auth/login/', views.LoginAPI.as_view()),
  path('auth/user/', views.UserAPI.as_view()),
  path('auth/logout', knox_views.LogoutView.as_view())
]