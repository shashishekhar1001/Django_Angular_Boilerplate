"""
Django settings for backend project.

This file delegates to the project's settings package (backend/settings/)
to avoid name-resolution conflicts when both backend/backend/settings.py
and backend/settings/__init__.py exist.

For local development: uses settings.local_settings (inherits from base.py).
For production: uses settings.prod_settings (inherits from base.py).
"""
import os
import sys

# Resolve the outer backend/ directory (parent of this file's grandparent)
# so we can import the 'settings' package at top level.
_parent = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _parent not in sys.path:
    sys.path.insert(0, _parent)

if os.name == 'nt':
    from settings.local_settings import *  # noqa: F401, F403
else:
    from settings.prod_settings import *  # noqa: F401, F403
