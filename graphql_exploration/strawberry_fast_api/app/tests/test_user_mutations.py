import pytest
from app.db.data import USERS_DATA
from .utils import post_graphql
from freezegun import freeze_time
from app.settings.config import JWT_EXPIRATION_TIME_MINUTES
from datetime import datetime, timezone, timedelta
from app.errors.error_messages import (
    USER_ALREADY_EXISTS,
    INVALID_AUTHORIZATION_HEADER,
    INSUFFICIENT_PRIVILEGES,
    EXPIRED_TOKEN,
)


def assert_no_new_user_added(test_client, graphql_endpoint):
    # Make sure no new user was added.
    query = """
    query {
        users {
            id
            email
            username
            role
        }
    }
    """
    result = post_graphql(test_client, graphql_endpoint, query)
    users = result["data"]["users"]
    assert len(users) == len(USERS_DATA)


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_user_unauth(test_client, graphql_endpoint):
    username = "New User"
    email = "newuser@example.com"
    password = "newpass123"
    role = "user"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(test_client, graphql_endpoint, query)
    assert "errors" in result
    assert result["errors"][0]["message"] == INVALID_AUTHORIZATION_HEADER


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_existing_user_unauth(test_client, graphql_endpoint):
    username = "New User"
    email = USERS_DATA[0]["email"]
    password = "newpass123"
    role = "user"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(test_client, graphql_endpoint, query)
    assert "errors" in result
    assert result["errors"][0]["message"] == INVALID_AUTHORIZATION_HEADER

    assert_no_new_user_added(test_client, graphql_endpoint)


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_admin_unauth(test_client, graphql_endpoint):
    username = "New User"
    email = "new_email@example.com"
    password = "newpass123"
    role = "admin"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(test_client, graphql_endpoint, query)
    assert "errors" in result
    assert result["errors"][0]["message"] == INVALID_AUTHORIZATION_HEADER

    assert_no_new_user_added(test_client, graphql_endpoint)


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_admin_bad_token(test_client, graphql_endpoint, invalid_token_header):
    username = "New User"
    email = "new_email@example.com"
    password = "newpass123"
    role = "admin"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(
        test_client,
        graphql_endpoint,
        query,
        headers=invalid_token_header,
    )
    assert "errors" in result

    assert_no_new_user_added(test_client, graphql_endpoint)


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_admin_auth_as_user(test_client, graphql_endpoint, user_header):
    username = "New User"
    email = "new_email@example.com"
    password = "newpass123"
    role = "admin"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(
        test_client,
        graphql_endpoint,
        query,
        headers=user_header,
    )
    assert "errors" in result
    assert result["errors"][0]["message"] == INSUFFICIENT_PRIVILEGES
    assert_no_new_user_added(test_client, graphql_endpoint)


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_admin_auth_as_admin(test_client, graphql_endpoint, admin_header):
    username = "New User"
    email = "new_email@example.com"
    password = "newpass123"
    role = "admin"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    result = post_graphql(
        test_client,
        graphql_endpoint,
        query,
        headers=admin_header,
    )

    user = result["data"]["addUser"]
    assert user["username"] == username
    assert user["email"] == email
    assert user["role"] == role
    assert user["id"] == len(USERS_DATA) + 1


@pytest.mark.api
@pytest.mark.mutation
@pytest.mark.auth
def test_add_new_admin_auth_as_admin_token_expired(
    test_client, graphql_endpoint, admin_header
):
    username = "New User"
    email = "new_email@example.com"
    password = "newpass123"
    role = "admin"
    query = f"""
    mutation {{
        addUser(
            username: "{username}",
            email: "{email}",
            password: "{password}",
            role: "{role}"
        ) {{
            id
            username
            email
            role
        }}
    }}
    """
    expiration_time = datetime.now(timezone.utc) + timedelta(
        minutes=JWT_EXPIRATION_TIME_MINUTES + 1
    )
    with freeze_time(expiration_time):
        result = post_graphql(
            test_client,
            graphql_endpoint,
            query,
            headers=admin_header,
        )

    assert "errors" in result
    assert result["errors"][0]["message"] == EXPIRED_TOKEN
    assert_no_new_user_added(test_client, graphql_endpoint)
