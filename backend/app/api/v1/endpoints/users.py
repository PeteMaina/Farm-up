from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app import models, schemas
from app.api import deps
from app.core import security

router = APIRouter()

@router.post("/signup", response_model=schemas.user.UserOut)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.user.UserCreate,
) -> Any:
    """
    Create new user.
    """
    statement = select(models.user.User).where(models.user.User.email == user_in.email)
    user = db.exec(statement).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    db_obj = models.user.User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_superuser=False,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/me", response_model=schemas.user.UserOut)
def read_user_me(
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user
