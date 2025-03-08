from flask import Blueprint, request, jsonify
from app import db
from app.models import Destinations
from sqlalchemy.sql.expression import func

main = Blueprint("main", __name__)


@main.route("/destinations", methods=["GET"])
def get_destinations():
    # Fetch 10 random destinations
    random_cities = Destinations.query.order_by(func.random()).limit(10).all()

    # Convert result to JSON format
    result = [{"city": d.city, "country": d.country, "clue": d.clue, "fun_fact": d.fun_fact, "options": d.options} for d in random_cities]

    return jsonify(result)
