from flask import Flask, jsonify
from routes import all_routes
from config import Config
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(all_routes)

# Connexion à MongoDB
client = MongoClient(app.config["MONGO_URI"])
db = client.get_default_database()
users_collection = db["users"]

@app.route("/test-add-user", methods=["GET"])
def test_add_user():
    user = {
        "id": "1",
        "summoner_name": "Faker",
        "riot_id": "faker#KR1",
        "date_inscription": datetime.utcnow().isoformat(),
        "dernière_connexion": datetime.utcnow().isoformat()
    }
    result = users_collection.insert_one(user)
    return jsonify({"inserted_id": str(result.inserted_id)})


if __name__ == "__main__":
        app.run(host="0.0.0.0", debug=app.config["DEBUG"])
