import os
import requests

RIOT_API_KEY = os.getenv("RIOT_API_KEY")

REGION_TO_ROUTE = {
    "EUW1": "europe",
    "EUN1": "europe",
    "TR1": "europe",
    "RU": "europe",
    "NA1": "americas",
    "BR1": "americas",
    "LA1": "americas",
    "LA2": "americas",
    "OC1": "americas",
    "KR": "asia",
    "JP1": "asia",
}

def verify_riot_id(game_name : str, tag_line : str, platform_region : str):
    if platform_region not in REGION_TO_ROUTE:
        return {"error": "Invalid platform region"}, 400

    regional_route = REGION_TO_ROUTE.get(platform_region.upper())
    if not regional_route:
        print(f"Erreur: Région de plateforme non valide '{platform_region}'.")
        return None
    
    url = f"https://{regional_route}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}"

    headers = {
        "X-Riot-Token": RIOT_API_KEY
    }
    try:
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            return None
        else:
            # Gérer les autres erreurs (clé API invalide, etc.)
            print(f"Erreur API Riot: {response.status_code} - {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Erreur de connexion à l'API Riot: {e}")
        return None
