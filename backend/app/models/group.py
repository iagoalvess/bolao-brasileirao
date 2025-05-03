from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    max_users = Column(Integer, default=10, nullable=False)

    members = relationship("User", secondary="group_members", back_populates="groups")


class GroupMember(Base):
    __tablename__ = "group_members"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    group_id = Column(Integer, ForeignKey("groups.id"), primary_key=True)

    user = relationship("User")
    group = relationship("Group")
