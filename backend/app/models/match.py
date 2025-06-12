import hashlib
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    round = Column(Integer, nullable=False)
    match_id = Column(String(64), unique=True, nullable=False)
    match_date = Column(DateTime, nullable=False)
    home_team = Column(String(100), nullable=False)
    away_team = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)

    home_score = Column(Integer, nullable=True)
    away_score = Column(Integer, nullable=True)
    stadium = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(2), nullable=True)
    broadcasters = Column(String(255), nullable=True)

    predictions = relationship("Prediction", back_populates="match")

    @staticmethod
    def generate_match_id(match_date: str, home_team: str, away_team: str) -> str:
        unique_string = f"{match_date}-{home_team}-{away_team}"
        return hashlib.sha256(unique_string.encode()).hexdigest()
