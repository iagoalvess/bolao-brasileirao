from typing import Optional
from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    team: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    total_points: int
    team: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
