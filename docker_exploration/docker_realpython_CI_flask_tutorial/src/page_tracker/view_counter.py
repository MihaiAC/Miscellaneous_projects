from flask import (
    Blueprint, g
)
from page_tracker.db import get_db

bp = Blueprint('counter', __name__)

@bp.get("/")
def index():
    db = get_db()
    page_view_count = db.incr("page_view_count")
    return f"This page has been seen {page_view_count} times."
