from pydantic import BaseModel


class TopScorer(BaseModel):
    user_id: int
    username: str
    points: int


class DashboardSummary(BaseModel):
    current_round: int
    total_predictions: int
    top_scorer: TopScorer


class UserDashboard(BaseModel):
    user_id: int
    username: str
    total_points: int
    current_rank: int
    has_pending_predictions: bool
