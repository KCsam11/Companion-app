from flask import Blueprint, request, jsonify
from datetime import datetime
from db.collections import users_collection
import bcrypt
from utils.verifRiotID import verify_riot_id

def register(data):
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    region = data.get('region')
    player_name = data.get('playerName')
    tag = data.get('tag')

    # Vérifier si tous les champs requis sont présents
    if not username or not password or not email or not region or not player_name or not tag:
        return jsonify({"error": "All fields are required", "username": username, "email": email, "region": region, "player_name": player_name, "tag": tag}), 400

    #verifier si le mail existe déjà
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # convertir la région en format Riot
    if region == "europe":
        region = "EUW1"
    elif region == "north-america":
        region = "NA1"
    elif region == "korea":
        region = "KR"

    # vérifier si le Riot ID est valide
    riot_id = f"{player_name}#{tag}"
    riot_account = verify_riot_id(player_name, tag, region)
    if not riot_account:
        return jsonify({"error": "Invalid Riot ID or player not found."}), 404

    # hasher le mot de passe
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    user_data = {
        "username": username,
        "email": email,
        "password": hashed_password,
        "riotData": {
            "puuid": riot_account.get("puuid"),
            "riotId": riot_id,
            "playerName": player_name,
            "tag": tag,
            "region": region
        },
        "timestamps": {
            "createdAt": datetime.utcnow(),
            "lastLogin": datetime.utcnow()
        },
        
        "email_verified": False,
        
    }
    

    try:
        result = users_collection.insert_one(user_data)
        if result.inserted_id:
            return jsonify({"message": "User registered successfully!", "user_id": str(result.inserted_id)}), 201
        else:
            return jsonify({"error": "User registration failed, insertion not acknowledged"}), 500

    except Exception as e:
        print(f"Error during user registration: {e}") 
        return jsonify({"error": "An error occurred during registration.", "details": str(e)}), 500
    
    

    
