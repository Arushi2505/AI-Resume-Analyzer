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

    if skill_score == 100:
        ats_score = 100

    elif skill_score >= 80:
        ats_score = round(
            0.8 * skill_score +
            0.2 * semantic_score,
            2
    )

    else:
        ats_score = round(
            0.6 * skill_score +
            0.4 * semantic_score,
            2
        )

    suggestions = []

    for skill in missing:
        suggestions.append(
            f"Consider adding {skill}"
        )

    if semantic_score < 50:
        suggestions.append(
            "Try aligning your project descriptions with the language used in the job description."
        )

    if skill_score == 100:
        suggestions.append(
            "Excellent skill match! Focus on improving the impact statements in your resume."
        )

    return {
        "ats_score": ats_score,
        "semantic_score": semantic_score,
        "skill_score": round(skill_score, 2),
        "matching_skills": matching,
        "missing_skills": missing,
        "suggestions": suggestions,
    }