from sqlalchemy.orm import Session
from ..models.match import Match
from ..models.prediction import Prediction
from ..models.user import User


class ScoringService:
    @staticmethod
    def calculate_prediction_points(prediction: Prediction, match: Match) -> int:
        if match.status != "FINISHED" or not match.scoreboard:
            return 0

        actual_home_score = match.scoreboard["home"]
        actual_away_score = match.scoreboard["visitor"]
        predicted_home_score = prediction.home_team_score
        predicted_away_score = prediction.away_team_score

        if actual_home_score > actual_away_score:
            actual_outcome = "HOME_WIN"
        elif actual_home_score < actual_away_score:
            actual_outcome = "AWAY_WIN"
        else:
            actual_outcome = "DRAW"

        if predicted_home_score > predicted_away_score:
            predicted_outcome = "HOME_WIN"
        elif predicted_home_score < predicted_away_score:
            predicted_outcome = "AWAY_WIN"
        else:
            predicted_outcome = "DRAW"

        if (
            predicted_home_score == actual_home_score
            and predicted_away_score == actual_away_score
        ):
            return 5

        if predicted_outcome == actual_outcome:
            return 3

        return 0

    @staticmethod
    def update_prediction_points(db: Session, prediction: Prediction):
        match = prediction.match
        points = ScoringService.calculate_prediction_points(prediction, match)

        prediction.points = points
        db.add(prediction)

        user = prediction.user

        user.total_points = sum(pred.points for pred in user.predictions)
        db.add(user)

    @staticmethod
    def update_all_predictions(db: Session):
        predictions = (
            db.query(Prediction).join(Match).filter(Match.status == "FINISHED").all()
        )
        for prediction in predictions:
            ScoringService.update_prediction_points(db, prediction)
        db.commit()
