import os

if os.name == 'nt':
    from .local_settings import *
else:
    from .prod_settings import *