from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect

# Create your views here.

# request can be POST or GET;
def review(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        entered_username = request.POST['username']

        if entered_username == "":
            return render(request, "reviews/review.html", {
                "has_error": True
            })

        print(entered_username)
        return HttpResponseRedirect("/thank-you")
        
    return render(request, "reviews/review.html", {
        "has_error": False
    })

def thank_you(request: HttpRequest) -> HttpResponse:
    return render(request, "reviews/thank_you.html")