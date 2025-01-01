from django.urls import path, include
from . import views

# path(path, view function)
urlpatterns = [
    path("january", views.index)
]