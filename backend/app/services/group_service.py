from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.group import Group
from ..models.group_member import GroupMember
from ..models.user import User
from ..schemas.group import GroupResponse


class GroupService:
    @staticmethod
    def create_group(db: Session, name: str, current_user: User) -> GroupResponse:
        user_group = (
            db.query(GroupMember).filter(GroupMember.user_id == current_user.id).first()
        )
        if user_group:
            raise HTTPException(status_code=400, detail="Usuário já está em um grupo")

        group = Group(name=name)
        db.add(group)
        db.commit()
        db.refresh(group)

        membership = GroupMember(user_id=current_user.id, group_id=group.id)
        db.add(membership)
        db.commit()

        members_count = (
            db.query(GroupMember).filter(GroupMember.group_id == group.id).count()
        )

        return GroupResponse(id=group.id, name=group.name, members_count=members_count)

    @staticmethod
    def get_all_groups(db: Session):
        groups = db.query(Group).all()

        return [
            GroupResponse(
                id=group.id,
                name=group.name,
                members_count=db.query(GroupMember)
                .filter(GroupMember.group_id == group.id)
                .count(),
            )
            for group in groups
        ]

    @staticmethod
    def get_group_by_id(db: Session, group_id: int) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        members_count = (
            db.query(GroupMember).filter(GroupMember.group_id == group.id).count()
        )

        return GroupResponse(id=group.id, name=group.name, members_count=members_count)

    @staticmethod
    def add_member_to_group(
        db: Session, group_id: int, current_user: User
    ) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()
        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        if len(group.members) >= group.max_users:
            raise HTTPException(status_code=400, detail="Grupo cheio")

        already_member = (
            db.query(GroupMember)
            .filter(
                GroupMember.group_id == group_id, GroupMember.user_id == current_user.id
            )
            .first()
        )
        if already_member:
            raise HTTPException(status_code=400, detail="Usuário já está neste grupo")

        new_member = GroupMember(group_id=group_id, user_id=current_user.id)
        db.add(new_member)
        db.commit()
        db.refresh(group)

        return GroupResponse(
            id=group.id, name=group.name, members_count=len(group.members)
        )

    @staticmethod
    def remove_member_from_group(
        db: Session, group_id: int, current_user: User
    ) -> GroupResponse:
        group = db.query(Group).filter(Group.id == group_id).first()

        if not group:
            raise HTTPException(status_code=404, detail="Grupo não encontrado")

        group_member = (
            db.query(GroupMember)
            .filter(
                GroupMember.group_id == group_id, GroupMember.user_id == current_user.id
            )
            .first()
        )

        if not group_member:
            raise HTTPException(status_code=400, detail="Você não está neste grupo")

        db.delete(group_member)
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

        member_ids = (
            db.query(GroupMember.user_id).filter(GroupMember.group_id == group_id).all()
        )
        return [id for (id,) in member_ids]

    @staticmethod
    def get_user_group(db: Session, user_id: int) -> Group | None:
        return (
            db.query(Group)
            .join(GroupMember)
            .filter(GroupMember.user_id == user_id)
            .first()
        )
