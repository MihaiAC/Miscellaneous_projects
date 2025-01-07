from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect

from .forms import ReviewForm
# Create your views here.

# request can be POST or GET;
def review(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = ReviewForm(request.POST)

        if form.is_valid():
            print(form.cleaned_data)
            return HttpResponseRedirect("/thank-you")

        return render(request, "reviews/review.html", {
            "has_error": True
        })
        

    # GET?
    form = ReviewForm()
    return render(request, "reviews/review.html", {
        "form": form
    })

def thank_you(request: HttpRequest) -> HttpResponse:
    return render(request, "reviews/thank_you.html")