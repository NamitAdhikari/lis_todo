from pyexpat import model
from django.contrib import admin

from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    model = Todo
    list_display = ['description', 'target_date', ]

admin.site.register(Todo, TodoAdmin)