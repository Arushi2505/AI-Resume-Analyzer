import { useState } from "react";
import axios from "axios";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function Analyzer() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert(
        "Please upload a resume and enter a job description."
      );
      return;
    }

    const formData = new FormData();

    formData.append(
      "resume",
      resume
    );

    formData.append(
      "job_description",
      jobDescription
    );

    setLoading(true);

    try {
      const response = await axios.post(
        "https://ai-resume-analyzer-rvoq.onrender.com/analyze",
        formData
      );

      setResult(response.data);
      console.log("SAVE CODE RUNNING");

        const previous =
        JSON.parse(
            localStorage.getItem("analyses")
        ) || [];

        const analysis = {
            ats_score: response.data.ats_score,
            semantic_score:
                response.data.semantic_score,
            skill_score:
                response.data.skill_score,

            matching_skills:
                response.data.matching_skills,

            missing_skills:
                response.data.missing_skills,

            date:
                new Date().toLocaleString()
            };

        previous.unshift(analysis);

        localStorage.setItem(
        "analyses",
        JSON.stringify(previous)
        );

    } catch (error) {
      console.error(error);

      alert("Analysis failed.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-8">
      <div className="w-full max-w-7xl rounded-[28px] border border-white/60 bg-white/85 backdrop-blur-xl p-10 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.65)]">

        <h1 className="text-5xl md:text-6xl text-center mb-8 title-font tracking-tight text-slate-950">
          AI Resume Analyzer
        </h1>

        <div className="mb-8">
          <label className="block text-lg font-semibold text-slate-800 mb-4">
            📄 Upload Resume
          </label>

          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold cursor-pointer transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Choose File
              <input
                type="file"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
                className="hidden"
              />
            </label>
            {resume && (
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                ✓ {resume.name}
              </span>
            )}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-semibold text-slate-800 mb-4">
            📝 Job Description
          </label>

          <textarea
            rows="8"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            placeholder="Paste job description here..."
            className="w-full min-h-[200px] rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50 p-5 text-slate-800 shadow-md transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 placeholder-slate-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-3 text-lg font-bold text-white transition duration-300 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading
              ? "⏳ Analyzing..."
              : "✨ Analyze Resume"}
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6">

            {/* ATS Score */}
            <div className="p-8 rounded-3xl card-surface border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-transparent">

              <div className="flex flex-col items-center">


                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ATS Score
                </h2>

                <div className="w-56 h-56">

                    <CircularProgressbar
                    value={result.ats_score}
                    text={`${result.ats_score}%`}
                    styles={buildStyles({
                        textSize: "16px",
                        pathColor: "#22c55e",
                        textColor: "#0f172a",
                        trailColor: "#e2e8f0"
                    })}
                    />

                </div>

                </div>

            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-6 mt-8">

              <div className="p-6 rounded-3xl card-surface text-center border-t-4 border-t-blue-400 bg-gradient-to-br from-blue-50/60 to-transparent hover:shadow-lg transition">

                <h3 className="font-bold text-slate-800 mb-2 text-lg">🧠 Semantic Score</h3>

                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {result.semantic_score}%
                </p>

              </div>

              <div className="p-6 rounded-3xl card-surface text-center border-t-4 border-t-emerald-400 bg-gradient-to-br from-emerald-50/60 to-transparent hover:shadow-lg transition">

                <h3 className="font-bold text-slate-800 mb-2 text-lg">💼 Skill Match Score</h3>

                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {result.skill_score}%
                </p>

              </div>

            </div>

            {/* Matching Skills */}
            <div className="p-6 rounded-3xl card-surface border-l-4 border-l-green-500 bg-gradient-to-br from-green-50/50 to-transparent">

              <h3 className="font-bold mb-4 text-slate-900 text-xl">✅ Matching Skills</h3>

              <div className="flex flex-wrap gap-3">

                {result.matching_skills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                      "
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

            {/* Missing Skills */}
            <div className="p-6 rounded-3xl card-surface border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50/50 to-transparent">

              <h3 className="font-bold mb-4 text-slate-900 text-xl">⚠️ Skills to Develop</h3>

              <div className="flex flex-wrap gap-3">

                {result.missing_skills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full font-medium text-sm shadow-sm border border-orange-300 hover:shadow-md transition"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

            {/* Suggestions */}
            <div className="p-6 rounded-3xl card-surface border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-transparent">

              <h3 className="font-bold mb-4 text-slate-900 text-xl">💡 Recommendations</h3>

              <ul className="space-y-3">

                {result.suggestions.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-l-4 border-l-amber-400 hover:shadow-md transition"
                    >
                      <span className="text-lg mr-3">💡</span>{item}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Analyzer;