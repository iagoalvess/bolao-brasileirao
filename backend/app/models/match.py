from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from ..database.connection import Base
import hashlib

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(String(64), unique=True, nullable=False)
    match_date = Column(DateTime, nullable=False)
    home_team = Column(String(100), nullable=False)
    away_team = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)

    predictions = relationship("Prediction", back_populates="match")

    @staticmethod
    def generate_match_id(match_date: str, home_team: str, away_team: str) -> str:
        unique_string = f"{match_date}-{home_team}-{away_team}"
        return hashlib.sha256(unique_string.encode()).hexdigest()