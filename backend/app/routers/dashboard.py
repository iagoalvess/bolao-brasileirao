from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services import dashboard_service
from app.schemas.dashboard import DashboardSummary, UserDashboard

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def summary(db: Session = Depends(get_db)):
    data = dashboard_service.get_summary(db)
    if not data:
        raise HTTPException(status_code=404, detail="Sem dados disponíveis")
    return data


@router.get("/user/{user_id}", response_model=UserDashboard)
def user_summary(user_id: int, db: Session = Depends(get_db)):
    try:
        data = dashboard_service.get_user_summary(db, user_id)
        return data
    except ValueError:
        raise HTTPException(status_code=404, detail="Usuario não encontrado")
