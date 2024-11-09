from functools import cache

from flask import Flask
from redis import Redis

app = Flask(__name__)

@app.get("/")
def index():
    page_view_count = redis().incr("page_views")
    return f"This page has been seen {page_view_count} times."

@cache
def redis():
    return Redis()