from flask import Flask, jsonify
from flask_cors import CORS

from routes.all_routes import all_routes
from config import Config
# from pymongo import MongoClient

app = Flask(__name__)
CORS(app, origins=["http://localhost:80"])

app.register_blueprint(all_routes)
app.config.from_object(Config)

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=app.config["DEBUG"])