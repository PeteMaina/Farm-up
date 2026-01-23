from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/summary", response_model=schemas.dashboard.DashboardSummary)
def get_dashboard_summary(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    """
    Get summary data for the dashboard.
    """
    crops = db.exec(select(models.dashboard.CropAnalytics).where(models.dashboard.CropAnalytics.user_id == current_user.id)).all()
    soil = db.exec(select(models.dashboard.SoilHealth).where(models.dashboard.SoilHealth.user_id == current_user.id)).all()
    irrigation = db.exec(select(models.dashboard.IrrigationLog).where(models.dashboard.IrrigationLog.user_id == current_user.id)).all()
    
    return {
        "crops": crops,
        "soil": soil,
        "irrigation": irrigation
    }

@router.get("/crops", response_model=List[schemas.dashboard.CropAnalyticsOut])
def get_crops(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    return db.exec(select(models.dashboard.CropAnalytics).where(models.dashboard.CropAnalytics.user_id == current_user.id)).all()

@router.get("/soil", response_model=List[schemas.dashboard.SoilHealthOut])
def get_soil(
    db: Session = Depends(deps.get_db),
    current_user: models.user.User = Depends(deps.get_current_user),
) -> Any:
    return db.exec(select(models.dashboard.SoilHealth).where(models.dashboard.SoilHealth.user_id == current_user.id)).all()
