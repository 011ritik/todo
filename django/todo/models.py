from django.db import models

# Create your models here.


class Todo(models.Model):
    task = models.CharField(max_length=100)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task
