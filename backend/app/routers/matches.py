from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date, timedelta

from ..database.connection import get_db
from ..models.match import Match
from ..schemas.match import MatchCreate, MatchResponse
from ..services.match_service import MatchService
from ..services.scoring_service import ScoringService

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/fetch-today", response_model=List[MatchResponse])
async def fetch_today_matches(db: Session = Depends(get_db)):
    try:
        matches_data = await MatchService.fetch_today_matches()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    today = date.today()
    date_str = today.strftime("%Y-%m-%d")

    for match_data in matches_data:
        match = db.query(Match).filter(Match.match_id == match_data["match"]).first()
        if match:

            match.match_date = match_data["match_date"]
            match.status = match_data.get("status", match.status)
            if "scoreboard" in match_data:
                match.scoreboard = match_data["scoreboard"]
        else:

            match = Match(
                match_id=match_data["match"],
                match_date=match_data["match_date"],
                home_team=match_data["team_home"],
                away_team=match_data["team_visitor"],
                status=match_data["status"],
                scoreboard=match_data.get("scoreboard", None),
            )
            db.add(match)
        db.commit()
        db.refresh(match)

    matches = db.query(Match).filter(Match.match_date.startswith(date_str)).all()
    return matches


@router.get("/fetch-yesterday", response_model=List[MatchResponse])
async def fetch_yesterday_results(db: Session = Depends(get_db)):
    try:
        matches_data = await MatchService.fetch_yesterday_results()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    yesterday = date.today() - timedelta(days=1)
    date_str = yesterday.strftime("%Y-%m-%d")

    for match_data in matches_data:
        match = db.query(Match).filter(Match.match_id == match_data["match"]).first()
        if match:

            match.match_date = match_data["match_date"]
            match.status = match_data["status"]
            match.scoreboard = match_data.get("scoreboard", None)
        else:

            match = Match(
                match_id=match_data["match"],
                match_date=match_data["match_date"],
                home_team=match_data["team_home"],
                away_team=match_data["team_visitor"],
                status=match_data["status"],
                scoreboard=match_data.get("scoreboard", None),
            )
            db.add(match)
        db.commit()
        db.refresh(match)

    ScoringService.update_all_predictions(db)

    matches = db.query(Match).filter(Match.match_date.startswith(date_str)).all()
    return matches


@router.get("/today", response_model=List[MatchResponse])
async def get_today_matches(db: Session = Depends(get_db)):
    today = date.today()
    date_str = today.strftime("%Y-%m-%d")
    matches = db.query(Match).filter(Match.match_date.startswith(date_str)).all()
    if not matches:
        raise HTTPException(status_code=404, detail="Sem partidas para hoje")
    return matches


@router.get("/yesterday", response_model=List[MatchResponse])
async def get_yesterday_matches(db: Session = Depends(get_db)):
    yesterday = date.today() - timedelta(days=1)
    date_str = yesterday.strftime("%Y-%m-%d")
    matches = db.query(Match).filter(Match.match_date.startswith(date_str)).all()
    if not matches:
        raise HTTPException(status_code=404, detail="Nenhuma partida encontrada ontem")
    return matches
