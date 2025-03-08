from app import db


class Destinations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), unique=True, nullable=False)
    country = db.Column(db.String(100), unique=False, nullable=False)
    clue = db.Column(db.JSON, nullable=False)
    fun_fact = db.Column(db.JSON, nullable=False)
    options = db.Column(db.JSON, nullable=False)
