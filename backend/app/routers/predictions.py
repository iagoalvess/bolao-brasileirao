from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from ..database.connection import get_db
from ..models.match import Match
from ..models.prediction import Prediction
from ..models.user import User
from ..schemas.prediction import PredictionCreate, PredictionResponse
from ..services.auth import get_current_user

router = APIRouter(prefix="/predictions", tags=["predictions"])


@router.post("/", response_model=PredictionResponse)
async def create_prediction(
    prediction: PredictionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    match = db.query(Match).filter(Match.id == prediction.match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Partida não encontrada")

    if match.status == "FINISHED":
        raise HTTPException(
            status_code=400, detail="Não é possível palpitar em partidas já finalizadas"
        )

    existing_prediction = (
        db.query(Prediction)
        .filter(
            Prediction.user_id == current_user.id,
            Prediction.match_id == prediction.match_id,
        )
        .first()
    )
    if existing_prediction:
        raise HTTPException(
            status_code=400, detail="Usuario já fez palpite para essa partida"
        )

    db_prediction = Prediction(
        user_id=current_user.id,
        match_id=prediction.match_id,
        home_team_score=prediction.home_team_score,
        away_team_score=prediction.away_team_score,
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return db_prediction


@router.get("/me", response_model=List[PredictionResponse])
async def get_user_predictions(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    predictions = (
        db.query(Prediction).filter(Prediction.user_id == current_user.id).all()
    )

    return predictions


@router.get("/", response_model=List[PredictionResponse])
async def get_all_predictions(db: Session = Depends(get_db)):
    predictions = db.query(Prediction).all()

    return predictions


@router.get("/by-round", response_model=List[PredictionResponse])
async def get_my_predictions_by_round(
    round: int = Query(..., description="Número da rodada"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    predictions = (
        db.query(Prediction)
        .join(Match, Prediction.match_id == Match.id)
        .filter(Prediction.user_id == current_user.id, Match.round == round)
        .all()
    )

    return predictions
