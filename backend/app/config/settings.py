from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    DATABASE_HOST = os.getenv("DATABASE_HOST")
    DATABASE_PORT = os.getenv("DATABASE_PORT")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    DATABASE_USER = os.getenv("DATABASE_USER")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    SSL_CA_PATH = os.getenv("SSL_CA_PATH")
    SECRET_KEY = os.getenv("SECRET_KEY")

settings = Settings()
