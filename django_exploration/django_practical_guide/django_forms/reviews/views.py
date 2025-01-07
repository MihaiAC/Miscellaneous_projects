from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect

from .forms import ReviewForm
# Create your views here.

# request can be POST or GET;
def review(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = ReviewForm(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thank-you")
    else:
        form = ReviewForm()
    
    return render(request, "reviews/review.html", {
        "form": form
    })

def thank_you(request: HttpRequest) -> HttpResponse:
    return render(request, "reviews/thank_you.html")