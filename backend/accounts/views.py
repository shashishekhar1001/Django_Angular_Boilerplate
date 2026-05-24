from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from .models import CustomUser, Permission, Role, PermissionGroup
from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    RoleSerializer,
    PermissionGroupSerializer,
    PermissionSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset(request):
    """Accept an email and return a success message (simulated email sending)."""
    email = request.data.get('email', '')
    if not email:
        return Response(
            {'detail': 'Email address is required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    # In production, send an actual email here.
    return Response({'detail': 'Password reset link has been sent to your email address.'})


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    """Get or update the current user's profile (theme preference, etc.)."""
    user = request.user

    if request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    """Return aggregate stats for the dashboard."""
    now = timezone.now()
    last_7_days = now - timedelta(days=7)

    user_count = CustomUser.objects.count()
    role_count = Role.objects.count()
    permission_group_count = PermissionGroup.objects.count()
    recent_registrations = CustomUser.objects.filter(
        date_joined__gte=last_7_days
    ).count()

    recent_users = CustomUser.objects.all().order_by('-date_joined')[:5]
    activities = []
    for user in recent_users:
        activities.append({
            'title': f'New user registered: {user.email}',
            'time': _relative_time(user.date_joined, now),
            'user_id': user.id,
        })

    return Response({
        'user_count': user_count,
        'role_count': role_count,
        'permission_group_count': permission_group_count,
        'recent_registrations': recent_registrations,
        'recent_activities': activities,
    })


def _relative_time(dt, now):
    """Return a human-readable relative time string."""
    diff = now - dt
    if diff < timedelta(minutes=1):
        return 'Just now'
    elif diff < timedelta(hours=1):
        mins = int(diff.seconds / 60)
        return f'{mins} minute{"s" if mins != 1 else ""} ago'
    elif diff < timedelta(days=1):
        hours = int(diff.seconds / 3600)
        return f'{hours} hour{"s" if hours != 1 else ""} ago'
    elif diff < timedelta(days=7):
        days = diff.days
        return f'{days} day{"s" if days != 1 else ""} ago'
    else:
        return dt.strftime('%b %d, %Y')


class BaseViewSet(viewsets.ModelViewSet):
    """Reusable base ViewSet for all admin CRUD endpoints.

    Per DRF Standard:
    - ViewSet handles ALL business logic
    - Serializer handles validation only
    - Model is pure data structure
    """
    permission_classes = [IsAuthenticated]

    def _check_admin_access(self, user):
        """Centralized admin role check — NEVER scatter role checks."""
        if not (user.is_superuser or user.roles.filter(name='admin').exists()):
            raise PermissionDenied({
                "message": "You do not have permission to perform this action.",
                "code": "FORBIDDEN"
            })

    def perform_create(self, serializer):
        self._check_admin_access(self.request.user)
        serializer.save()

    def perform_update(self, serializer):
        self._check_admin_access(self.request.user)
        serializer.save()

    def perform_destroy(self, instance):
        self._check_admin_access(self.request.user)
        instance.delete()


class RegisterView(generics.CreateAPIView):
    """Public user registration — business logic lives in the view."""
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = CustomUser.objects.create_user(
            email=serializer.validated_data['email'],
            password=request.data.get('password'),
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name'],
        )
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RoleViewSet(BaseViewSet):
    """CRUD for roles — admin access only."""
    serializer_class = RoleSerializer
    pagination_class = None

    def get_queryset(self):
        self._check_admin_access(self.request.user)
        return Role.objects.all().order_by('id')


class PermissionViewSet(BaseViewSet):
    """CRUD for individual permissions — admin access only."""
    serializer_class = PermissionSerializer
    pagination_class = None

    def get_queryset(self):
        self._check_admin_access(self.request.user)
        return Permission.objects.all().order_by('id')


class PermissionGroupViewSet(BaseViewSet):
    """CRUD for permission groups — admin access only."""
    serializer_class = PermissionGroupSerializer
    pagination_class = None

    def get_queryset(self):
        self._check_admin_access(self.request.user)
        return PermissionGroup.objects.all().order_by('id')


class UserViewSet(BaseViewSet):
    """CRUD for users with role/permission management."""
    serializer_class = UserSerializer
    pagination_class = None

    def get_queryset(self):
        self._check_admin_access(self.request.user)
        return CustomUser.objects.all().order_by('-date_joined') \
            .prefetch_related('roles__permissions', 'permission_groups__permissions')

    def _create_single_user(self, data, request):
        """Helper to create a single user from validated data."""
        user = CustomUser.objects.create_user(
            email=data['email'],
            password=data.get('password', ''),
            first_name=data['first_name'],
            last_name=data['last_name'],
            is_active=data.get('is_active', True),
            is_staff=data.get('is_staff', False),
        )
        # Set role/permission relations from request data
        role_ids = request.data.get('role_ids', []) if not isinstance(request.data, list) else data.get('role_ids', [])
        permission_group_ids = request.data.get('permission_group_ids', []) if not isinstance(request.data, list) else data.get('permission_group_ids', [])
        if role_ids:
            user.roles.set(role_ids)
        if permission_group_ids:
            user.permission_groups.set(permission_group_ids)
        return user

    def create(self, request, *args, **kwargs):
        self._check_admin_access(request.user)
        is_many = isinstance(request.data, list)

        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            if is_many:
                users = [self._create_single_user(item, request) for item in serializer.validated_data]
                result_serializer = UserSerializer(users, many=True)
            else:
                user = self._create_single_user(serializer.validated_data, request)
                result_serializer = UserSerializer(user)

        return Response(result_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            self.perform_update(serializer)
            role_ids = request.data.get('role_ids', [])
            permission_group_ids = request.data.get('permission_group_ids', [])
            if role_ids:
                user.roles.set(role_ids)
            if permission_group_ids:
                user.permission_groups.set(permission_group_ids)

        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)

    @action(detail=True, methods=['patch'], url_name='manage-roles')
    def manage_roles(self, request, pk=None):
        """Dedicated endpoint for managing user roles and permission groups."""
        user = self.get_object()
        self._check_admin_access(request.user)

        with transaction.atomic():
            role_ids = request.data.get('role_ids', [])
            permission_group_ids = request.data.get('permission_group_ids', [])
            if role_ids:
                user.roles.set(role_ids)
            if permission_group_ids:
                user.permission_groups.set(permission_group_ids)

        serializer = self.get_serializer(user)
        return Response(serializer.data)
