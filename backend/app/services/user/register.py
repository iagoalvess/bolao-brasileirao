from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.user import User
from ...schemas.user import UserCreate
from ..auth import get_password_hash


def create_new_user(user: UserCreate, db: Session) -> User:
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email já registrado")
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Usuário já registrado")

    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        team=user.team,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
