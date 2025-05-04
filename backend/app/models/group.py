from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    max_users = Column(Integer, default=10, nullable=False)

    group_members = relationship(
        "GroupMember", back_populates="group", cascade="all, delete-orphan"
    )
    members = relationship(
        "User", secondary="group_members", back_populates="groups", viewonly=True
    )
