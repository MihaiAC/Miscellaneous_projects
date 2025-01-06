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
- Template filters = for small aesthetic transformations on variables we display.
- Django DTL and tags: url (for redirections, can use the identifiers in urls.py), for, if.

- Loading static files: `{% load static %}` -> `{% static "path_to_css"%}`
- Global css: add `STATICFILES_DIRS` to settings.
- Slugs: `<slug:slug_name>` makes sure that the path-is-in-this-format.
- Reverse to construct app URLs.

# Data #

Good to think of it as having three types:
- Temporary data: used immediately, don't care about it later, stored in memory; e.g: user input
- Semi-persistent data: stored for a longer time, can be lost and re-created when needed; stored in browser or temp files; e.g: user authentication status;
- Persistent data: stored "forever", must not be lost, stored in a DB; e.g: blog posts, orders, payment methods etc;

SQL vs noSQL - table vs document based;

Setting primary key: `city_id = models.AutoField(primary_key=True)`
Otherwise, it's automatically created and named "id".
After creating or updating a model class, you have to create + run the migrations.

Can create object based on the declared "fields" (init automatically created).
Save it with `object.save()`, retrieve it with `ClassName.objects.all()`, delete it with `object.delete()`, .. `ClassName.objects.create`

Querying data with e.g: `ClassName.objects.get(id=3)` get matches only one value, errors if multiple matches.
`ClassName.objects.filter(filter_stmt)` -> for multiple matches.
Example filter stmt: `rating__lt=3`

More complex queries: 
`from django.db.models import Q
`ClassName.objects.filter(Q(rating__lt=3)|Q(is_bestselling=True))`

"id: may not exist, but "pk" always does.

Cached queries?

Use django.core.validators to .. validate the data.

(blank=True) != (null=True)
If blank = True, must provide a default value for non-string fields. For string fields, blank is naturally an empty string.

`get_absolute_url` override on model object

ForeignKey is used for one to many relations.
OneToOneField,...

`models.ForeignKey(className, on_delete=models.CASCADE|PROTECT|SET_NULL, related_name="books")` 
Related name allows you to e.g: get all the "books belonging to an author".

Chaining filters: `Book.objects.filter(author__last_name__contains="wling")`

Meta class inside a Model class to control how it is displayed?



