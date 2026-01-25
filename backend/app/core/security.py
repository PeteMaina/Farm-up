from datetime import datetime, timedelta, timezone
from typing import Any, Union
from jose import jwt
import bcrypt

# Monkeypatch bcrypt to work with passlib
# See: https://github.com/pyca/bcrypt/issues/684
if not hasattr(bcrypt, "__about__"):
    try:
        from collections import namedtuple
        Version = namedtuple("Version", ["__version__"])
        bcrypt.__about__ = Version(bcrypt.__version__)
    except ImportError:
        pass

from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
