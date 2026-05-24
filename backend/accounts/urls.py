from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    RoleViewSet,
    PermissionViewSet,
    PermissionGroupViewSet,
    UserViewSet,
    dashboard_stats,
    password_reset,
    profile,
)

router = DefaultRouter()
router.register(r'roles', RoleViewSet, basename='role')
router.register(r'permissions', PermissionViewSet, basename='permission')
router.register(r'permission-groups', PermissionGroupViewSet, basename='permission-group')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password-reset/', password_reset, name='password-reset'),
    path('profile/', profile, name='profile'),
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
    path('', include(router.urls)),
]