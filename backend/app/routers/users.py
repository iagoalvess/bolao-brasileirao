from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

from ..services.auth.dependencies import (
    get_current_user,
    verify_refresh_token_and_get_user,
)
from ..services.auth.token import create_refresh_token

from ..database.connection import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserResponse
from ..services.user_service import (
    create_new_user,
    get_user_by_id,
    authenticate_user,
    create_access_token_for_user,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_new_user(user, db)
    return db_user


@router.get("/", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(form_data.username, form_data.password, db)
    access_token = create_access_token_for_user(user)
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/{user_id}", response_model=UserResponse)
async def user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(user_id, db)
    return user


@router.post("/refresh-token")
async def refresh_token(token: str = Body(...), db: Session = Depends(get_db)):
    user = verify_refresh_token_and_get_user(token, db)
    new_access_token = create_access_token_for_user(user)
    return {"access_token": new_access_token}
