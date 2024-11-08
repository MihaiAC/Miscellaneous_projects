import sqlite3
from flask import g
from redis import Redis

# TODO: Get the host/port from a config file.
def get_db(redis_host='localhost', redis_port=6379):
    if 'db' not in g:
        g.db = Redis(host='localhost', port=6379, decode_responses=True)
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# Register close_db with the application instance.
def init_app(app):
    # Call close_db after returning the response.
    app.teardown_appcontext(close_db)
