from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class Scoreboard(BaseModel):
    home: int
    visitor: int


class MatchBase(BaseModel):
    match_id: str
    match_date: datetime
    home_team: str
    away_team: str
    status: str
    scoreboard: Optional[Scoreboard] = None

class MatchCreate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
