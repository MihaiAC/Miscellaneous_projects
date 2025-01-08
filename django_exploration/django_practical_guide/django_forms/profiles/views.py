from django.shortcuts import render
from django.views import View
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect

# Create your views here.
class CreateProfileView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, "profiles/create_profile.html")

    def post(self, request: HttpRequest) -> HttpResponse:
        print(request.FILES["image"])
        return HttpResponseRedirect("/profiles")
