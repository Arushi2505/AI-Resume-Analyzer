import { useState } from "react";

function InterviewPrep() {

  const [questions, setQuestions] = useState([]);

  const generateQuestions = () => {

    const history =
      JSON.parse(
        localStorage.getItem("analyses")
      ) || [];

    if (history.length === 0) {
      alert(
        "Analyze a resume first."
      );
      return;
    }

    const latest = history[0];

    const generated = [];

    latest.matching_skills?.forEach(
    skill => {

        generated.push(
        `Explain a project where you used ${skill}.`
        );

    }
    );

    latest.missing_skills?.forEach(
    skill => {

        generated.push(
        `How would you learn ${skill} in the next 30 days?`
        );

    }
    );

    generated.push(
      "Explain a project where you used Python."
    );

    generated.push(
      "How would you optimize a machine learning pipeline?"
    );

    generated.push(
      "Tell me about a challenging technical problem you solved."
    );

    if (latest.skill_score < 80) {
      generated.push(
        "What steps would you take to improve your skill alignment with a job description?"
      );
    }

    if (latest.semantic_score < 50) {
      generated.push(
        "How would you tailor your resume for a specific role?"
      );
    }

    setQuestions(generated);
  };

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      to-blue-100
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-4
      ">
        Interview Prep
      </h1>

      <p className="
        text-gray-600
        mb-6
      ">
        Generate interview questions
        based on your latest analysis.
      </p>

      <button
        onClick={generateQuestions}
        className="
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
        "
      >
        Generate Questions
      </button>

      <div className="
        mt-8
        space-y-4
      ">

        {questions.map(
          (question, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow
                p-5
              "
            >
              <span className="font-bold">
                Q{index + 1}.
              </span>{" "}
              {question}
            </div>

          )
        )}

      </div>

    </div>
  );
}

export default InterviewPrep;