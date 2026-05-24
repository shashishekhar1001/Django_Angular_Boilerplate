# Django + Angular RBAC Boilerplate

A production-ready full-stack boilerplate featuring **Django 6** (REST API) + **Angular 21** (PrimeNG UI) with a robust **Role-Based Access Control (RBAC)** system using custom Roles and Permission Groups.

This starter provides a secure foundation for building internal tools, admin dashboards, or SaaS applications that require fine-grained permission management.

## ✨ Features

### Backend (Django)
- **Custom User Model** – Email-based authentication (no username)
- **Advanced RBAC**:
  - `Role` model with many-to-many `Permission`s
  - `PermissionGroup` model for grouping permissions
  - Users can have multiple roles + multiple permission groups
- **JWT Authentication** (Django REST Framework Simple JWT)
  - Access tokens (5 minutes)
  - Refresh tokens (1 day)
- **Password reset** endpoint
- **Dashboard statistics** API
- **CORS** configured for Angular dev server
- Multi-environment settings (`local` vs `production`)
- Django Admin with custom user/role/permission management

### Frontend (Angular)
- **PrimeNG 21** + PrimeIcons UI components
- **Reactive state management** using Angular Signals
- **Auth Interceptor** – Automatic JWT injection + 401 handling
- **Route Guards** (`authGuard`, `adminGuard`)
- **Cookie-based token storage** (secure by default)
- **Admin Module** (protected):
  - User management (list, assign roles/groups)
  - Role CRUD + permission assignment
  - Permission Group CRUD
  - Permission list
- Login, Register, Forgot Password flows
- Theme preference persisted on user model (light/dark)

## 🛠 Tech Stack

| Layer       | Technology                          | Version    |
|-------------|-------------------------------------|------------|
| Backend     | Django + DRF + SimpleJWT            | 6.0.5      |
| Frontend    | Angular + PrimeNG                   | 21         |
| Database    | SQLite (development)                | -          |
| Auth        | JWT (Access + Refresh)              | -          |
| Styling     | PrimeNG + CSS                       | 21.1.8     |
| Package Mgr | npm                                 | 11.4.2     |
| Python Env  | venv (`ENV/`)                       | -          |

## 📁 Project Structure

```
Django_Boilerplate/
├── backend/                    # Django REST API
│   ├── accounts/               # Custom user, roles, permissions
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── permissions.py
│   │   └── admin.py
│   ├── settings/               # Split settings (base + local + prod)
│   │   ├── base.py
│   │   ├── local_settings.py
│   │   └── prod_settings.py
│   ├── backend/
│   │   ├── urls.py
│   │   └── settings.py         # Platform selector
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                   # Angular 21 Application
│   ├── src/app/
│   │   ├── components/         # Login, Register, Dashboard, etc.
│   │   ├── modules/admin/      # Protected admin area
│   │   ├── services/auth.service.ts
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── app.routes.ts
│   ├── package.json
│   └── angular.json
│
├── ENV/                        # Python virtual environment
├── .gitignore                  # Unified root gitignore
├── README.md                   # ← You are here
└── .vscode/                    # Editor settings
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+ (with npm)
- Git

### 1. Backend Setup

```bash
# Navigate to project root
cd Django_Boilerplate

# Activate virtual environment (Windows)
.\ENV\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# (Optional) Create superuser
python manage.py createsuperuser

# Start Django development server
python manage.py runserver
```

Backend will be available at: **http://localhost:8000**

### 2. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
cd frontend

# Install dependencies
npm install

# Start Angular dev server
npm start
# or
ng serve
```

Frontend will be available at: **http://localhost:4200**

### 3. First Login Flow

1. Register a new user at `http://localhost:4200/register`
2. Login at `http://localhost:4200`
3. You will land on the dashboard
4. To access the admin panel, the user must be granted appropriate roles/permission groups via Django Admin or the API

## 🔐 Authentication & Authorization

### JWT Flow
- Tokens are stored in **HTTP-only cookies** (via `ngx-cookie-service`)
- `auth.interceptor.ts` automatically attaches `Authorization: Bearer <token>`
- Expired access tokens are refreshed automatically using the refresh token

### Permission System
The backend uses a **custom RBAC** model (not Django's built-in groups):

- `Permission` — atomic permission (codename + name)
- `Role` — collection of permissions (e.g., "Manager", "HR")
- `PermissionGroup` — another way to bundle permissions
- Users can be assigned any combination of roles + permission groups

Frontend exposes:
- `userRoles`
- `userPermissions` (computed from roles + groups)

## 📡 API Endpoints (Key)

Base URL: `http://localhost:8000/api/auth/`

| Method | Endpoint                        | Description                     | Auth Required |
|--------|---------------------------------|---------------------------------|---------------|
| POST   | `/register/`                    | User registration               | No            |
| POST   | `/login/`                       | Obtain JWT pair                 | No            |
| POST   | `/token/refresh/`               | Refresh access token            | No            |
| POST   | `/password-reset/`              | Request password reset          | No            |
| GET    | `/profile/`                     | Current user profile            | Yes           |
| GET    | `/dashboard/`                   | Dashboard statistics            | Yes           |
| CRUD   | `/roles/`                       | Role management                 | Yes           |
| CRUD   | `/permission-groups/`           | Permission Group management     | Yes           |
| CRUD   | `/permissions/`                 | Permission list                 | Yes           |
| CRUD   | `/users/` + `/users/{id}/manage-roles/` | User + role assignment   | Admin         |

Full API documentation can be explored via Django Admin or by inspecting the frontend services.

## ⚙️ Configuration

### Django Settings
- Development: `backend.settings.local_settings` (auto-selected on Windows)
- Production: `backend.settings.prod_settings`
- Override manually:
  ```bash
  set DJANGO_SETTINGS_MODULE=backend.settings.prod_settings
  ```

### Environment Variables / Secrets
- `SECRET_KEY` is currently hardcoded in `base.py` — **change this in production**
- Database, CORS, and allowed hosts are configured per environment

### Frontend API URL
Currently hardcoded in `auth.service.ts`:
```ts
private readonly apiUrl = 'http://localhost:8000/api/auth';
```

Update this when deploying.

## 🧪 Development

### Backend
```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py test
```

### Frontend
```bash
ng serve
ng build
ng test          # Vitest
```

## 🚢 Production Considerations

- Replace SQLite with PostgreSQL/MySQL
- Set strong `SECRET_KEY`
- Configure proper `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`
- Use environment variables for secrets (consider `django-environ` or `python-dotenv`)
- Run with Gunicorn + Nginx
- Enable HTTPS
- Set secure cookie flags for JWT tokens
- Add rate limiting and proper logging

## 📝 License

This project is provided as-is for educational and internal use. See individual package licenses for dependencies.

---

**Built with** Django 6 • Angular 21 • PrimeNG • JWT • Custom RBAC
