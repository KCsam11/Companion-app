from flask import Blueprint
from datetime import datetime

all_routes = Blueprint("all_routes", __name__)

# @app.route("/test-add-user", methods=["GET"])
# def test_add_user():
#     user = {
#         "summoner_name": "Faker",
#         "riot_id": "faker#KR1",
#         "date_inscription": datetime.utcnow().isoformat(),
#         "dernière_connexion": datetime.utcnow().isoformat()
#     }
#     result = users_collection.insert_one(user)
#     return jsonify({"inserted_id": str(result.inserted_id)})