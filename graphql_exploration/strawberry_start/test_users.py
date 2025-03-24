import pytest
from .users import schema


@pytest.fixture
def setup_users():
    global users
    users = [
        {"user_id": 1, "name": "Bob Doe", "age": 33},
        {"user_id": 2, "name": "Dough Nutts", "age": 34},
        {"user_id": 3, "name": "Cindy Doe", "age": 24},
        {"user_id": 4, "name": "John Doe", "age": 20},
    ]


def test_delete_existing_user(setup_users):
    """Test deleting an existing user."""
    query = """
        mutation DeleteUser($id: Int!) {
            deleteUser(userId: $id)
        }
    """
    result = schema.execute_sync(query, variable_values={"id": 1})

    assert result.errors is None
    assert result.data["deleteUser"]


def test_delete_nonexisting_user(setup_users):
    """Test deleting a nonexisting user."""
    query = """
        mutation DeleteUser($id: Int!) {
            deleteUser(userId: $id)
        }
    """
    result = schema.execute_sync(query, variable_values={"id": 10})

    assert result.errors is not None
    assert result.errors[0].message.startswith("Deletion unsuccessful")
