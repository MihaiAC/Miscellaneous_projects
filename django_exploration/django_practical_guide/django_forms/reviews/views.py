from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.views import View

from .forms import ReviewForm
# Create your views here.

# Class-based view.
class ReviewView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        form = ReviewForm()
    
        return render(request, "reviews/review.html", {
            "form": form
        })
    
    def post(self, request: HttpRequest) -> HttpResponse:
        form = ReviewForm(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thank-you")

        return render(request, "reviews/review.html", {
            "form": form
        })

def thank_you(request: HttpRequest) -> HttpResponse:
    return render(request, "reviews/thank_you.html")