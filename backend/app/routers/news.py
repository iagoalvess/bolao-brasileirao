from fastapi import APIRouter
from app.services.news_scraper import NewsScraper

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("/")
async def get_football_news():
    scraper = NewsScraper()
    return scraper.get_news()
