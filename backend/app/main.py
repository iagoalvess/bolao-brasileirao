from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, matches, predictions, statistics, news, groups
from .database.connection import Base, engine
from .services.scheduler_service import start_scheduler
from .models.user import User
from .models.match import Match
from .models.prediction import Prediction

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(matches.router)
app.include_router(predictions.router)
app.include_router(statistics.router)
app.include_router(news.router)
app.include_router(groups.router)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao bolão de futebol!"}
