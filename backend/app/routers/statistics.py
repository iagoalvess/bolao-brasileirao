from typing import Dict
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db

from app.services.statistics import (
    get_global_statistics,
    get_personal_statistics,
    get_points_per_round,
)
from app.schemas.statistics import PersonalStats, GlobalStats
from app.services.statistics.utils import get_finish_predictions, get_finish_predictions_of_user, get_all_predictions_of_user

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("/personal/{user_id}", response_model=PersonalStats)
def personal_statistics(user_id: int, db: Session = Depends(get_db)):
    return get_personal_statistics(get_finish_predictions_of_user(db, user_id))


@router.get("/global", response_model=GlobalStats)
def global_statistics(db: Session = Depends(get_db)):
    return get_global_statistics(get_finish_predictions(db))


@router.get("/personal/{user_id}/points-by-round", response_model=Dict[str, int])
def personal_points_by_round(user_id: int, db: Session = Depends(get_db)):
    return get_points_per_round(get_finish_predictions_of_user(db, user_id))
