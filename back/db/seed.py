import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from db import users_collection
from datetime import datetime

user = {
    "id": "1",
    "summoner_name": "Faker",
    "riot_id": "faker#KR1",
    "date_inscription": datetime.utcnow().isoformat(),
    "dernière_connexion": datetime.utcnow().isoformat()
}

users_collection.insert_one(user)
print("Utilisateur de test inséré !")
