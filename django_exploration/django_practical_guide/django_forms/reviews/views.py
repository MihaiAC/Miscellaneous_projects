from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

# Create your views here.
def review(request: HttpRequest) -> HttpResponse:
    return render(request, "reviews/review.html")