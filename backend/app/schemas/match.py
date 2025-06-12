from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class MatchBase(BaseModel):
    match_id: str
    match_date: datetime
    home_team: str
    away_team: str
    status: str

    home_score: Optional[int] = None
    away_score: Optional[int] = None
    stadium: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    broadcasters: Optional[str] = None


class MatchCreate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
