from django.db import models
from datetime import date

class Homework(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField()
    is_editing = models.BooleanField(default=False)


class Todo(models.Model):
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    is_editing = models.BooleanField(default=False)


class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=1, null=True)
    note = models.CharField(max_length=255, null=True, blank=True)
    is_noting = models.BooleanField(default=False)