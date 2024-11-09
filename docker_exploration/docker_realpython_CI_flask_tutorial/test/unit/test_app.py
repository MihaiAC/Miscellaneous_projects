import pytest

from page_tracker.app import app

@pytest.fixture
def http_client():
    return app.test_client()