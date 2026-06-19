from fastapi import APIRouter, UploadFile, File, Form

from app.resume_parser import extract_text
from app.services.llm_service import generate_cover_letter

router = APIRouter()


@router.post("/generate-cover-letter")
async def generate_cover_letter_api(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    resume_text = extract_text(resume)

    letter = generate_cover_letter(
        resume_text,
        job_description
    )

    return {
        "cover_letter": letter
    }