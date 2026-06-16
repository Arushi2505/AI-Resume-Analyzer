from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.resume_parser import extract_text
from app.skill_extractor import extract_skills
from app.analyzer import analyze
from app.semantic_analyzer import semantic_similarity

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://YOUR-VERCEL-URL.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend Running"}


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text(resume)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    semantic_score = semantic_similarity(
        resume_text,
        job_description
    )

    results = analyze(
        resume_skills,
        jd_skills,
        semantic_score
    )

    return results