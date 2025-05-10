from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.group import Group
from ...models.group_member import GroupMember
from ...models.user import User
from ...schemas.group import GroupResponse


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

    return GroupResponse(id=group.id, name=group.name, members_count=len(group.members))


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

    return GroupResponse(id=group.id, name=group.name, members_count=len(group.members))
