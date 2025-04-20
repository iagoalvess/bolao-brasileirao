from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, date
from ..database.connection import get_db
from ..models.match import Match
from ..schemas.match import MatchResponse
from ..services.match_service import MatchService

router = APIRouter(prefix="/matches", tags=["matches"])

@router.get("/fetch-today", response_model=List[MatchResponse])
async def fetch_and_store_today_matches(db: Session = Depends(get_db)):
    try:
        matches_data = await MatchService.fetch_matches()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    matches = []
    for match_data in matches_data:
        match_id = Match.generate_match_id(
            match_date=match_data["match_date"],
            home_team=match_data["team_home"],
            away_team=match_data["team_visitor"]
        )

        existing_match = db.query(Match).filter(Match.match_id == match_id).first()
        if existing_match:
            continue 

        try:
            match_date_time = datetime.strptime(match_data["match_date"], "%Y-%m-%d %H:%M")
        except ValueError as e:
            raise HTTPException(status_code=400, detail=f"Error parsing match date: {str(e)}")

        match = Match(
            match_id=match_id,
            match_date=match_date_time,
            home_team=match_data["team_home"],
            away_team=match_data["team_visitor"],
            status=match_data["status"]
        )
        db.add(match)
        matches.append(match)

    db.commit()

    for match in matches:
        db.refresh(match)

    return matches

@router.get("/today", response_model=List[MatchResponse])
async def get_today_matches(db: Session = Depends(get_db)):
    today = date.today()
    start_date = datetime.combine(today, datetime.min.time())
    end_date = datetime.combine(today, datetime.max.time())
    matches = db.query(Match).filter(Match.match_date.between(start_date, end_date)).all()
    return matches