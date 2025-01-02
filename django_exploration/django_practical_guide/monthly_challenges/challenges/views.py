from django.http import HttpResponse, HttpResponseNotFound, HttpRequest, HttpResponseRedirect
from django.shortcuts import render
from django.utils.dates import MONTHS
from django.urls import reverse

def monthly_challenge_by_number(request: HttpRequest, month: int):
    if 1 <= month <= 12:
        redirect_path = reverse("monthly-challenge", args=[MONTHS[month]]) # Builds the prefix to the path
        return HttpResponseRedirect(redirect_path)
    return HttpResponseNotFound("Invalid month.")

def monthly_challenge(request: HttpRequest, month: str):
    if month in MONTHS.values():
        return HttpResponse(f"Placeholder challenge for {month}")
    return HttpResponseNotFound("Invalid month.")
