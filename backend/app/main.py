from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, matches, predictions
from .database.connection import Base, engine
from .scheduler import start_scheduler
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
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(matches.router)
app.include_router(predictions.router)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao bolão de futebol!"}
