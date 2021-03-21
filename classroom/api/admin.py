from django.contrib import admin
from .models import Homework, Todo, Student


admin.site.register(Homework)
admin.site.register(Todo)
admin.site.register(Student)