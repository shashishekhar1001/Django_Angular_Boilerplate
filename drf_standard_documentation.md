# DRF Standard Documentation

## DRF Standard (Business Logic in Views + Serializers Only)

### Core Principle
- Serializer → Data validation & transformation
- ViewSet → Business logic + orchestration
- Model → Pure data structure only

---

## 1. Responsibilities Split (VERY IMPORTANT)

### Serializer Responsibilities
- Input validation
- Output formatting
- Simple field-level logic
- Object validation

```python
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    def validate(self, data):
        if data["start_date"] > data["end_date"]:
            raise serializers.ValidationError("Invalid date range")
        return data
```

### NOT ALLOWED in Serializer
- Complex DB queries
- Cross-model business workflows
- External API calls
- Heavy logic

### ViewSet Responsibilities
- Business logic
- Role checks
- Workflow handling
- DB operations (create/update/delete)
- Calling serializers

---

## 2. Standard ViewSet Pattern (STRICT TEMPLATE)

```python
class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role.name in ["SYSTEM_ADMIN", "ORG_ADMIN"]:
            return Project.objects.all()

        return Project.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)

        serializer = self.get_serializer(
            data=request.data,
            many=is_many
        )

        serializer.is_valid(raise_exception=True)

        user = request.user

        # BUSINESS LOGIC START
        if user.role.name not in ["CND", "FREELANCER"]:
            raise ValidationError(
                "You are not allowed to create project"
            )
        # BUSINESS LOGIC END

        self.perform_create(serializer)

        return Response(serializer.data, status=201)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

---

## 3. Where to Write What (Clear Rule Table)

| Logic Type | Where |
|---|---|
| Field validation | Serializer |
| Cross-field validation | Serializer |
| Role-based access | View |
| Query filtering | View (`get_queryset`) |
| Create/update workflow | View |
| DB save customization | `perform_create/update` |
| Response shaping | Serializer |

---

## 4. Bulk Create Standard (MANDATORY)

```python
def create(self, request, *args, **kwargs):
    is_many = isinstance(request.data, list)

    serializer = self.get_serializer(
        data=request.data,
        many=is_many
    )

    serializer.is_valid(raise_exception=True)

    self.perform_create(serializer)

    return Response(serializer.data, status=201)
```

---

## 5. Clean Role Handling Pattern

### ❌ Don’t scatter role checks everywhere

### ✅ Centralize inside View methods

```python
def _check_candidate_role(self, user):
    if user.role.name not in ["CND", "FREELANCER"]:
        raise ValidationError("Invalid role")
```

Usage:

```python
self._check_candidate_role(request.user)
```

---

## 6. Avoid Fat Views

### ❌ BAD

```python
def create(self, request):
    # 200 lines of logic
```

### ✅ GOOD

```python
def create(self, request):
    data = self._validate_request(request)
    self._check_permissions(request.user)
    instance = self._create_project(data)

    return Response(...)
```

---

## 7. Query Optimization (MUST FOLLOW)

```python
def get_queryset(self):
    return Project.objects.select_related("user").prefetch_related("skills")
```

---

## 8. Error Handling Standard

```python
from rest_framework.exceptions import ValidationError

raise ValidationError({
    "message": "Invalid data",
    "field": "start_date"
})
```

---

## 9. Serializer Save Control

```python
class ProjectSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Project.objects.create(**validated_data)
```

---

## 10. Naming Conventions

| Component | Rule |
|---|---|
| ViewSet | `ProjectViewSet` |
| Serializer | `ProjectSerializer` |
| Methods | `_helper_method_name` |

---

## 11. Clean Flow

```text
Request
   ↓
ViewSet (ALL BUSINESS LOGIC)
   ↓
Serializer (VALIDATION ONLY)
   ↓
Model
   ↓
Response
```

---

## 12. DOs & DON'Ts

### ✅ DO
- Keep serializers clean
- Keep logic readable
- Split large methods
- Use `perform_create`

### ❌ DON'T
- No business logic inside models
- No heavy logic inside serializer
- No repeated role checks everywhere
- No 100+ line functions

---

# DRF Models & Schema Design Standards

## 1. Core Principle

- Model = Source of Truth (DB structure)
- Serializer = API representation
- Never design models based on UI

---

## 2. Standard Model Template

```python
from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
```

### Example Model

```python
class Project(BaseModel):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    client = models.CharField(max_length=255, null=True, blank=True)
    project_status = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "projects"
        ordering = ["-created_at"]
```

---

## 3. Field Selection Rules

| Use Case | Field |
|---|---|
| Name/Text | CharField |
| Large text | TextField |
| Boolean | BooleanField |
| Date | DateField |
| Timestamp | DateTimeField |
| Money | DecimalField |
| JSON | JSONField |

### ❌ WRONG

```python
price = models.FloatField()
```

### ✅ CORRECT

```python
price = models.DecimalField(max_digits=10, decimal_places=2)
```

---

## 4. Relationship Mapping

### ForeignKey (One-to-Many)

```python
class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
```

### OneToOneField

```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
```

### ManyToManyField

```python
class Project(models.Model):
    skills = models.ManyToManyField("Skill")
```

### Through Table Example

```python
class ProjectSkill(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    experience = models.IntegerField()
```

---

## 5. Mapping Schema Patterns

### Flat Model

```python
class Skill(models.Model):
    name = models.CharField(max_length=100)
```

### Relational Model

```python
class Employment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
```

### Reference Table Pattern

```python
class EducationType(models.Model):
    name = models.CharField(max_length=100)

class Education(models.Model):
    education_type = models.ForeignKey(
        EducationType,
        on_delete=models.PROTECT
    )
```

### Enum Choices

```python
class Project(models.Model):
    STATUS_CHOICES = [
        ("ONGOING", "Ongoing"),
        ("COMPLETED", "Completed"),
    ]

    project_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )
```

---

## 6. When to Use What

| Scenario | Use |
|---|---|
| Static small list | Choices |
| Dynamic list | FK to master table |
| Extra fields needed | Through table |
| One-to-one extension | OneToOneField |
| Ownership | ForeignKey |

---

## 7. Null vs Blank

```python
name = models.CharField(max_length=100, blank=True)
age = models.IntegerField(null=True)
```

### Rule
- `null=True` → DB can store NULL
- `blank=True` → form/API can skip

---

## 8. on_delete Behavior

| Option | Meaning |
|---|---|
| CASCADE | Delete child |
| PROTECT | Prevent delete |
| SET_NULL | Set null |

---

## 9. Indexing

```python
email = models.EmailField(unique=True)

class Meta:
    indexes = [
        models.Index(fields=["user"]),
    ]
```

---

## 10. Unique Constraints

```python
class Meta:
    unique_together = ["user", "skill"]
```

---

## 11. Soft Delete Pattern

```python
is_active = models.BooleanField(default=True)

instance.is_active = False
instance.save()
```

---

## 12. Model Methods

### Allowed
- `__str__`
- Small helper methods

### ❌ Not Allowed
- Business logic
- DB-heavy operations

---

## 13. Serializer Mapping Patterns

### Basic Mapping

```python
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
```

### Readable FK Name

```python
education_type_name = serializers.CharField(
    source="education_type.name",
    read_only=True
)
```

### Nested Serializer

```python
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]

class ProjectSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
```

### Write with ID

```json
{
  "skills": [1, 2, 3]
}
```

---

# Django Migrations – Standards & Best Practices

## Standard Commands

### Create Migration

```bash
python manage.py makemigrations
```

### Apply Migration

```bash
python manage.py migrate
```

### Show SQL

```bash
python manage.py sqlmigrate app_name migration_number
```

---

## Migration Naming Convention

```text
0001_initial.py
0002_add_project_status.py
0003_alter_user_field.py
```

---

## Migration Types

### Create Model

```python
migrations.CreateModel(
    name='Project',
    fields=[...],
)
```

### Add Field

```python
migrations.AddField(
    model_name='project',
    name='status',
    field=models.CharField(max_length=50, default='ONGOING'),
)
```

### Alter Field

```python
migrations.AlterField(
    model_name='project',
    name='title',
    field=models.CharField(max_length=500),
)
```

### Remove Field

```python
migrations.RemoveField(
    model_name='project',
    name='old_field',
)
```

---

## Data Migration Example

```python
def set_default_status(apps, schema_editor):
    Project = apps.get_model("projects", "Project")

    Project.objects.filter(
        status__isnull=True
    ).update(status="ONGOING")
```

---

## Safe Migration Strategy

1. Add nullable field
2. Populate data
3. Make field non-null

---

## Merge Migration Conflicts

```bash
python manage.py makemigrations --merge
```

---

## Squash Migrations

```bash
python manage.py squashmigrations app 0001 0010
```

---

# Remaining DRF Standards

## API Versioning

```python
REST_FRAMEWORK = {
    "DEFAULT_VERSIONING_CLASS":
    "rest_framework.versioning.URLPathVersioning"
}
```

### Example

```text
/api/v1/users/
/api/v2/users/
```

---

## Throttling

```python
REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.UserRateThrottle"
    ],
    "DEFAULT_THROTTLE_RATES": {
        "user": "100/day"
    }
}
```

---

## Caching

```python
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60*5), name='list')
class ProjectViewSet(ModelViewSet):
    ...
```

---

## Signals

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Project)
def project_created(sender, instance, created, **kwargs):
    if created:
        print("Project created")
```

---

## Background Jobs

```python
@shared_task
def send_email_task(user_id):
    ...
```

### Use Cases
- Emails
- Notifications
- Heavy processing

---

## File Handling

```python
file = models.FileField(upload_to="documents/")
```

### Rules
- Validate file type
- Limit file size
- Store in S3 (production)

---

## Security

### Must enforce
- JWT authentication
- HTTPS only
- Input validation
- No sensitive data in response

```python
password = serializers.CharField(write_only=True)
```

---

## Environment Management

### ❌ NEVER

```python
DEBUG = True
SECRET_KEY = "abc"
```

### ✅ Use
- `.env`
- `python-decouple`

---

## Logging & Monitoring

```python
LOGGING = {
    "version": 1,
}
```

### Tools
- Sentry
- Grafana

---

## API Documentation

### Use
- `drf-spectacular`

---

## Pagination Response Standard

```json
{
  "count": 100,
  "next": "...",
  "previous": "...",
  "results": []
}
```

---

## Filtering, Ordering, Search

```python
filter_backends = [
    DjangoFilterBackend,
    SearchFilter,
    OrderingFilter
]

search_fields = ["name"]
ordering_fields = ["created_at"]
```

---

## Custom Managers

```python
class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)
```

---

## Transactions

```python
from django.db import transaction

with transaction.atomic():
    # multiple DB operations
```

---

## Soft Delete Enforcement

```python
instance.is_active = False
instance.save()
```

Always filter:

```python
.filter(is_active=True)
```

---

## Code Review Checklist

### Before merge
- Serializer clean
- View logic structured
- No duplicate queries
- Proper permissions
- Migration exists
- Tests written

---

## Performance Rules

- Use `select_related`
- Use `prefetch_related`
- Avoid loops with queries
- Avoid serializer nesting explosion

---

## Reusable Base Classes

```python
class BaseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
```

---

## Error Code Standardization

```json
{
  "code": "INVALID_INPUT",
  "message": "Invalid data"
}
```
