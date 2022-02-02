from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import IsAdminUser
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import TodoViewSet

router = DefaultRouter()
router.register('todos', TodoViewSet)

schema_view = get_schema_view(
    openapi.Info(
       title="Dekoratar API",
       default_version='v1',
       description="Dekoratar",
       terms_of_service="https://www.google.com/policies/terms/",
       contact=openapi.Contact(email="contact@snippets.local"),
       license=openapi.License(name="BSD License"),
    ),
   public=True,
   permission_classes=(IsAdminUser, ),
)


urlpatterns = [
    path('', include(router.urls)),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0)),
]