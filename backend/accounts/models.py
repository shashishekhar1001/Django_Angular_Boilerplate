from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('Email Address'), unique=True)
    first_name = models.CharField(_('First Name'), max_length=30)
    last_name = models.CharField(_('Last Name'), max_length=30)
    is_active = models.BooleanField(_('Active'), default=True)
    is_staff = models.BooleanField(_('Staff Status'), default=False)
    date_joined = models.DateTimeField(_('Date Joined'), auto_now_add=True)
    roles = models.ManyToManyField('Role', blank=True)
    permission_groups = models.ManyToManyField('PermissionGroup', blank=True)
    theme = models.CharField(
        _('Theme Preference'),
        max_length=10,
        choices=[('light', 'Light'), ('dark', 'Dark')],
        default='light',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        app_label = 'accounts'
        permissions = [
            ('can_view_employee_data', 'Can view employee data'),
            ('can_view_admin_data', 'Can view admin data'),
            ('can_view_superuser_data', 'Can view superuser data'),
        ]

    def __str__(self):
        return self.email

class Permission(models.Model):
    name = models.CharField(max_length=100, verbose_name="Permission Name")
    codename = models.CharField(max_length=100, unique=True, verbose_name="Codename")
    description = models.TextField(blank=True, verbose_name="Description")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'accounts'
        verbose_name = "Permission"
        verbose_name_plural = "Permissions"
        ordering = ['name']

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, blank=True)

    class Meta:
        app_label = 'accounts'

    def __str__(self):
        return self.name

class PermissionGroup(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Permission Group")
    description = models.TextField(blank=True, verbose_name="Description")
    permissions = models.ManyToManyField(Permission, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'accounts'
        verbose_name = "Permission Group"
        verbose_name_plural = "Permission Groups"

    def __str__(self):
        return self.name
