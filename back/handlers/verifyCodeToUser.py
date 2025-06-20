from flask import Blueprint, request, jsonify
from datetime import datetime, timezone
from db.collections import users_collection

def verify_code_to_user(data):
        code = data.get('code')
        email = data.get('email')

        if not code:
            return jsonify({'error': 'Le code est requis'}), 400

        if not email:
            return jsonify({'error': 'L\'email est requis'}), 400

        # Vérifier l'utilisateur dans la base de données
        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        verification_code = user.get('verification_code')
        expires_at = user.get('verification_code_expires_at')

        if verification_code != code:
            return jsonify({'error': 'Code de vérification invalide'}), 400

        if expires_at:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if not expires_at or datetime.now(timezone.utc) > expires_at:
            users_collection.update_one(
                {"_id": user["_id"]},
                {"$unset": {"verification_code": "", "verification_code_expires_at": ""}}
            )
            return jsonify({'error': 'Le code de vérification a expiré'}), 400

        users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$set": {"email_verified": True},
                "$unset": {"verification_code": "", "verification_code_expires_at": ""}
            }
        )

        # Si tout est valide, retourner un succès
        return jsonify({'message': 'Code de vérification réussi'}), 200