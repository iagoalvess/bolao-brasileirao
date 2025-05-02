from fastapi import APIRouter, Query
from app.services.news_scraper import NewsScraper

router = APIRouter(prefix="/news", tags=["news"])


@router.get("/")
async def get_football_news(limit: int = Query(4, ge=1, le=20)):
    scraper = NewsScraper()
    news = scraper.get_news()
    return news[:limit]
