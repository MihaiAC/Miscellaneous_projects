- Django "apps" are re-usable submodules/packages.

- Redirecting URL from project to a submodule (include in project's urls.py):
```
urlpatterns = [   
    path("app_name/", include("app_name.urls"))  
]
```
- Mapping route to view: ```
```
from django.urls import path
path(path, view function)
```
- Dynamic segment: `path("<var_name>", views.func)`, with signature `func(request, var_name)`
	Alternatively: `path("<type:var_name>", views.func)`
	