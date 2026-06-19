import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
print("Python:", os.sys.executable)
print("Groq Key Loaded:", os.getenv("GROQ_API_KEY") is not None)
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL_NAME = "llama-3.3-70b-versatile"


def generate_cover_letter(
    resume_text,
    job_description
):

    prompt = f"""
You are an expert career coach.

Generate a professional cover letter.

Resume:
{resume_text}

Job Description:
{job_description}

Requirements:

- Professional tone
- Around 300 words
- Mention only skills from the resume.
- Do not invent experience.
"""

    completion = client.chat.completions.create(

        model=MODEL_NAME,

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.7,

    )

    return completion.choices[0].message.content