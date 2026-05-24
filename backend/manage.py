#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""

    script_dir = os.path.dirname(os.path.abspath(__file__))   # e.g. D:\Django_Boilerplate\backend
    project_root = os.path.dirname(script_dir)                # e.g. D:\Django_Boilerplate

    # Ensure the project root is FIRST in sys.path so that 'backend'
    # resolves to the outer backend/ package, not the inner
    # backend/backend/ config folder.
    if project_root in sys.path:
        sys.path.remove(project_root)
    sys.path.insert(0, project_root)

    # Keep the script dir on sys.path (Python adds it automatically)
    # so that top-level apps like 'accounts', 'settings' are importable.
    if script_dir not in sys.path:
        sys.path.insert(1, script_dir)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
