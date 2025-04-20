import pytest
from unittest.mock import AsyncMock, patch
from datetime import date

pytestmark = pytest.mark.asyncio


@pytest.fixture
def mock_fetch_matches():
    today = date.today()
    date_str = today.strftime("%Y-%m-%d")

    with patch(
        "backend.app.services.match_service.MatchService.fetch_matches",
        new_callable=AsyncMock,
    ) as mock:
        mock.return_value = [
            {
                "match": "Corinthians x Palmeiras",
                "status": "HOJE 16:00",
                "league": "Campeonato Brasileiro",
                "team_home": "Corinthians",
                "team_visitor": "Palmeiras",
                "match_date": f"{date_str} 16:00",
                "start_time": "HOJE 16:00",
            },
            {
                "match": "Flamengo x Santos",
                "status": "ENCERRADO",
                "league": "Campeonato Brasileiro",
                "team_home": "Flamengo",
                "team_visitor": "Santos",
                "match_date": f"{date_str} 00:00",
                "scoreboard": {"home": 2, "visitor": 1},
                "summary": "2 x 1",
            },
        ]
        yield mock


async def test_fetch_and_store_today_matches(db_session, mock_fetch_matches):
    response = db_session.get("/matches/fetch-today")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 2
    assert matches[0]["home_team"] == "Corinthians"
    assert matches[0]["away_team"] == "Palmeiras"


async def test_get_today_matches(db_session, mock_fetch_matches):
    db_session.get("/matches/fetch-today")
    response = db_session.get("/matches/today")
    assert response.status_code == 200
    matches = response.json()
    assert len(matches) == 2
    assert matches[1]["home_team"] == "Flamengo"
    assert matches[1]["away_team"] == "Santos"
