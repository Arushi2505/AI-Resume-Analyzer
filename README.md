# AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes against job descriptions using hybrid ATS scoring techniques. The application provides ATS scores, semantic similarity analysis, skill-gap identification, and personalized recommendations to help job seekers optimize their resumes.

## Live Demo

Frontend: https://ai-resume-analyzer-six-ashen.vercel.app

Backend API Docs: https://ai-resume-analyzer-rvoq.onrender.com/docs

## Features

- Upload resumes in PDF/DOCX format
- Paste job descriptions for analysis
- ATS score calculation
- Skill extraction and matching
- Missing skills identification
- Semantic similarity analysis using TF-IDF
- Personalized resume improvement suggestions
- Interactive dashboard with score visualization
- Fully deployed frontend and backend

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Uvicorn
- Python

### NLP / AI
- pdfplumber
- python-docx
- scikit-learn (TF-IDF Vectorizer)

### Deployment
- Vercel
- Render

### Version Control
- Git
- GitHub

## How It Works

1. User uploads a resume.
2. User enters a job description.
3. Resume text is extracted from PDF/DOCX files.
4. Relevant skills are identified from both resume and job description.
5. Semantic similarity between the documents is computed using TF-IDF.
6. ATS score is calculated using skill matching and semantic scoring.
7. Results are displayed with recommendations.

## Local Setup

### Clone the repository

```bash
git clone https://github.com/Arushi2505/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

## API Endpoint

### Analyze Resume

**POST** `/analyze`

Form Data:

| Field | Type |
|--------|-------|
| resume | File |
| job_description | String |

---

## Future Improvements

- Sentence-transformers for advanced semantic matching
- User authentication
- Resume history tracking
- Resume ranking against multiple job descriptions
- Cover letter generation
- LLM-powered resume optimization


## Author

**Arushi**

GitHub: https://github.com/Arushi2505

LinkedIn: https://www.linkedin.com/in/arushibiswas25/

---
