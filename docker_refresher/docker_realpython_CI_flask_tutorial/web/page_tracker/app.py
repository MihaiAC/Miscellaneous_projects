import os
from functools import cache

from flask import Flask
from redis import Redis, RedisError

app = Flask(__name__)


@app.get("/")
def index():
    try:
        page_views = redis().incr("page_views")
    except RedisError:
        app.logger.exception("Redis error.")
        return "Sorry, something went wrong.", 500
    else:
        return f"This page has been seen {page_views} times."


@cache
def redis():
    return Redis.from_url(
        os.getenv("REDIS_URL", default="redis://localhost:6379")
        )
