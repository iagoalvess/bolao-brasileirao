from datetime import timedelta
from bs4 import BeautifulSoup
from fastapi import HTTPException, status
import pytest
from backend.app.services.auth.password import get_password_hash, verify_password
from backend.app.services.auth.token import create_access_token, decode_token
from backend.app.services.news_service import NewsScraper
from backend.app.services.statistics.global_stats import get_global_statistics
from backend.app.services.statistics.per_round import get_points_per_round
from unittest.mock import MagicMock

from backend.app.services.statistics.personal import get_personal_statistics
from backend.app.services.statistics.utils import calculate_points

def create_mock_match(status="FINISHED", round=1, home_score=0, away_score=0, home_team="", away_team=""):
    mock_match = MagicMock()
    mock_match.status = status
    mock_match.round = round
    mock_match.home_team = home_team
    mock_match.away_team = away_team
    mock_match.home_score = home_score
    mock_match.away_score = away_score
    return mock_match

def create_mock_prediction(home_team_score, away_team_score, match):
    mock_prediction = MagicMock()
    mock_prediction.home_team_score = home_team_score
    mock_prediction.away_team_score = away_team_score
    mock_prediction.match = match
    return mock_prediction

@pytest.fixture
def mock_predictions_set_maximum():
    match1 = create_mock_match(round=5, home_score=2, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=4, away_score=1)
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=1, away_score=0)
    prediction3 = create_mock_prediction(1, 0, match3)

    return [prediction1, prediction2, prediction3]

@pytest.fixture
def mock_predictions_set_min():
    match1 = create_mock_match(round=5, home_score=0, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=0, away_score=1)
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=0, away_score=0)
    prediction3 = create_mock_prediction(1, 2, match3)

    return [prediction1, prediction2, prediction3]

@pytest.fixture
def mock_predictions_set_average():
    match1 = create_mock_match(round=5, home_score=3, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=5, away_score=1)
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=3, away_score=0)
    prediction3 = create_mock_prediction(6, 2, match3)

    return [prediction1, prediction2, prediction3]
    
def test_maximum_on_all_predictions(mock_predictions_set_maximum):
  
    predictions = mock_predictions_set_maximum
    assert get_points_per_round(predictions) == {"5": 10, "6": 5}


def test_min_on_all_predictions(mock_predictions_set_min):
    
    predictions = mock_predictions_set_min
    assert get_points_per_round(predictions) == {"5": 0, "6": 0}
    
def test_average_on_all_predictions(mock_predictions_set_average):

    predictions = mock_predictions_set_average
    assert get_points_per_round(predictions) == {"5": 6, "6": 3}
    
def test_correct_maximum_calculate_points():
    match1 = create_mock_match(round=5, home_score=2, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)
    assert calculate_points(match=match1, pred=prediction1) == 5

def test_correct_min_calculate_points():
    match1 = create_mock_match(round=5, home_score=0, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)
    assert calculate_points(match=match1, pred=prediction1) == 0
    
def test_correct_average_calculate_points():
    match1 = create_mock_match(round=5, home_score=3, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)
    assert calculate_points(match=match1, pred=prediction1) == 3

def test_calculate_points_correct():
    match1 = create_mock_match(round=5, home_score=3, away_score=1)
    prediction1 = create_mock_prediction(2, 1, match1)
    assert calculate_points(match=match1, pred=prediction1) == 3
    
    
def test_best_possible_statistics(mock_predictions_set_maximum):
    predictions = mock_predictions_set_maximum
    
    assert get_personal_statistics(predictions) == {
        "exact_hits": 3,
        "winner_hits":0,
        "errors": 0,
        "avg_points_per_round": 7.5,
    }
    
def test_good_possible_statistics(mock_predictions_set_average):
    predictions = mock_predictions_set_average
   
    assert get_personal_statistics(predictions) == {
        "exact_hits": 0,
        "winner_hits":3,
        "errors": 0,
        "avg_points_per_round": 4.5,
    }

def test_worst_possible_statistics(mock_predictions_set_min):
    predictions = mock_predictions_set_min
   
    assert get_personal_statistics(predictions) == {
        "exact_hits": 0,
        "winner_hits":0,
        "errors": 3,
        "avg_points_per_round": 0,
    }
    
def test_password_hash_and_diferent_verify():
    password = "senha_segura123"
    
    hashed = get_password_hash(password)

    assert verify_password(password, hashed)

    assert not verify_password("senha_errada", hashed)
    
def test_password_hash_and_equal_verify():
    password = "senha_segura123"
    
    hashed = get_password_hash(password)

    assert verify_password(password, hashed)

    assert verify_password("senha_segura123", hashed)

def test_get_statistics_team_most_common():
    match1 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Cruzeiro", away_team="Atletico")
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Atletico", away_team="Cruzeiro")
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=1, away_score=0, home_team="São Paulo", away_team="Flamengo")
    prediction3 = create_mock_prediction(4, 1, match3)
   
    get_global_statistics([prediction1, prediction2, prediction3]).items() <= {
        "most_predicted_team": (
        "Cruzeiro"
        )
    }.items()
    
def test_get_statistics_score_most_common():
    match1 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Cruzeiro", away_team="Atletico")
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Atletico", away_team="Cruzeiro")
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=1, away_score=0, home_team="São Paulo", away_team="Flamengo")
    prediction3 = create_mock_prediction(4, 1, match3)
   
    get_global_statistics([prediction1, prediction2, prediction3]).items() <= {
        "most_predicted_score": (
        "4x1"
        )
    }.items()
    
def test_get_statistics_correct_average():
    match1 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Cruzeiro", away_team="Atletico")
    prediction1 = create_mock_prediction(2, 1, match1)

    match2 = create_mock_match(round=5, home_score=2, away_score=1, home_team="Atletico", away_team="Cruzeiro")
    prediction2 = create_mock_prediction(4, 1, match2)

    match3 = create_mock_match(round=6, home_score=1, away_score=0, home_team="São Paulo", away_team="Flamengo")
    prediction3 = create_mock_prediction(4, 1, match3)

    get_global_statistics([prediction1, prediction2, prediction3]).items() <= {
        "avg_points_per_round": (
        5.5
        )
    }.items()

def test_decode_token_valid_token():
    payload = {"sub": "user@example.com"}
    token = create_access_token(payload)
    decoded = decode_token(token)
    assert decoded["sub"] == payload["sub"]
    
def test_decode_token_invalid_token():
    invalid_token = "invalid.token"
    with pytest.raises(HTTPException) as exc:
        decode_token(invalid_token)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED
    assert "Token inválido ou expirado" in exc.value.detail
    
def test_decode_token_expired_token():
    payload = {"sub": "user@example.com"}
    expired_token = create_access_token(payload, expires_delta=timedelta(seconds=-1))
    with pytest.raises(HTTPException) as exc:
        decode_token(expired_token)
    assert exc.value.status_code == status.HTTP_401_UNAUTHORIZED
    assert "Token inválido ou expirado" in exc.value.detail

def test_get_news_with_none_input():
    scraper = NewsScraper()
    result = scraper.get_news(None)
    assert result == []

def test_get_news_with_valid_html():
    html = """
    <div class="thumbnails-item">
        <h3 class="thumb-title">Título 1</h3>
        <a href="https://exemplo.com/noticia1"></a>
        <time class="thumb-date">10/06/2025</time>
        <p class="author">Autor 1</p>
    </div>
    """
    soup = BeautifulSoup(html, "html.parser")
    scraper = NewsScraper()
    resultado = scraper.get_news(soup)

    assert len(resultado) == 1
    assert resultado[0]["title"] == "Título 1"
    assert resultado[0]["link"] == "https://exemplo.com/noticia1"
    assert resultado[0]["date"] == "10/06/2025"
    assert resultado[0]["author"] == "Autor 1"

def test_get_news_with_ads_and_news():
    html = """
    <div class="thumbnails-item itemAds">
        <h3 class="thumb-title">Publicidade</h3>
    </div>
    <div class="thumbnails-item">
        <h3 class="thumb-title">Notícia Válida</h3>
        <a href="https://exemplo.com/noticia"></a>
        <time class="thumb-date">09/06/2025</time>
        <p class="author">Autor X</p>
    </div>
    """
    soup = BeautifulSoup(html, "html.parser")
    scraper = NewsScraper()
    resultado = scraper.get_news(soup)

    assert len(resultado) == 1
    assert resultado[0]["title"] == "Notícia Válida"

def test_get_news_with_missing_fields():
    html = """
    <div class="thumbnails-item">
        <h3 class="thumb-title">Sem Link</h3>
        <time class="thumb-date">08/06/2025</time>
    </div>
    """
    soup = BeautifulSoup(html, "html.parser")
    scraper = NewsScraper()
    resultado = scraper.get_news(soup)

    assert len(resultado) == 1
    assert resultado[0]["title"] == "Sem Link"
    assert resultado[0]["link"] is None
    assert resultado[0]["date"] == "08/06/2025"
    assert resultado[0]["author"] is None