from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.user import User
from ..auth import verify_password, create_access_token


def authenticate_user(username: str, password: str, db: Session) -> User:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def create_access_token_for_user(user: User) -> str:
    return create_access_token(data={"sub": str(user.id)})
