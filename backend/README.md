# Django Boilerplate with JWT Authentication

A comprehensive Django REST API boilerplate with custom user model, JWT authentication, role-based permissions, and Angular frontend integration.

## Features

- **Custom User Model**: Email-based authentication with roles and permission groups
- **JWT Authentication**: Access and refresh tokens using Django REST Framework Simple JWT
- **Role-Based Access Control**: Custom permissions based on user roles and permission groups
- **CORS Configuration**: Platform-specific CORS settings for development and production
- **Multi-Environment Settings**: Automatic configuration based on operating system (Windows/Unix)
- **Class-Based Views**: RESTful API endpoints using Django REST Framework
- **Admin Interface**: Custom admin panels for user management

## Project Structure

```
backend/
├── accounts/                 # User authentication app
│   ├── models.py            # CustomUser, Role, PermissionGroup models
│   ├── views.py             # API views for auth and user management
│   ├── serializers.py       # DRF serializers
│   ├── permissions.py       # Custom permission classes
│   ├── services.py          # Helper functions
│   ├── admin.py             # Admin configurations
│   └── urls.py              # URL patterns
├── backend/                 # Main Django project
│   ├── settings/            # Settings management
│   │   ├── __init__.py      # Platform selector
│   │   ├── base.py          # Common settings
│   │   ├── local_settings.py # Windows development
│   │   └── prod_settings.py  # Unix production
│   ├── urls.py              # Main URL configuration
│   └── wsgi.py              # WSGI application
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
└── db.sqlite3               # SQLite database (development)
```

## Setup Instructions

### Prerequisites

- Python 3.10+
- pip
- Virtual environment (recommended)

### Installation

1. **Clone or download the project**

2. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

3. **Activate virtual environment**
   ```bash
   # On Windows
   ..\ENV\Scripts\activate

   # On Unix/Linux
   source ../ENV/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

All API endpoints require authentication except registration and login. Include the JWT token in the `Authorization` header: `Bearer <access_token>`.

### Authentication

#### Register User
```http
POST /api/auth/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "is_staff": false,
  "date_joined": "2024-01-20T11:00:00Z",
  "roles": [],
  "permission_groups": []
}
```

#### Login
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_active": true,
    "is_staff": false,
    "date_joined": "2024-01-20T11:00:00Z",
    "roles": [],
    "permission_groups": []
  }
}
```

#### Refresh Token
```http
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### User Management

#### List Roles (Authenticated users)
```http
GET /api/auth/roles/
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin",
    "description": "Administrator role"
  }
]
```

#### Create Role (Admin only)
```http
POST /api/auth/roles/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Manager",
  "description": "Management role"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Manager",
  "description": "Management role"
}
```

#### Get Role Details (Authenticated users)
```http
GET /api/auth/roles/1/
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "name": "Admin",
  "description": "Administrator role"
}
```

#### Update Role (Admin only)
```http
PUT /api/auth/roles/1/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Administrator",
  "description": "Full administrator access"
}
```

#### Delete Role (Admin only)
```http
DELETE /api/auth/roles/1/
Authorization: Bearer <access_token>
```

**Response:** 204 No Content

#### List Permission Groups (Authenticated users)
```http
GET /api/auth/permission-groups/
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin",
    "description": "Full administrative permissions",
    "created_at": "2024-01-20T11:00:00Z"
  }
]
```

#### Create Permission Group (Admin only)
```http
POST /api/auth/permission-groups/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Manager",
  "description": "Management permissions"
}
```

#### Get Permission Group Details (Authenticated users)
```http
GET /api/auth/permission-groups/1/
Authorization: Bearer <access_token>
```

#### Update Permission Group (Admin only)
```http
PUT /api/auth/permission-groups/1/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Senior Manager",
  "description": "Senior management permissions"
}
```

#### Delete Permission Group (Admin only)
```http
DELETE /api/auth/permission-groups/1/
Authorization: Bearer <access_token>
```

#### Manage User Roles (Admin only)
```http
PATCH /api/auth/users/1/manage-roles/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "role_ids": [1, 2],
  "permission_group_ids": [1]
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "is_staff": false,
  "date_joined": "2024-01-20T11:00:00Z",
  "roles": [
    {
      "id": 1,
      "name": "Admin",
      "description": "Administrator role"
    },
    {
      "id": 2,
      "name": "Manager",
      "description": "Management role"
    }
  ],
  "permission_groups": [
    {
      "id": 1,
      "name": "Admin",
      "description": "Full administrative permissions",
      "created_at": "2024-01-20T11:00:00Z"
    }
  ]
}
```

## Settings Configuration

The project automatically selects settings based on the operating system:

- **Windows**: Development settings (SQLite, DEBUG=True, ALLOWED_HOSTS=['*'])
- **Unix/Linux**: Production settings (PostgreSQL, DEBUG=False, specific ALLOWED_HOSTS)

### Manual Settings Override

You can manually specify settings by setting the `DJANGO_SETTINGS_MODULE` environment variable:

```bash
export DJANGO_SETTINGS_MODULE=backend.settings.local_settings
python manage.py runserver
```

## CORS Configuration

CORS settings are configured per environment:

- **Development**: Allows `http://localhost:4200` with credentials
- **Production**: Allows specific domains with credentials

## JWT Configuration

- Access token lifetime: 5 minutes
- Refresh token lifetime: 1 day
- Authentication header: `Authorization: Bearer <token>`

## Custom User Model

The `CustomUser` model uses email as the unique identifier and includes:

- Email (unique)
- First name, last name
- Roles (many-to-many)
- Permission groups (many-to-many)

## Permission System

- **HasPermissionGroup**: Custom permission class that checks if user belongs to required permission group
- Permission groups are assigned to users for access control

## Admin Interface

Access the Django admin at `/admin/` with superuser credentials.

Custom admin configurations for:
- CustomUser (with role and permission group management)
- Role management
- PermissionGroup management

## Testing

Run tests with:
```bash
python manage.py test
```

## Deployment

For production deployment:

1. Set `DEBUG = False` in production settings
2. Configure PostgreSQL database
3. Set secure `SECRET_KEY`
4. Configure allowed hosts and trusted origins
5. Use a production WSGI server (gunicorn, uwsgi)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the AUGTRANS License.