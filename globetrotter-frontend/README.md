# 🎨 Globetrotter Frontend

This is the **frontend** of Globetrotter, a travel guessing game built with **React (Vite)**. Users guess destinations based on clues and compete on a leaderboard.

## 🚀 Features

- 🌍 **Destination Quiz** – Guess the city based on cryptic clues.
- 🎉 **Instant Feedback** – Confetti for correct answers, animations for wrong ones.
- 🔗 **Challenge a Friend** – Shareable invite link with a dynamic score image.
- 📊 **Leaderboard** – Tracks user scores.
- 🎵 **Sound Effects & Background Music** – Enhanced experience using `howler.js`.

---

## 📂 Project Structure

```
globetrotter-frontend/
│── public/            # Static assets (images, sounds, etc.)
│── src/
│   ├── assets/        # Icons, images, and audio files
│   ├── components/    # Reusable UI components
|   |     |- _shared/  # Shared components (Buttons, Loaders etc.)
|   |     |- Home/     # Home componenets
|   |     |- Quiz/     # Quiz Components
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Entry point
│── .env               # Environment variables
│── vite.config.ts     # Vite configuration
│── package.json       # Dependencies & scripts
```

---

## 🛠️ Setup & Installation

### **1. Install Dependencies**

```bash
cd globetrotter-frontend
npm install
```

### **2. Set Up Environment Variables**

Create a `.env` file inside the `globetrotter-frontend/` folder:

```ini
VITE_BSECRET=secret_key # used for hash signature
```

### **3. Start Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📡 API Integration

The frontend communicates with the backend via REST API endpoints.
Example:

```ts
getRequest('/destinations')
  .then((res) => res.json())
  .then((data) => console.log(data))
```

---

## 🔥 Deployment (Netlify)

### **1. Build for Production**

```bash
npm run build
```

### **2. Deploy to Netlify**

- Set **publish directory** to `globetrotter-frontend/dist/`.
- Define **environment variables** (`VITE_SECRET`).
