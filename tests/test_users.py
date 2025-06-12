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
pytestmark = pytest.mark.asyncio


async def test_create_user(db_session):
    response = db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )
    assert response.status_code == 200

    expected_data = {
    "username": "testuser",
    "email": "test@example.com",
    }
   
    assert expected_data.items() <= response.json().items()

async def test_create_user_duplicate_email(db_session):

    db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )

    response = db_session.post(
        "/users/",
        json={
            "username": "testuser2",
            "email": "test@example.com",
            "password": "test123",
        },
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Email já registrado"}


async def test_create_user_duplicate_username(db_session):

    db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )

    response = db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test2@example.com",
            "password": "test123",
        },
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Usuário já registrado"}


async def test_get_users(db_session):
    
    db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )
    response = db_session.get("/users/")
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert any(u["username"] == "testuser" for u in users)


async def test_login_success(db_session):
    db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )

    response = db_session.post(
        "/users/login",
        data={"username": "testuser", "password": "test123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


async def test_login_invalid_credentials(db_session):

    db_session.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        },
    )

    response = db_session.post(
        "/users/login",
        data={"username": "testuser", "password": "wrongpassword"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Usuário ou senha inválidos"}