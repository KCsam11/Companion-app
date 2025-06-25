from flask import Blueprint,request, jsonify
from db.seed import seed_database
from handlers.register import register
from handlers.sendCodeToUser import send_code_to_user
from handlers.verifyCodeToUser  import verify_code_to_user

all_routes = Blueprint("all_routes", __name__)

# Route for user registration
@all_routes.route("/api/register", methods=["POST"])
def register_user():
   data = request.get_json()
   if not data:
       return jsonify({"error": "No data provided"}), 400
   return register(data)

# Route to send verification code
@all_routes.route("/api/send-code", methods=["POST"])
def send_code():
   data = request.get_json()
   if not data or not data.get('email'):
        return jsonify({"message": "Email is required"}), 400
   return send_code_to_user(data)

# Route to verify the code
@all_routes.route("/api/verif-code", methods=["POST"])
def verify_code():
   data = request.get_json()
   if not data or not data.get('email') or not data.get('code'):
         return jsonify({"message": "Email and code are required"}), 400
   return verify_code_to_user(data)