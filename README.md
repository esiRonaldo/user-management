# loginTask

Simple full-stack user management app with:

- `frontend/`: Vue 3 + Vite
- `backend/`: FastAPI + SQLAlchemy + SQLite

## Prerequisites

- Python 3
- Node.js 20+
- npm

## Backend Setup

From the project root:

```bash
python3 -m venv backend/venv
source backend/venv/bin/activate
python -m pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

## Frontend Setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://127.0.0.1:5173
```
