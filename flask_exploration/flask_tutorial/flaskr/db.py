import sqlite3
from datetime import datetime

import click
from flask import current_app, g

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# Can call from command line before(?) starting the application.
# E.G: flask --app flaskr init-db.
@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Initialised the database.')

sqlite3.register_converter("timestamp", lambda v: datetime.fromisoformat(v.decode()))

# Register close_db and init_db_command with the application instance.
def init_app(app):
    # Call close_db after returning the response.
    app.teardown_appcontext(close_db)
    
    # Add new command that can be called with the flask command.
    app.cli.add_command(init_db_command)