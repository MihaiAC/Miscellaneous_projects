import os
from flask import Flask
from . import db
from . import view_counter

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    
    # Initialise the database.
    db.init_app(app)
    
    # Register the view counter bp.
    app.register_blueprint(view_counter.bp)

    return app