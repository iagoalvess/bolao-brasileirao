from sqlalchemy.orm import Session
from app.models.prediction import Prediction
from app.models.match import Match
from collections import Counter


def get_personal_statistics(db: Session, user_id: int):
    predictions = db.query(Prediction).filter(Prediction.user_id == user_id).all()

    exact = winner = error = total_points = 0
    rounds = set()

    for p in predictions:
        if not p.match or p.match.status != "FINISHED":
            continue

        rounds.add(p.match.round)

        if p.home_score == p.match.home_score and p.away_score == p.match.away_score:
            exact += 1
            total_points += 5
        elif (p.home_score - p.away_score) * (
            p.match.home_score - p.match.away_score
        ) > 0:
            winner += 1
            total_points += 3
        else:
            error += 1
            total_points += 0

    avg = total_points / len(rounds) if rounds else 0.0

    return {
        "exact_hits": exact,
        "winner_hits": winner,
        "errors": error,
        "avg_points_per_round": round(avg, 2),
    }


def get_global_statistics(db: Session):
    predictions = (
        db.query(Prediction).join(Match).filter(Match.status == "FINISHED").all()
    )

    team_counter = Counter()
    score_counter = Counter()
    points_by_round = {}

    for p in predictions:
        if not p.match:
            continue

        round_id = p.match.round

        if p.home_score == p.match.home_score and p.away_score == p.match.away_score:
            points = 5
        elif (p.home_score - p.away_score) * (
            p.match.home_score - p.match.away_score
        ) > 0:
            points = 3
        else:
            points = 0

        points_by_round.setdefault(round_id, []).append(points)

        team_counter[p.home_team] += 1
        team_counter[p.away_team] += 1

        score_str = f"{p.home_score}x{p.away_score}"
        score_counter[score_str] += 1

    rounds = list(points_by_round.values())
    all_points = [p for sublist in rounds for p in sublist]
    avg = sum(all_points) / len(rounds) if rounds else 0.0

    return {
        "most_predicted_team": (
            team_counter.most_common(1)[0][0] if team_counter else None
        ),
        "most_predicted_score": (
            score_counter.most_common(1)[0][0] if score_counter else None
        ),
        "avg_points_per_round": round(avg, 2),
    }


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

        if p.home_score == p.match.home_score and p.away_score == p.match.away_score:
            points = 5
        elif (p.home_score - p.away_score) * (
            p.match.home_score - p.match.away_score
        ) > 0:
            points = 3
        else:
            points = 0

        points_by_round.setdefault(round_id, []).append(points)

    return {r: sum(pts) for r, pts in points_by_round.items()}
