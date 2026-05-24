from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Permission, Role, PermissionGroup


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    permission_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model = Role
        fields = '__all__'

    def create(self, validated_data):
        permission_ids = validated_data.pop('permission_ids', [])
        role = super().create(validated_data)
        if permission_ids:
            role.permissions.set(permission_ids)
        return role

    def update(self, instance, validated_data):
        permission_ids = validated_data.pop('permission_ids', None)
        role = super().update(instance, validated_data)
        if permission_ids is not None:
            role.permissions.set(permission_ids)
        return role


class PermissionGroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = PermissionGroup
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)
    permission_groups = PermissionGroupSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'password', 'first_name', 'last_name',
            'is_active', 'is_staff', 'is_superuser', 'date_joined',
            'theme', 'roles', 'permission_groups',
        ]
        read_only_fields = ['id', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_email(self, value):
        """Simple field-level validation — no DB queries."""
        if not value or '@' not in value:
            raise serializers.ValidationError("A valid email address is required.")
        return value.lower().strip()

    def validate(self, data):
        """Cross-field validation — no business logic."""
        if data.get('first_name') and data.get('last_name'):
            if data['first_name'].strip() == data['last_name'].strip():
                raise serializers.ValidationError({
                    "field": "last_name",
                    "message": "First name and last name cannot be identical.",
                })
        return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data
        return data

class TokenResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = UserSerializer()