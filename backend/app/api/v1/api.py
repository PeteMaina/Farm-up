from fastapi import APIRouter
from app.api.v1.endpoints import login, users, dashboard, extended

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(extended.router, prefix="/extended", tags=["extended"])
