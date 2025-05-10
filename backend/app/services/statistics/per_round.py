from sqlalchemy.orm import Session
from app.models.prediction import Prediction
from app.models.match import Match
from .utils import calculate_points


def get_points_per_round(db: Session, user_id: int):
    predictions = (
        db.query(Prediction)
        .join(Match)
        .filter(Prediction.user_id == user_id, Match.status == "FINISHED")
        .all()
    )

    points_by_round = {}

    for p in predictions:
        round_id = p.match.round
        points = calculate_points(p, p.match)
        points_by_round.setdefault(round_id, []).append(points)

    return {str(r): sum(pts) for r, pts in points_by_round.items()}
