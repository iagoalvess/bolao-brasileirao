import pytest
from unittest.mock import AsyncMock, patch
from datetime import date, datetime

pytestmark = pytest.mark.asyncio


@pytest.fixture
def setup_data(db_session):
    client = db_session

    client.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )

    response = client.post(
        "/users/login",
        data={"username": "testuser", "password": "test123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = response.json()["access_token"]

    today = date.today()
    date_str = today.strftime("%Y-%m-%d")

    with patch(
        "backend.app.services.match_service.MatchService.fetch_today_matches",
        new_callable=AsyncMock,
    ) as mock:
        mock.return_value = [
            {
                "match": "Corinthians x Palmeiras",
                "status": "HOJE 16:00",
                "league": "Campeonato Brasileiro",
                "team_home": "Corinthians",
                "team_visitor": "Palmeiras",
                "match_date": datetime.strptime(f"{date_str} 16:00", "%Y-%m-%d %H:%M"),
                "start_time": "HOJE 16:00",
            }
        ]

        response = client.get("/matches/fetch-today")
        match_id = response.json()[0]["id"]

    return token, match_id


async def test_create_prediction(db_session, setup_data):
    client = db_session
    token, match_id = setup_data
    response = client.post(
        "/predictions/",
        json={"match_id": match_id, "home_team_score": 2, "away_team_score": 1},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    prediction = response.json()
    assert prediction["match_id"] == match_id
    assert prediction["home_team_score"] == 2
    assert prediction["away_team_score"] == 1
    assert prediction["user_id"] == 1


async def test_create_duplicate_prediction(db_session, setup_data):
    client = db_session
    token, match_id = setup_data

    client.post(
        "/predictions/",
        json={"match_id": match_id, "home_team_score": 2, "away_team_score": 1},
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.post(
        "/predictions/",
        json={"match_id": match_id, "home_team_score": 3, "away_team_score": 0},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 400
    assert response.json() == {
        "detail": "Usuario já fez palpite para essa partida"
    }


async def test_get_user_predictions(db_session, setup_data):
    client = db_session
    token, match_id = setup_data

    client.post(
        "/predictions/",
        json={"match_id": match_id, "home_team_score": 2, "away_team_score": 1},
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.get(
        "/predictions/me", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    predictions = response.json()
    assert len(predictions) == 1
    assert predictions[0]["match_id"] == match_id
    assert predictions[0]["home_team_score"] == 2
    assert predictions[0]["away_team_score"] == 1