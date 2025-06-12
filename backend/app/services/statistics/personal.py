from typing import List
from sqlalchemy.orm import Session, joinedload
from app.models.prediction import Prediction
from .utils import calculate_points
from ...models.match import Match


def get_personal_statistics(predictions: List[Prediction]):

    exact = winner = error = total_points = 0
    rounds = set()

    for p in predictions:
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
