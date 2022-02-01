from django.db import models

# Create your models here.

class Todo(models.Model):
    description = models.TextField()
    target_date = models.DateField()

    def __str__(self):
        return self.description