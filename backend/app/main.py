from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
    return {
        "filename": resume.filename,
        "job_description_length": len(job_description),
        "ats_score": 78,
        "matching_skills": ["Python", "Machine Learning", "SQL"],
        "missing_skills": ["Docker", "Kubernetes"],
        "suggestions": [
            "Add Docker experience.",
            "Quantify project achievements.",
            "Include more cloud-related skills."
        ]
    }