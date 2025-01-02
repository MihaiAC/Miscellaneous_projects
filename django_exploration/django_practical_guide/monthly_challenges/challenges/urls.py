from django.urls import path, include
from . import views

# path(path, view function)
urlpatterns = [
    path("<month>", views.monthly_challenge)
]