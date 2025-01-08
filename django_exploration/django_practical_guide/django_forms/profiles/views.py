from django.shortcuts import render
from django.views import View
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.core.files.uploadedfile import UploadedFile

def store_file(file: UploadedFile):
    with open("temp/image.jpg", "wb+") as dest:
        for chunk in file.chunks():
            dest.write(chunk)

# Create your views here.
class CreateProfileView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, "profiles/create_profile.html")

    def post(self, request: HttpRequest) -> HttpResponse:
        store_file(request.FILES["image"])
        return HttpResponseRedirect("/profiles")
