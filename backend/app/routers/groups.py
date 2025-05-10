from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database.connection import get_db
from ..models.group import Group
from ..models.group_member import GroupMember
from ..models.user import User
from ..services.auth.dependencies import get_current_user
from ..schemas.group import GroupCreate, GroupResponse
from ..services.group_service import GroupService

router = APIRouter(prefix="/groups", tags=["groups"])


@router.post("/", response_model=GroupResponse)
async def create_group(
    group: GroupCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_group = db.query(Group).filter(Group.name == group.name).first()
    if existing_group:
        raise HTTPException(status_code=400, detail="Nome de grupo já em uso")

    return GroupService.create_group(db, name=group.name, current_user=current_user)


@router.get("/", response_model=List[GroupResponse])
async def get_groups(db: Session = Depends(get_db)):
    groups = GroupService.get_all_groups(db)
    return groups


@router.get("/my-group", response_model=GroupResponse | None)
async def get_my_group(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    group = (
        db.query(Group)
        .join(GroupMember)
        .filter(GroupMember.user_id == current_user.id)
        .first()
    )

    if not group:
        return None

    members_count = (
        db.query(GroupMember).filter(GroupMember.group_id == group.id).count()
    )

    return GroupResponse(
        id=group.id,
        name=group.name,
        members_count=members_count,
    )


@router.get("/{group_id}", response_model=GroupResponse)
async def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado")

    members_count = len(group.members)

    return GroupResponse(id=group.id, name=group.name, members_count=members_count)


@router.post("/{group_id}/join", response_model=GroupResponse)
async def join_group(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return GroupService.add_member_to_group(db, group_id, current_user)


@router.post("/{group_id}/leave", response_model=GroupResponse)
async def leave_group(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return GroupService.remove_member_from_group(db, group_id, current_user)


@router.get("/{group_id}/members", response_model=List[int])
async def get_group_member_ids(group_id: int, db: Session = Depends(get_db)):
    member_ids = GroupService.get_member_ids(db, group_id)
    return member_ids
