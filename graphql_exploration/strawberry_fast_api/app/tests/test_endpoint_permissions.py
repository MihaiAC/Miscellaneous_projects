import pytest
from .utils import BaseQueries, post_graphql


@pytest.mark.auth
@pytest.mark.parametrize(
    "query, permissions",
    [
        (BaseQueries.APPLICATIONS, [False, True, True]),
    ],
)
def test_permissions(
    test_client, graphql_endpoint, user_header, admin_header, query, permissions
):
    # unauth_has_permission, user_has_permission, admin_has_permission
    # = permissions

    for idx, header in enumerate(["", user_header, admin_header]):
        result = post_graphql(test_client, graphql_endpoint, query, headers=header)
        has_permission = permissions[idx]
        query_was_successful = "errors" not in result
        assert has_permission == query_was_successful
