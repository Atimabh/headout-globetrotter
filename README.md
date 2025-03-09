# 🌍 Globetrotter – The Ultimate Travel Guessing Game

[🚀 **Live Demo (Sound On!)**](https://atimabh-globetrotter.netlify.app)

Globetrotter is a full-stack web app where users guess destinations based on cryptic clues. After guessing, users unlock fun facts and trivia about the location. The app also features a leaderboard and a "Challenge a Friend" mode.

## 🚀 Features

- 🔹 **Guess the Destination** – Users select the correct city based on provided clues.
- 🎉 **Instant Feedback** – Confetti for correct answers, sad-face animation for incorrect ones.
- 📊 **Leaderboard** – Tracks the highest scores.
- 🔗 **Challenge a Friend** – Generates a shareable invite link with dynamic image preview.
- 🎵 **Background Music & Sound Effects** – Enhances user engagement.

## 🛠️ Tech Stack

### **Frontend** (React + Vite)

- **React** – UI Components
- **Vite** – Fast bundler
- **TypeScript** – Type safety
- **Howler.js** – Sound effects & background music
- **Netlify** – Hosting & Deployment

### **Backend** (Flask + PostgreSQL)

- **Flask** – Web framework
- **PostgreSQL** – Relational database
- **SQLAlchemy** – ORM for database operations
- **DigitalOcean** – Server hosting

## 📦 Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/atimabh/headout-globetrotter.git
cd headout-globetrotter
```

### **2. Backend Setup (Flask + PostgreSQL)**

```bash
cd globetrotter-backend
python -m venv venv
source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
pip install -r requirements.txt
```

#### **Create `.env` file in `backend/`**

```ini
DATABASE_URL=postgresql://username:password@localhost/globetrotter
SECRET_KEY=your-secret-key
```

#### **Run Migrations & Start Server**

```bash
flask db upgrade
flask run
```

### **3. Frontend Setup (React + Vite)**

```bash
cd globetrotter-frontend
npm install
```

#### **Create `.env` file in `frontend/`**

```ini
VITE_SECRET=secret_key
```

#### **Start React Dev Server**

```bash
npm run dev
```

## 🌍 Deployment

### **Frontend (Netlify)**

- Set **publish directory** to `globetrotter-frontend/dist/` in Netlify settings.
- Define **environment variables** (e.g., `VITE_SECRET`).

### **Backend (DigitalOcean + Gunicorn)**

- Deploy Flask backend using `gunicorn` and `pm2`.
- Use **Nginx** as a reverse proxy.

## 📜 API Endpoints

### **User Score Management**

- `POST /save-score` – Save/update user score.
- `GET /get-score?username={username}` – Fetch user’s score.
- `GET /leaderboard` – Retrieve top 10 players.

### **Quiz Management**

- `GET /destinations` – Retrieve 10 random cities for the game.

## 🛡️ Security & Best Practices

- **CORS Handling** – Configured via `Flask-CORS`.
- **Database Connection Pooling** – Prevents excessive connections.
- **Environment Variables** – Secrets are stored securely.
- **Signature Hash for Score Submission** – To prevent tampering, the /save-score API requires a HMAC-SHA256 signature generated using the username, score, and a secret key. This ensures integrity and prevents unauthorized score modifications.
