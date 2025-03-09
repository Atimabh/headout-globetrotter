# 🛠️ Globetrotter Backend

This is the **backend** of Globetrotter, a travel guessing game built with **Flask & PostgreSQL**. It provides API endpoints for managing destinations, scores, and leaderboards.

## 🚀 Features

- 🌍 **Random Destinations API** – Fetches 10 random quiz destinations.
- 📊 **Leaderboard API** – Tracks user scores.
- 🔐 **Secure Score Submission** – Uses HMAC signature verification.
- ⚡ **Optimized Database Queries** – PostgreSQL with SQLAlchemy ORM.
- 🌐 **CORS Handling** – Enables secure frontend-backend communication.

---

## 📂 Project Structure

```
globetrotter-backend/
│── app/
│   ├── models.py       # Database models
│   ├── routes.py       # API endpoints
│   ├── config.py       # Configuration settings
│   ├── __init__.py     # Flask app initialization
│── migrations/         # Database migrations
│── .env                # Environment variables
│── requirements.txt    # Dependencies
│── wsgi.py             # Entry point for Gunicorn
```

---

## 🛠️ Setup & Installation

### **1. Install Dependencies**

```bash
cd globetrotter-backend
python -m venv venv
source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
pip install -r requirements.txt
```

### **2. Set Up Environment Variables**

Create a `.env` file inside `backend/`:

```ini
DATABASE_URL=postgresql://username:password@localhost/globetrotter
SECRET_KEY=your-secret-key
```

### **3. Run Migrations & Start Server**

```bash
flask db upgrade
python wsgi.py
```

The backend will run at `http://localhost:5000`.

---

## 📡 API Endpoints

### **User Score Management**

- `POST /save-score` → Saves or updates user score.
- `GET /get-score?username={username}` → Retrieves user’s score.
- `GET /leaderboard` → Fetches top players.

### **Quiz Management**

- `GET /destinations` → Returns 10 random quiz destinations.

---

## 🔥 Deployment (DigitalOcean + Gunicorn)

### **1. Start Gunicorn Server**

```bash
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

### **2. Configure Nginx as a Reverse Proxy**

```nginx
server {
    listen 80;
    server_name globetrotter.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🔐 Security & Best Practices

- **HMAC Signature Verification** – Used in `/save-score` API to prevent tampering.
- **Database Connection Pooling** – Uses SQLAlchemy pooling.
- **CORS Handling** – Configured via `Flask-CORS`.
