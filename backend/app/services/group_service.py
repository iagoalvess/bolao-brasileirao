from sqlalchemy.orm import Session
from ..models.group import Group
from ..models.user import User
from fastapi import HTTPException
from ..schemas.group import GroupResponse


class GroupService:
    @staticmethod
    def create_group(db: Session, name: str, current_user: User) -> GroupResponse:
        group = Group(name=name)
        db.add(group)
        db.commit()
        db.refresh(group)

        group.members.append(current_user)
        db.commit()
        db.refresh(group)
        
        group_response = GroupResponse(
            id=group.id,
            name=group.name,
            members_count=len(group.members),
        )
        return group_response

    @staticmethod
    def get_all_groups(db: Session):
        groups = db.query(Group).all()

        return [
            GroupResponse(
                id=group.id,
                name=group.name,
                members_count=len(group.members),
            )
            for group in groups
        ]

    @staticmethod
    def get_group_by_id(db: Session, group_id: int) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        return GroupResponse(
            id=group.id, name=group.name, members_count=len(group.members)
        )

    @staticmethod
    def add_member_to_group(db: Session, group_id: int, user_id: int) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        if len(group.members) >= group.max_users:
            raise HTTPException(status_code=400, detail="Grupo cheio")

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        if user in group.members:
            raise HTTPException(status_code=400, detail="Usuário já é membro do grupo")

        group.members.append(user)
        db.commit()
        db.refresh(group)

        return GroupResponse(
            id=group.id, name=group.name, members_count=len(group.members)
        )

    @staticmethod
    def remove_member_from_group(
        db: Session, group_id: int, user_id: int
    ) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        if user not in group.members:
            raise HTTPException(status_code=400, detail="Usuário não é membro do grupo")

        group.members.remove(user)
        db.commit()
        db.refresh(group)

        return GroupResponse(
            id=group.id, name=group.name, members_count=len(group.members)
        )

    @staticmethod
    def get_member_ids(db: Session, group_id: int):
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        member_ids = [user.id for user in group.members]
        return member_ids
