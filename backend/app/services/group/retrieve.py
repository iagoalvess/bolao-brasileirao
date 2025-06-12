from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.group import Group
from ...models.group_member import GroupMember
from ...schemas.group import GroupResponse


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


def get_group_by_id(db: Session, group_id: int) -> GroupResponse:
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado")

    members_count = (
        db.query(GroupMember).filter(GroupMember.group_id == group.id).count()
    )

    return GroupResponse(id=group.id, name=group.name, members_count=members_count)


def get_member_ids(db: Session, group_id: int):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado")

    member_ids = (
        db.query(GroupMember.user_id).filter(GroupMember.group_id == group_id).all()
    )
    return [id for (id,) in member_ids]


def get_user_group(db: Session, user_id: int) -> Group | None:
    return (
        db.query(Group).join(GroupMember).filter(GroupMember.user_id == user_id).first()
    )

