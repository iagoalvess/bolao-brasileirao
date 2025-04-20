from pydantic import BaseModel, ConfigDict
from datetime import datetime

class MatchBase(BaseModel):
    match_id: str
    match_date: datetime
    home_team: str
    away_team: str
    status: str

class MatchCreate(MatchBase):
    pass

class MatchResponse(MatchBase):
    id: int

    model_config = ConfigDict(from_attributes=True)