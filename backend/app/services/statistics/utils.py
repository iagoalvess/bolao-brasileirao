from typing import List
from pytest import Session
from sqlalchemy.orm import Session, joinedload
from app.models.prediction import Prediction
from app.models.match import Match


def calculate_points(pred, match) -> int:
    if (
        pred.home_team_score == match.home_score
        and pred.away_team_score == match.away_score
    ):
        return 5
    elif (pred.home_team_score - pred.away_team_score) * (
        match.home_score - match.away_score
    ) > 0:
        return 3
    return 0

def get_all_predictions_of_user(db: Session, user_id: int) -> List[Prediction]:
      return (
        db.query(Prediction)
        .options(joinedload(Prediction.match))
        .filter(Prediction.user_id == user_id)
        .all()
    )
      
def get_finish_predictions_of_user(db: Session, user_id: int) -> List[Prediction]:
    return (
        db.query(Prediction)
        .options(joinedload(Prediction.match))
        .join(Prediction.match)
        .filter(Prediction.user_id == user_id, Match.status == "FINISHED")
        .all()
    )

def get_finish_predictions(db: Session, user_id: int) -> List[Prediction]:
     return (
        db.query(Prediction).join(Match).filter(Match.status == "FINISHED").all()
    )
