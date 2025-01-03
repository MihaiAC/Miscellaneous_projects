from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

def starting_page(request: HttpRequest) -> HttpResponse:
    return render(request, "blog/index.html")

def posts(request: HttpRequest) -> HttpResponse:
    pass

def single_post(request: HttpRequest) -> HttpResponse:
    pass

