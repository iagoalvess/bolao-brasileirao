from fastapi import FastAPI
from .routers import users, matches, predictions
from .database.connection import Base, engine
from .models.user import User
from .models.match import Match
from .models.prediction import Prediction

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(matches.router)
app.include_router(predictions.router)


@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao bolão de futebol!"}
