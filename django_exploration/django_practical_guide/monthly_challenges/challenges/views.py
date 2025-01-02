from django.http import HttpResponse, HttpResponseNotFound, HttpRequest
from django.shortcuts import render
from django.utils.dates import MONTHS

def monthly_challenge_by_number(request: HttpRequest, month: int):
    if 1 <= month <= 12:
        return HttpResponse(f"Placeholder challenge for {MONTHS[month]}")
    return HttpResponseNotFound("Invalid month.")

def monthly_challenge(request: HttpRequest, month: str):
    if month in MONTHS.values():
        return HttpResponse(f"Placeholder challenge for {month}")
    return HttpResponseNotFound("Invalid month.")
