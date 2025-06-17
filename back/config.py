
import os

class Config:
    # Clé secrète Flask pour sécuriser les sessions et le CSRF
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key-for-local-dev")

    # URI de connexion à MongoDB
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/companion_db")

    # Mode de débogage
    DEBUG = True