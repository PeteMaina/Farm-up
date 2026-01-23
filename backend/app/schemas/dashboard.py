from typing import List, Optional
from pydantic import BaseModel

class CropAnalyticsOut(BaseModel):
    id: int
    crop_name: str
    yield_predicted: float
    health_score: float
    moisture_level: float

class SoilHealthOut(BaseModel):
    id: int
    nitrogen: float
    phosphorus: float
    potassium: float
    ph_level: float
    location_tag: str

class IrrigationLogOut(BaseModel):
    id: int
    zone: str
    liters_used: float
    timestamp: Optional[str]
    status: str

class DashboardSummary(BaseModel):
    crops: List[CropAnalyticsOut]
    soil: List[SoilHealthOut]
    irrigation: List[IrrigationLogOut]
