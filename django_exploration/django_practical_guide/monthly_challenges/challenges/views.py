from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render

# Create your views here.
def monthly_challenge(request, month):
    if month in ['january', 'february', 'march']:
        return HttpResponse(str(month) + " called.")
    return HttpResponseNotFound("This month is not supported yet.")
