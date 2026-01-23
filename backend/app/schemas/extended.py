from typing import List, Optional
from pydantic import BaseModel

class PestControlOut(BaseModel):
    id: int
    pest_type: str
    last_treatment: str
    next_treatment: str
    status: str

class EquipmentOut(BaseModel):
    id: int
    name: str
    status: str
    last_serviced: str
    fuel_level: Optional[float]

class FinancialReportOut(BaseModel):
    id: int
    month: str
    revenue: float
    expenses: float
    profit: float
