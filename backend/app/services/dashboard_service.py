from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.user import User
from app.models.prediction import Prediction
from app.models.match import Match


def get_summary(db: Session):
    current_round = (
        db.query(Match.round)
        .filter(Match.status == "FINISHED")
        .order_by(Match.round.desc())
        .limit(1)
        .scalar()
    )

    total_predictions = (
        db.query(Prediction).join(Match).filter(Match.round == current_round).count()
    )

    top_scorer = db.query(User).order_by(User.total_points.desc()).first()
    top_scorer_data = (
        {
            "user_id": top_scorer.id,
            "username": top_scorer.username,
            "points": top_scorer.total_points,
        }
        if top_scorer
        else None
    )

    return {
        "current_round": current_round,
        "total_predictions": total_predictions,
        "top_scorer": top_scorer_data,
    }


def get_user_summary(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")

    all_users = db.query(User).order_by(User.total_points.desc()).all()
    current_rank = next(
        (i + 1 for i, u in enumerate(all_users) if u.id == user_id), None
    )

    future_matches = db.query(Match).filter(Match.match_date > func.now()).all()
    pending_predictions = any(
        not db.query(Prediction)
        .filter(Prediction.match_id == m.id, Prediction.user_id == user_id)
        .first()
        for m in future_matches
    )

    return {
        "user_id": user.id,
        "username": user.username,
        "total_points": user.total_points,
        "current_rank": current_rank,
        "has_pending_predictions": pending_predictions,
    }
