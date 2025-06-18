from flask import Blueprint
from datetime import datetime
from db.collections import users_collection
from db.seed import seed_database

all_routes = Blueprint("all_routes", __name__)

@all_routes.route("/test-add-user", methods=["GET"])
def test_add_user():
   return seed_database()