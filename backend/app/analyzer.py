def analyze(resume_skills, jd_skills):

    matching = list(
        set(resume_skills)
        & set(jd_skills)
    )

    missing = list(
        set(jd_skills)
        - set(resume_skills)
    )

    if len(jd_skills) == 0:
        score = 0
    else:
        score = round(
            len(matching) / len(jd_skills) * 100
        )

    suggestions = [
        f"Consider adding {skill}"
        for skill in missing
    ]

    return {
        "ats_score": score,
        "matching_skills": matching,
        "missing_skills": missing,
        "suggestions": suggestions,
    }