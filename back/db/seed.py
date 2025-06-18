import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from db.collections import users_collection
from datetime import datetime

def seed_database():
    try:
        user = {
            "summoner_name": "Lacvquey",
            "riot_id": "faker#KR1",
            "date_inscription": datetime.utcnow().isoformat(),
            "dernière_connexion": datetime.utcnow().isoformat()
        }
        users_collection.insert_one(user)
        return {"message": "Test user added successfully."}
    except Exception as e:
        return {"error": str(e)}, 500
    