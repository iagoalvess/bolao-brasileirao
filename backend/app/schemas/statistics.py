from pydantic import BaseModel


class PersonalStats(BaseModel):
    exact_hits: int
    winner_hits: int
    errors: int
    avg_points_per_round: float


class GlobalStats(BaseModel):
    most_predicted_team: str | None
    most_predicted_score: str | None
    avg_points_per_round: float
