from flask import Blueprint, request, jsonify
from db.collections import users_collection
from utils.genereCodeMail import generate_code
from utils.sendCodeMail import send_verification_code
from datetime import datetime, timedelta,timezone

def send_code_to_user(data):
    email = data["email"]
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404
    
     # Vérifier si un code valide existe déjà
    expires_at_db = user.get('verification_code_expires_at')
    if expires_at_db and expires_at_db > datetime.now(timezone.utc):
        return jsonify({"message": "Un code a déjà été envoyé. Veuillez attendre avant d'en demander un nouveau."}), 429
    

    code = generate_code()
    user_id = user['_id']
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=5) # Le code expire dans 5 minutes

    users_collection.update_one(
      {"_id": user_id},
      {"$set": {
          "verification_code": code,
          "verification_code_expires_at": expires_at
          }
      }
   )
    try:
        send_verification_code(email, code)
        return jsonify({"message": "Code sent successfully"}), 200
    except Exception as e:
        print(f"Error sending verification code to {email}: {e}")
        return jsonify({"message": "Failed to send verification code"}), 500