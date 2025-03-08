from flask import Blueprint, request, jsonify
from app import db
from app.models import Destinations, Players
from sqlalchemy.sql.expression import func
import hashlib
import hmac
import os

main = Blueprint("main", __name__)

SECRET_KEY = os.getenv("SECRET_KEY")


def verify_signature(username, score, signature):
    expected_signature = hmac.new(SECRET_KEY.encode(), f"{username}{score}".encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_signature, signature)


# Get 10 random cities for quiz
@main.route("/destinations", methods=["GET"])
def get_destinations():
    # Fetch 10 random destinations
    random_cities = Destinations.query.order_by(func.random()).limit(10).all()

    # Convert result to JSON format
    result = [{"city": d.city, "country": d.country, "clue": d.clue, "fun_fact": d.fun_fact, "options": d.options} for d in random_cities]

    return jsonify(result)


# Submit or update high score
@main.route("/save-score", methods=["POST"])
def save_score():
    data = request.json
    username = data.get("username")
    score = data.get("score")
    signature = data.get("signature")

    if not username or score is None:
        return jsonify({"error": "Username and score are required"}), 400

    if not verify_signature(username, score, signature):
        return jsonify({"error": "Invalid signature"}), 403

    # Check if the player exists
    player = Players.query.filter_by(username=username).first()

    if player:
        # Update high score if new score is greater
        if score > player.high_score:
            player.high_score = score
            db.session.commit()
            return jsonify({"message": "High score updated", "high_score": player.high_score}), 200
        return jsonify({"message": "Score not high enough", "high_score": player.high_score}), 200
    else:
        # Create new player entry
        new_player = Players(username=username, high_score=score)
        db.session.add(new_player)
        db.session.commit()
        return jsonify({"message": "New player added", "high_score": score}), 201


# Fetch score by username
@main.route("/get-score", methods=["GET"])
def get_score():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Username is required"}), 400

    player = Players.query.filter_by(username=username).first()

    if player:
        return jsonify({"username": player.username, "high_score": player.high_score}), 200
    return jsonify({"error": "Player not found"}), 404


# Leaderboard API (Top 10 Players)
@main.route("/leaderboard", methods=["GET"])
def leaderboard():
    top_players = Players.query.order_by(Players.high_score.desc()).limit(10).all()

    leaderboard_data = [{"username": player.username, "high_score": player.high_score} for player in top_players]

    return jsonify(leaderboard_data), 200
