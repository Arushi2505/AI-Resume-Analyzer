SKILLS = [
    "python",
    "java",
    "sql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "fastapi",
    "react",
    "javascript",
    "html",
    "css",
    "git",
    "pandas",
    "numpy",
    "scikit-learn",
]


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    return list(set(found_skills))