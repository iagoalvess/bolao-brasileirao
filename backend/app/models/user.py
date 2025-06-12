from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    total_points = Column(Integer, default=0, nullable=False)
    team = Column(String(50), nullable=True)
    
    predictions = relationship("Prediction", back_populates="user")

    group_members = relationship(
        "GroupMember", back_populates="user", cascade="all, delete-orphan"
    )
    groups = relationship(
        "Group", secondary="group_members", back_populates="members", viewonly=True
    )
