from django.http import HttpResponse, HttpResponseNotFound, HttpRequest, HttpResponseRedirect
from django.shortcuts import render
from django.utils.dates import MONTHS
from django.urls import reverse
from django.template.loader import render_to_string

MONTH_LOWERCASE_NAMES = [x.lower() for x in MONTHS.values()]

def index(request: HttpRequest) -> HttpResponse:
    response_data = ['<ul>']
    for month in MONTHS.values():
        month_path = reverse("monthly-challenge", args=[month])
        response_data.append(f'\n<li><a href="{month_path}">{month}</a></li>')
    response_data.append('</ul>')

    return HttpResponse("".join(response_data))

def monthly_challenge_by_number(request: HttpRequest, month_nr: int) -> HttpResponse:
    if 1 <= month_nr <= 12:
        redirect_path = reverse("monthly-challenge", args=[MONTHS[month_nr]]) # Builds the prefix to the path
        return HttpResponseRedirect(redirect_path)
    return HttpResponseNotFound("<h1>Invalid month.</h1>")

def monthly_challenge(request: HttpRequest, month: str) -> HttpResponse:
    if month in MONTH_LOWERCASE_NAMES:
        # response_data = f"<h1>Placeholder challenge for {month}</h1>"
        # HTML template.
        response_data = render_to_string("challenges/challenge.html")
        return HttpResponse(response_data)
    return HttpResponseNotFound("<h1>Invalid month.</h1>")
