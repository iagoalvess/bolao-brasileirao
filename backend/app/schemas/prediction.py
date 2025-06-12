from pydantic import BaseModel, ConfigDict


class PredictionBase(BaseModel):
    match_id: int
    home_team_score: int
    away_team_score: int


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(PredictionBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)
