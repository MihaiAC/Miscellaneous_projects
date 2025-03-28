import strawberry
from app.db.database import engine
from .types import (
    Job as Job_gql,
    Success as Success_gql,
)
from app.db.database import Job_sql
from sqlalchemy.orm import Session
from .utils import to_employer_gql, to_job_gql


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_job(self, title: str, description: str, employer_id: int) -> Job_gql:
        with Session(engine) as session:
            job_sql = Job_sql(
                title=title, description=description, employer_id=employer_id
            )
            session.add(job_sql)
            session.commit()
            session.refresh(job_sql)

            job_gql = Job_gql(
                id=job_sql.id,
                title=title,
                description=description,
                employer_id=employer_id,
                employer=to_employer_gql(job_sql.employer, deep=False),
            )
        return job_gql
