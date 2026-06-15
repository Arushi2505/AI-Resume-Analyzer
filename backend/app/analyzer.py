def analyze(
    resume_skills,
    jd_skills,
    semantic_score
):

    matching = list(
        set(resume_skills)
        & set(jd_skills)
    )

    missing = list(
        set(jd_skills)
        - set(resume_skills)
    )

    if len(jd_skills) == 0:
        skill_score = 0
    else:
        skill_score = (
            len(matching)
            / len(jd_skills)
        ) * 100

    ats_score = round(
        (
            0.6 * skill_score
            + 0.4 * semantic_score
        ),
        2
    )

    suggestions = [
        f"Consider adding {skill}"
        for skill in missing
    ]

    return {
        "ats_score": ats_score,
        "semantic_score": semantic_score,
        "skill_score": round(skill_score, 2),
        "matching_skills": matching,
        "missing_skills": missing,
        "suggestions": suggestions,
    }