from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database.connection import get_db
from ..models.match import Match
from ..schemas.match import MatchResponse
from ..services.match_service import MatchService

router = APIRouter(prefix="/matches", tags=["matches"])


@router.post("/sync-all", status_code=200)
async def sync_all_matches(db: Session = Depends(get_db)):
    try:
        MatchService.sync_all_matches_from_api(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao sincronizar partidas: {str(e)}")

    return {"detail": "Sincronização concluída com sucesso."}


@router.get("/round/{round}", response_model=List[MatchResponse])
async def get_matches_by_round(round: int, db: Session = Depends(get_db)):
    matches = db.query(Match).filter(Match.round == round).all()
    if not matches:
        raise HTTPException(
            status_code=404,
            detail=f"Nenhuma partida encontrada na rodada {round}",
        )
    return matches


@router.get("/", response_model=List[MatchResponse])
async def get_all_matches(db: Session = Depends(get_db)):
    matches = db.query(Match).all()
    if not matches:
        raise HTTPException(
            status_code=404, detail="Nenhuma partida encontrada no banco de dados"
        )
    return matches
