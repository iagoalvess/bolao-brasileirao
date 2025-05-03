from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database.connection import get_db
from ..models.group import Group
from ..schemas.group import GroupCreate, GroupResponse
from ..services.group_service import GroupService

router = APIRouter(prefix="/groups", tags=["groups"])


@router.post("/", response_model=GroupResponse)
async def create_group(group: GroupCreate, db: Session = Depends(get_db)):
    existing_group = db.query(Group).filter(Group.name == group.name).first()
    if existing_group:
        raise HTTPException(status_code=400, detail="Nome de grupo já em uso")

    new_group = GroupService.create_group(db, name=group.name)
    return new_group


@router.get("/", response_model=List[GroupResponse])
async def get_groups(db: Session = Depends(get_db)):
    groups = GroupService.get_all_groups(db)
    return groups


@router.get("/{group_id}", response_model=GroupResponse)
async def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Grupo não encontrado")

    members_count = len(group.members)

    return GroupResponse(id=group.id, name=group.name, members_count=members_count)


@router.post("/{group_id}/add_member")
async def add_member_to_group(
    group_id: int, user_id: int, db: Session = Depends(get_db)
):
    group = GroupService.add_member_to_group(db, group_id, user_id)
    return group


@router.post("/{group_id}/remove_member")
async def remove_member_from_group(
    group_id: int, user_id: int, db: Session = Depends(get_db)
):
    group = GroupService.remove_member_from_group(db, group_id, user_id)
    return group


@router.get("/{group_id}/members", response_model=List[int])
async def get_group_member_ids(group_id: int, db: Session = Depends(get_db)):
    member_ids = GroupService.get_member_ids(db, group_id)
    return member_ids
