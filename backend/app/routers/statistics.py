from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.statistics_service import (
    get_personal_statistics,
    get_global_statistics,
)
from app.schemas.statistics import PersonalStats, GlobalStats

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("/personal/{user_id}", response_model=PersonalStats)
def personal_statistics(user_id: int, db: Session = Depends(get_db)):
    return get_personal_statistics(db, user_id)


@router.get("/global", response_model=GlobalStats)
def global_statistics(db: Session = Depends(get_db)):
    return get_global_statistics(db)
