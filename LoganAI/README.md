# LOGAN AI — Virtual Assistant Web Application

A production-ready, full-stack **MERN** virtual assistant application with a premium, ChatGPT-like chat experience, secure authentication, voice interaction, and a polished glassmorphism UI.

![Tech](https://img.shields.io/badge/stack-MERN-3366ff) ![License](https://img.shields.io/badge/license-MIT-9333ea)

---

## ✨ Features

**Landing Page**
- Animated hero section, features, "how it works", testimonials, pricing, FAQ, contact form, and footer

**Authentication**
- Register / Login / Logout with JWT
- Forgot & reset password flow
- Protected routes on the frontend, protected API routes on the backend
- Passwords hashed with bcrypt

**AI Chat**
- ChatGPT-style interface with markdown rendering & syntax-highlighted code blocks
- Copy response, regenerate response, stop generating
- Auto-scroll, typing indicator
- New chat, rename chat, delete chat
- Searchable chat history sidebar

**Voice**
- Speech-to-text dictation (Web Speech API)
- Text-to-speech playback of assistant responses

**User Dashboard**
- Editable profile (name, bio, avatar upload)
- Settings page with Light / Dark / System theme switch
- Change password

**AI Integration**
- Thin service layer (`server/services/aiService.js`) that talks to any OpenAI-compatible `/chat/completions` endpoint — configure via environment variables. Runs in a safe "demo mode" with mock replies if no API key is set, so the app works out of the box.

---

## 🧱 Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React 19, Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, React Icons, React Hot Toast, React Markdown, React Syntax Highlighter |
| Backend    | Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.js, Multer, dotenv, CORS, Morgan |
| Database   | MongoDB (Users, Chats, Messages collections) |
| DevOps     | Docker, Docker Compose |

---

## 📁 Project Structure

```
Logan-AI/
├── client/                     # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios instance + API request modules
│   │   ├── components/
│   │   │   ├── landing/        # Hero, Features, Pricing, FAQ, etc.
│   │   │   ├── chat/           # Sidebar, ChatWindow, MessageBubble, ChatInput
│   │   │   ├── dashboard/      # DashboardLayout
│   │   │   └── common/         # ProtectedRoute, LoadingSpinner
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── hooks/               # useSpeech (speech-to-text / text-to-speech)
│   │   ├── pages/               # Landing, Login, Signup, Chat, Profile, Settings...
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── server/                     # Express backend
│   ├── config/db.js
│   ├── controllers/            # authController, chatController, userController
│   ├── middleware/             # auth, errorHandler, upload
│   ├── models/                 # User, Chat, Message
│   ├── routes/                 # authRoutes, chatRoutes, userRoutes
│   ├── services/aiService.js   # AI provider integration layer
│   ├── utils/generateToken.js
│   ├── uploads/                # Uploaded avatars (gitignored)
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string
- npm

### 1. Clone & configure environment variables

**Backend** — copy `server/.env.example` to `server/.env` and fill in values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/virtual-assistant
JWT_SECRET=change_this_to_a_long_random_secret_key
JWT_EXPIRES_IN=7d
AI_API_KEY=your_openai_api_key_here
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
CLIENT_URL=http://localhost:5173
```

> Leave `AI_API_KEY` blank to run in **demo mode** — the app will still work and return a helpful mock response instead of calling a real AI provider.

**Frontend** — copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install & run the backend

```bash
cd server
npm install
npm run dev
```

The API will start on `http://localhost:5000`.

### 3. Install & run the frontend

```bash
cd client
npm install
npm run dev
```

The app will start on `http://localhost:5173`.

### 4. Open the app

Visit `http://localhost:5173`, create an account, and start chatting!

---

## 🐳 Running with Docker

A `docker-compose.yml` is provided at the project root, spinning up MongoDB, the API server, and the client (served via nginx).

```bash
# From the project root
JWT_SECRET=your_secret AI_API_KEY=your_key docker-compose up --build
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- MongoDB: `mongodb://localhost:27017`

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive a JWT | Public |
| GET  | `/api/auth/profile` | Get current user's profile | Private |
| POST | `/api/auth/forgot-password` | Request a password reset token | Public |
| POST | `/api/auth/reset-password/:token` | Reset password using token | Public |

### Chat
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST   | `/api/chat` | Send a message (creates a new chat if `chatId` omitted) | Private |
| GET    | `/api/chat/history` | Get all chats for the current user | Private |
| GET    | `/api/chat/:id` | Get a single chat with its messages | Private |
| PUT    | `/api/chat/:id` | Rename a chat | Private |
| DELETE | `/api/chat/:id` | Delete a chat and its messages | Private |
| POST   | `/api/chat/:id/regenerate` | Regenerate the last AI response | Private |

### User
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| PUT | `/api/user/profile` | Update name, bio, theme, password, or avatar (multipart) | Private |

All private routes require an `Authorization: Bearer <token>` header.

---

## 🗄️ Database Collections

- **Users** — name, email, hashed password, avatar, bio, theme preference, reset-token fields
- **Chats** — user reference, title, last message timestamp
- **Messages** — chat reference, role (`user`/`assistant`), content, timestamps

---

## 🎨 Design System

- Glassmorphism cards (`.glass`, `.glass-card` utility classes)
- Gradient brand accents (`primary` → `accent` Tailwind color scales)
- Smooth Framer Motion transitions throughout
- Fully responsive: mobile, tablet, and desktop breakpoints
- Dark / Light / System theme support via `ThemeContext` and Tailwind's `class` dark mode strategy

---

## ☁️ Deployment

### Frontend → Vercel
1. Import the `client/` directory as a new Vercel project.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Add environment variable `VITE_API_URL` pointing to your deployed backend, e.g. `https://your-api.onrender.com/api`.

### Backend → Render
1. Create a new Web Service pointing at the `server/` directory.
2. Build command: `npm install`. Start command: `npm start`.
3. Add all variables from `server/.env.example` in Render's Environment tab.
4. Use a MongoDB Atlas connection string for `MONGO_URI` in production.

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt (10 salt rounds) before storage.
- JWTs are signed with `JWT_SECRET` and expire after `JWT_EXPIRES_IN`.
- File uploads are restricted to image types and capped at 5MB via Multer.
- CORS is restricted to `CLIENT_URL` in production.

---

## 🧩 Swapping the AI Provider

`server/services/aiService.js` calls `${AI_BASE_URL}/chat/completions` with an OpenAI-compatible payload. To use a different provider (Azure OpenAI, OpenRouter, a self-hosted vLLM/Ollama server, etc.), simply update `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` in `server/.env` — no code changes required as long as the endpoint follows the OpenAI chat completions schema.

---

## 📝 License

This project is provided as-is for educational and commercial use under the MIT License.
