from typing import List
from sqlalchemy.orm import Session
from collections import Counter
from app.models.prediction import Prediction
from app.models.match import Match
from .utils import calculate_points


def get_global_statistics(predictions: List[Prediction]):

    team_counter = Counter()
    score_counter = Counter()
    points_by_round = {}

    for p in predictions:
        if not p.match:
            continue

        round_id = p.match.round
        points = calculate_points(p, p.match)
        points_by_round.setdefault(round_id, []).append(points)

        team_counter[p.match.home_team] += 1
        team_counter[p.match.away_team] += 1

        score_counter[f"{p.home_team_score}x{p.away_team_score}"] += 1

    all_points = [p for pts in points_by_round.values() for p in pts]
    avg = sum(all_points) / len(points_by_round) if points_by_round else 0.0

    return {
        "most_predicted_team": (
            team_counter.most_common(1)[0][0] if team_counter else None
        ),
        "most_predicted_score": (
            score_counter.most_common(1)[0][0] if score_counter else None
        ),
        "avg_points_per_round": round(avg, 2),
    }
