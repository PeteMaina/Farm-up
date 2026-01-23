from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/pest-control", response_model=List[schemas.extended.PestControlOut])
def get_pest_control(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    return db.exec(select(models.extended.PestControlLog).where(models.extended.PestControlLog.user_id == current_user.id)).all()

@router.get("/equipment", response_model=List[schemas.extended.EquipmentOut])
def get_equipment(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    return db.exec(select(models.extended.FarmEquipment).where(models.extended.FarmEquipment.user_id == current_user.id)).all()

@router.get("/financials", response_model=List[schemas.extended.FinancialReportOut])
def get_financials(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    return db.exec(select(models.extended.FinancialReport).where(models.extended.FinancialReport.user_id == current_user.id)).all()
