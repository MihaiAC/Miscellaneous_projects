import strawberry
from typing import List

users = [
    {"user_id": 1, "name": "Bob Doe", "age": 33},
    {"user_id": 2, "name": "Dough Nutts", "age": 34},
    {"user_id": 3, "name": "Cindy Doe", "age": 24},
    {"user_id": 4, "name": "John Doe", "age": 20},
]


class InputError(Exception):
    """Custom error for invalid user input"""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


@strawberry.type
class User:
    user_id: strawberry.ID
    name: str
    age: int

    def __init__(self, user_id: int, name: str, age: str):
        self.user_id = strawberry.ID(str(user_id))
        self.name = name
        self.age = age


@strawberry.type
class Query:
    @strawberry.field
    def get_user(user_id: int) -> User | None:
        """
        Retrieves a user by their user ID.

        Args:
            user_id (int): User's unique ID.

        Returns:
            User | None: The user object if found, otherwise None.

        Example:
            query {
                getUser(userId: 1) {
                    userId
                    name
                    age
                }
            }
        """
        matched_users = [User(**x) for x in users if x["user_id"] == user_id]
        return matched_users[0] if matched_users else None

    @strawberry.field
    def get_users(min_age: int) -> List[User]:
        """
        Retrieves a list of users who are older than a threshold.

        Args:
            min_age (int): The minimum age threshold.

        Returns:
            List[User]: A list of users who are at least `min_age` years old.

        Example:
            query {
                getUsers(minAge: 25) {
                    userId
                    name
                    age
                }
            }
        """
        return [User(**x) for x in users if x["age"] >= min_age]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_user(self, name: str, age: int) -> User:
        """
        Adds a new user.

        Args:
            name (str): The name of the user to add.
            age (int): The age of the user.

        Returns:
            User: The newly created user object with a unique user_id.

        Example:
            mutation {
                addUser(name: "Alice", age: 25) {
                    userId
                    name
                    age
                }
            }
        """
        new_user_id = len(users) + 1
        print(f"Adding user {new_user_id}: {name}, {age}")
        users.append({"user_id": new_user_id, "name": name, "age": age})
        return User(user_id=new_user_id, name=name, age=age)

    @strawberry.mutation
    def update_user(
        self, user_id: int, name: str | None = None, age: str | None = None
    ) -> User:
        """
        Updates an existing user's name, age, or both.

        Args:
            user_id (int): User's unique ID.
            name (str | None, optional): New name of the user.
            age (int | None, optional): New age of the user.

            At least one of name and age must be specified.

        Returns:
            updated User if successful, error response otherwise

        Example:
            mutation {
                addUser(name: "Alice", age: 25) {
                    userId
                    name
                    age
                }
            }
        """
        if name is None and age is None:
            raise InputError(
                "Update unsuccessful - at least one of name and age must be specified."
            )

        # Querying our "db".
        user_idx = -1
        for idx in range(len(users)):
            if users[idx]["user_id"] == user_id:
                user_idx = idx
                break

        # User not found.
        if user_idx < 0:
            raise LookupError("Update unsuccessful - user not found.")

        # Update the user.
        if name is None:
            name = users[user_idx]["name"]

        if age is None:
            age = users[user_idx]["age"]

        users[user_idx] = {"user_id": user_id, "name": name, "age": age}
        return User(**users[user_idx])

    @strawberry.mutation
    def delete_user(user_id: int) -> bool:
        """
        Deletes an existing user.

        Args:
            user_id (int): ID of the user to be deleted.

        Returns:
            True if deletion was successful
        """
        global users
        prev_len = len(users)
        users = [user for user in users if user["user_id"] != user_id]

        if prev_len == len(users):
            raise LookupError("Deletion unsuccessful - user not found.")
        return True


schema = strawberry.Schema(query=Query, mutation=Mutation)
