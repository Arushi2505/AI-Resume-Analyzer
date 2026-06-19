from fastapi import APIRouter, UploadFile, File, Form

from app.resume_parser import extract_text
from app.skill_extractor import extract_skills
from app.analyzer import analyze
from app.semantic_analyzer import semantic_similarity

router = APIRouter()


@router.post("/analyze")
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