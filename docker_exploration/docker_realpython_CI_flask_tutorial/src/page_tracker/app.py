from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis()

@app.get("/")
def index():
    page_view_count = redis.incr("page_view_count")
    return f"This page has been seen {page_view_count} times."
