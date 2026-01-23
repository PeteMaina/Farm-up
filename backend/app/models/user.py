from typing import Optional
from sqlmodel import Field, SQLModel
from .base import BaseSQLModel

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: Optional[str] = None
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)

class User(UserBase, BaseSQLModel, table=True):
    hashed_password: str
