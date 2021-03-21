from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from knox.models import AuthToken

from .models import Homework, Todo, Student
from .serializers import HomeworkSerializer, TodoSerializer, StudentSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer



class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    authentication_class = [
        TokenAuthentication,
    ]
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = HomeworkSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    authentication_class = [
        TokenAuthentication,
    ]
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = TodoSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    authentication_class = [
        TokenAuthentication,
    ]
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = StudentSerializer