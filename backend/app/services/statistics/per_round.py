from typing import List
from sqlalchemy.orm import Session, joinedload
from ...models.prediction import Prediction
from ...models.match import Match
from .utils import calculate_points


def get_points_per_round(predictions:List[Prediction]):
    
    points_by_round = {}

    for p in predictions:
        if not p.match or p.match.status != "FINISHED":
            continue

        round_id = p.match.round
        points = calculate_points(p, p.match)
        points_by_round.setdefault(round_id, []).append(points)

    return {str(r): sum(pts) for r, pts in points_by_round.items()}
