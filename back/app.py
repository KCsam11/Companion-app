from flask import Flask, jsonify
from routes import all_routes
from config import Config
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from datetime import datetime
from db.collections import users_collection

app = Flask(__name__)
app.register_blueprint(all_routes)
app.config.from_object(Config)


@app.route("/test-add-user", methods=["GET"])
def test_add_user():
    try:
        user = {
            "summoner_name": "test",
            "riot_id": "faker#KR1",
            "date_inscription": datetime.utcnow().isoformat(),
            "dernière_connexion": datetime.utcnow().isoformat()
        }
        result = users_collection.insert_one(user)
        return jsonify({"summoner_name": user["summoner_name"]})
    except ConnectionFailure as e:
        # Erreur spécifique si la connexion à la BDD échoue
        error_message = {
            "error": "Could not connect to MongoDB.",
            "details": str(e)
        }
        return jsonify(error_message), 500
    except Exception as e:
        # Intercepte toutes les autres erreurs possibles
        error_message = {
            "error": "An unexpected error occurred.",
            "details": str(e)
        }
        return jsonify(error_message), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=app.config["DEBUG"])