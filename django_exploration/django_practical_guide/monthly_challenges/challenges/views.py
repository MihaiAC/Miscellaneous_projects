from django.http import HttpResponse, HttpResponseNotFound, HttpRequest
from django.shortcuts import render

def monthly_challenge_by_number(request: HttpRequest, month: int):
    return HttpResponse(month)

def monthly_challenge(request: HttpRequest, month: str):
    if month in ['january', 'february', 'march']:
        return HttpResponse(str(month) + " called.")
    return HttpResponseNotFound("This month is not supported yet.")
