from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ...database.connection import get_db
from ...models.user import User
from .token import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> User:
    payload = decode_token(token)
    user_id = payload.get("sub")
    if user_id is None:
        raise _credentials_exception()

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise _credentials_exception()
    return user


def _credentials_exception():
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Erros nas credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )


def verify_refresh_token_and_get_user(token: str, db: Session) -> User:
    payload = decode_token(token)
    user_id = payload.get("sub")
    if user_id is None:
        raise _credentials_exception()

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise _credentials_exception()
    return user
