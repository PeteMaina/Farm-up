from typing import Optional
from sqlmodel import Field, SQLModel
from .base import BaseSQLModel

class CropAnalytics(BaseSQLModel, table=True):
    crop_name: str
    yield_predicted: float
    health_score: float
    moisture_level: float
    user_id: int = Field(foreign_key="user.id")

class SoilHealth(BaseSQLModel, table=True):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph_level: float
    location_tag: str
    user_id: int = Field(foreign_key="user.id")

class IrrigationLog(BaseSQLModel, table=True):
    zone: str
    liters_used: float
    timestamp: Optional[str] = None
    status: str = "Completed"
    user_id: int = Field(foreign_key="user.id")
