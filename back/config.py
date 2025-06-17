
import os

class Config:
    # Clé secrète Flask pour sécuriser les sessions et le CSRF
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    # URI de connexion à MongoDB
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/companion_db")

    # Mode de débogage
    DEBUG = True