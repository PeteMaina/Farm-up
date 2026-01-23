from typing import Optional
from sqlmodel import Field, SQLModel
from .base import BaseSQLModel

class PestControlLog(BaseSQLModel, table=True):
    pest_type: str
    last_treatment: str
    next_treatment: str
    status: str
    user_id: int = Field(foreign_key="user.id")

class FarmEquipment(BaseSQLModel, table=True):
    name: str
    status: str  # Active, Maintenance, Idle
    last_serviced: str
    fuel_level: Optional[float] = None
    user_id: int = Field(foreign_key="user.id")

class FinancialReport(BaseSQLModel, table=True):
    month: str
    revenue: float
    expenses: float
    profit: float
    user_id: int = Field(foreign_key="user.id")
