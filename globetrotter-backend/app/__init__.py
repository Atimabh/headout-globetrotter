from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    engine = create_engine(
        app.config["SQLALCHEMY_DATABASE_URI"],
        pool_size=10,  # Max 10 persistent connections
        max_overflow=2,  # Allow 2 temporary connections
        pool_timeout=20,  # Wait time before throwing error
        pool_recycle=1800,  # Recycle every 30 minutes
    )

    db.init_app(app)
    Migrate(app, db)

    # Check DB Connection
    try:
        with engine.connect() as conn:
            print("✅ Database connected successfully!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

    from app.routes import main

    app.register_blueprint(main)

    return app
