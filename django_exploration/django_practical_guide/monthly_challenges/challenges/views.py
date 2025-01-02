from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def january(request):
    return HttpResponse("January challenge.")

def february(request):
    return HttpResponse("February challenge.")

