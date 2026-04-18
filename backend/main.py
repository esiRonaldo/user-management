from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import model
from .database import engine
from .routers import user

model.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], // NEEDED???
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
