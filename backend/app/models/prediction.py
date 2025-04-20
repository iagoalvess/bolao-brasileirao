from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    match_id = Column(Integer, ForeignKey("matches.id"), nullable=False)
    home_team_score = Column(Integer, nullable=False)
    away_team_score = Column(Integer, nullable=False)

    user = relationship("User", back_populates="predictions")
    match = relationship("Match", back_populates="predictions")
