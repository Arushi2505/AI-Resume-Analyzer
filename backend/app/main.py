from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyzer import router as analyzer_router
from app.routes.cover_letter import router as cover_letter_router

app = FastAPI()
app.include_router(analyzer_router)
app.include_router(cover_letter_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-resume-analyzer-six-ashen.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend Running"}


