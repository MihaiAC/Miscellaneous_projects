from typing import Optional


class GetUserResultGetUser:
    name: str
    age: int


class GetUserResult:
    get_user: Optional[GetUserResultGetUser]


class GetUserVariables:
    userId: Optional[int]
