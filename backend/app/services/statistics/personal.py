from sqlalchemy.orm import Session
from app.models.prediction import Prediction
from .utils import calculate_points


def get_personal_statistics(db: Session, user_id: int):
    predictions = db.query(Prediction).filter(Prediction.user_id == user_id).all()

    exact = winner = error = total_points = 0
    rounds = set()

    for p in predictions:
        if not p.match or p.match.status != "FINISHED":
            continue

        rounds.add(p.match.round)
        points = calculate_points(p, p.match)
        total_points += points

        if points == 5:
            exact += 1
        elif points == 3:
            winner += 1
        else:
            error += 1

    avg = total_points / len(rounds) if rounds else 0.0

    return {
        "exact_hits": exact,
        "winner_hits": winner,
        "errors": error,
        "avg_points_per_round": round(avg, 2),
    }
