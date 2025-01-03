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
- Dynamic segment: `path("<var_name>", views.func, name="path_name")`, with signature `func(request, var_name)`
	Alternatively: `path("<type:var_name>", views.func)`
- HttpResponseRedirect
- There doesn't seem to be a direct equivalent to Spring's DI, which seems a bit inconvenient.
- HTML templates: `django.shortcuts.render(request, path_to_template, **kwargs)` + modify `TEMPLATES[DIRS]` in `settings.py` OR after initialising an app + adding templates for it, add it in `settings.py INSTALLED_APPS` variable. 