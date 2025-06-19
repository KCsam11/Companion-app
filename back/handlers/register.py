from flask import Blueprint, request, jsonify
from datetime import datetime
from db.collections import users_collection

def register(data):
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    region = data.get('region')
    player_name = data.get('playerName')
    tag = data.get('tag')

    if not username or not password or not email or not region or not player_name or not tag:
        return jsonify({"error": "All fields are required", "username": username, "email": email, "region": region, "player_name": player_name, "tag": tag}), 400

    #verifier si le mail existe déjà
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # Format the Riot ID
    riot_id = f"{player_name}#{tag}"

    #recherche du joueur sur l'API Riot Games (à implémenter)
    # Si le joueur existe, on peut continuer l'enregistrement
    # Sinon, retourner une erreur


    date_created = datetime.now().isoformat()
    last_login = date_created
    is_verified = False


    user_data = {
        "username": username,
        "region": region,
        "riot_id": riot_id,
        "email": email,
        "password": password,  # In a real application, ensure to hash the password
        "date_created": date_created,
        "last_login": last_login,
        "is_verified": is_verified
    }

    # Logique d'enregistrement d'utilisateur

    try:
        result = users_collection.insert_one(user_data)

        if result.inserted_id:
            return jsonify({"message": "User registered successfully!", "user_id": str(result.inserted_id)}), 201
        else:
            return jsonify({"error": "User registration failed, insertion not acknowledged"}), 500

    except Exception as e:
        print(f"Error during user registration: {e}") 
        return jsonify({"error": "An error occurred during registration.", "details": str(e)}), 500
    
