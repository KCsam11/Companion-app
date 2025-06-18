from flask import Flask, jsonify
from routes import all_routes
from config import Config
# from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

app = Flask(__name__)
app.register_blueprint(all_routes)
app.config.from_object(Config)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=app.config["DEBUG"])