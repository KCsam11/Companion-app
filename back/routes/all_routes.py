from flask import Blueprint,request, jsonify
from datetime import datetime
from db.collections import users_collection
from db.seed import seed_database
from handlers.register import register

all_routes = Blueprint("all_routes", __name__)

@all_routes.route("/test-add-user", methods=["GET"])
def test_add_user():
   return seed_database()

# Route for user registration
@all_routes.route("/api/register", methods=["POST"])
def register_user():
   data = request.get_json()
   if not data:
       return jsonify({"error": "No data provided"}), 400
   return register(data)

# Route for user login
@all_routes.route("/api/login", methods=["POST"])

#route email de confirmation
@all_routes.route("/api/confirm-email", methods=["POST"])
def confirm_email():
    data = request.get_json()
    verification_code = data.get("verificationCode")