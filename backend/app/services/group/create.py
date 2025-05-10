from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.group import Group
from ...models.group_member import GroupMember
from ...models.user import User
from ...schemas.group import GroupResponse


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
