from sqlalchemy.orm import Session
from fastapi import HTTPException
from ...models.user import User


def get_user_by_id(user_id: int, db: Session) -> User:
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return db_user
