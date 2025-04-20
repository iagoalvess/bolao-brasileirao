import pytest
from unittest.mock import AsyncMock, patch
from datetime import date, timedelta, datetime

pytestmark = pytest.mark.asyncio


@pytest.fixture
def mock_fetch_today_matches():
    with patch(
        "backend.app.services.match_service.MatchService.fetch_today_matches",
        new_callable=AsyncMock,
    ) as mock:
        today = date.today()
        match_time = datetime.strptime("16:00", "%H:%M").time()
        match_datetime = datetime.combine(today, match_time)
        mock.return_value = [
            {
                "match": "Corinthians x Palmeiras",
                "status": "HOJE 16:00",
                "league": "Campeonato Brasileiro",
                "team_home": "Corinthians",
                "team_visitor": "Palmeiras",
                "match_date": match_datetime,  # ✅ Corrigido para datetime
                "start_time": "HOJE 16:00",
            }
        ]
        yield mock


@pytest.fixture
def mock_fetch_yesterday_results():
    with patch(
        "backend.app.services.match_service.MatchService.fetch_yesterday_results",
        new_callable=AsyncMock,
    ) as mock:
        yesterday = date.today() - timedelta(days=1)
        match_datetime = datetime.combine(yesterday, datetime.min.time())
        mock.return_value = [
            {
                "match": "Flamengo x Santos",
                "status": "FINISHED",
                "league": "Campeonato Brasileiro",
                "team_home": "Flamengo",
                "team_visitor": "Santos",
                "match_date": match_datetime,  # ✅ Corrigido para datetime
                "scoreboard": {"home": 2, "visitor": 1},
                "summary": "2 x 1",
            }
        ]
        yield mock


async def test_fetch_and_store_today_matches(db_session, mock_fetch_today_matches):
    response = db_session.get("/matches/fetch-today")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 1
    assert matches[0]["home_team"] == "Corinthians"
    assert matches[0]["away_team"] == "Palmeiras"


async def test_fetch_and_store_yesterday_results(
    db_session, mock_fetch_yesterday_results
):
    response = db_session.get("/matches/fetch-yesterday")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 1
    assert matches[0]["home_team"] == "Flamengo"
    assert matches[0]["away_team"] == "Santos"
    assert matches[0]["status"] == "FINISHED"


async def test_get_today_matches(db_session, mock_fetch_today_matches):
    db_session.get("/matches/fetch-today")
    response = db_session.get("/matches/today")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 1
    assert matches[0]["home_team"] == "Corinthians"
    assert matches[0]["away_team"] == "Palmeiras"


async def test_get_yesterday_matches(db_session, mock_fetch_yesterday_results):
    db_session.get("/matches/fetch-yesterday")
    response = db_session.get("/matches/yesterday")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 1
    assert matches[0]["home_team"] == "Flamengo"
    assert matches[0]["away_team"] == "Santos"
