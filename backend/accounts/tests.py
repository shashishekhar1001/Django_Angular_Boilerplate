import json
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Role, PermissionGroup

User = get_user_model()


class AccountsAPITestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.superuser = User.objects.create_superuser(
            email='admin@example.com',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        self.regular_user = User.objects.create_user(
            email='user@example.com',
            password='userpass123',
            first_name='Regular',
            last_name='User'
        )

        # Create test role and permission group
        self.admin_role = Role.objects.create(name='Admin', description='Administrator role')
        self.admin_group = PermissionGroup.objects.create(name='Admin', description='Admin permissions')

        # Assign permission group to superuser
        self.superuser.permission_groups.add(self.admin_group)

        # URLs
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.refresh_url = reverse('token_refresh')
        self.roles_url = reverse('role-list')
        self.permission_groups_url = reverse('permission-group-list')

    def test_user_registration_success(self):
        """Test successful user registration"""
        data = {
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'newpass123'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'newuser@example.com')
        self.assertNotIn('password', response.data)

    def test_user_registration_duplicate_email(self):
        """Test registration with duplicate email"""
        data = {
            'email': 'user@example.com',  # Already exists
            'first_name': 'Duplicate',
            'last_name': 'User',
            'password': 'duppass123'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_success(self):
        """Test successful user login"""
        data = {
            'email': 'user@example.com',
            'password': 'userpass123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['email'], 'user@example.com')

    def test_user_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        data = {
            'email': 'user@example.com',
            'password': 'wrongpass'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_refresh_success(self):
        """Test successful token refresh"""
        # First login to get tokens
        login_data = {
            'email': 'user@example.com',
            'password': 'userpass123'
        }
        login_response = self.client.post(self.login_url, login_data, format='json')
        refresh_token = login_response.data['refresh']

        # Now refresh
        refresh_data = {'refresh': refresh_token}
        response = self.client.post(self.refresh_url, refresh_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_token_refresh_invalid_token(self):
        """Test refresh with invalid token"""
        refresh_data = {'refresh': 'invalid_token'}
        response = self.client.post(self.refresh_url, refresh_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_roles_list_unauthenticated(self):
        """Test roles list without authentication"""
        response = self.client.get(self.roles_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_roles_list_authenticated_non_admin(self):
        """Test roles list with regular authenticated user"""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get(self.roles_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_roles_list_admin(self):
        """Test roles list with admin user"""
        self.client.force_authenticate(user=self.superuser)
        response = self.client.get(self.roles_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)  # The admin role we created

    def test_roles_create_admin(self):
        """Test role creation with admin user"""
        self.client.force_authenticate(user=self.superuser)
        data = {
            'name': 'Manager',
            'description': 'Management role'
        }
        response = self.client.post(self.roles_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Manager')

    def test_roles_create_non_admin(self):
        """Test role creation with non-admin user"""
        self.client.force_authenticate(user=self.regular_user)
        data = {
            'name': 'Manager',
            'description': 'Management role'
        }
        response = self.client.post(self.roles_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_permission_groups_list_admin(self):
        """Test permission groups list with admin user"""
        self.client.force_authenticate(user=self.superuser)
        response = self.client.get(self.permission_groups_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)  # The admin group we created

    def test_permission_groups_create_admin(self):
        """Test permission group creation with admin user"""
        self.client.force_authenticate(user=self.superuser)
        data = {
            'name': 'Manager',
            'description': 'Management permissions'
        }
        response = self.client.post(self.permission_groups_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Manager')

    def test_user_role_management(self):
        """Test assigning roles and permission groups to user"""
        self.client.force_authenticate(user=self.superuser)

        # Create another role and group
        manager_role = Role.objects.create(name='Manager', description='Manager role')
        manager_group = PermissionGroup.objects.create(name='Manager', description='Manager permissions')

        manage_url = reverse('user-manage-roles', kwargs={'pk': self.regular_user.id})
        data = {
            'role_ids': [self.admin_role.id, manager_role.id],
            'permission_group_ids': [self.admin_group.id, manager_group.id]
        }
        response = self.client.patch(manage_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Refresh user from database
        self.regular_user.refresh_from_db()
        self.assertEqual(self.regular_user.roles.count(), 2)
        self.assertEqual(self.regular_user.permission_groups.count(), 2)

    def test_user_role_management_non_admin(self):
        """Test user role management with non-admin user"""
        self.client.force_authenticate(user=self.regular_user)
        manage_url = reverse('user-manage-roles', kwargs={'pk': self.superuser.id})
        data = {
            'role_ids': [self.admin_role.id],
            'permission_group_ids': [self.admin_group.id]
        }
        response = self.client.patch(manage_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_role_detail_update(self):
        """Test updating a role"""
        self.client.force_authenticate(user=self.superuser)
        role_url = reverse('role-detail', kwargs={'pk': self.admin_role.id})
        data = {
            'name': 'Administrator',
            'description': 'Updated admin role'
        }
        response = self.client.put(role_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Administrator')

    def test_role_detail_delete(self):
        """Test deleting a role"""
        self.client.force_authenticate(user=self.superuser)
        role_url = reverse('role-detail', kwargs={'pk': self.admin_role.id})
        response = self.client.delete(role_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Role.objects.count(), 0)

    def test_permission_group_detail_update(self):
        """Test updating a permission group"""
        self.client.force_authenticate(user=self.superuser)
        group_url = reverse('permission-group-detail', kwargs={'pk': self.admin_group.id})
        data = {
            'name': 'Administrators',
            'description': 'Updated admin permissions'
        }
        response = self.client.put(group_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Administrators')

    def test_permission_group_detail_delete(self):
        """Test deleting a permission group"""
        self.client.force_authenticate(user=self.superuser)
        group_url = reverse('permission-group-detail', kwargs={'pk': self.admin_group.id})
        response = self.client.delete(group_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(PermissionGroup.objects.count(), 0)
