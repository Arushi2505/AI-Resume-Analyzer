import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import {
  UploadCloud,
  FileText as FileIcon,
  Loader2,
  Check,
  AlertTriangle,
  Lightbulb,
  Star,
  Sparkles
} from "lucide-react";

import "react-circular-progressbar/dist/styles.css";

function Analyzer() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

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

  const onDropFile = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) setResume(file);
  };

  const onPickFile = () => {
    inputRef.current?.click();
  };

  const getCareerSuggestions = () => {

  const skills =
    result?.matching_skills || [];

  const careers = [];

  if (skills.includes("python")) {
    careers.push("Machine Learning Engineer");
    careers.push("AI Engineer");
  }

  if (skills.includes("sql")) {
    careers.push("Data Scientist");
  }

  if (skills.includes("fastapi")) {
    careers.push("Backend AI Engineer");
  }

  if (skills.includes("react")) {
    careers.push("Full Stack AI Developer");
  }

  if (
    skills.includes("python") &&
    skills.includes("sql")
  ) {
    careers.push("Analytics Engineer");
  }

  return [...new Set(careers)];
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8">
      <div className="w-full max-w-7xl mx-auto rounded-2xl border border-white/60 bg-white/90 backdrop-blur p-6 sm:p-10 shadow-[0_20px_40px_-20px_rgba(2,6,23,0.6)] relative">

        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center mb-6 sm:mb-8 font-extrabold tracking-tight text-slate-900">
          AI Resume Analyzer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Upload + JD */}
            <div>
              <label className="block text-base font-semibold text-slate-800 mb-3">
                Upload Resume
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDropFile}
                className="relative">

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="border-2 border-dashed border-slate-200 bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 flex items-center gap-4 cursor-pointer"
                  onClick={onPickFile}
                >
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <UploadCloud className="w-7 h-7" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Drag & drop a resume, or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">PDF, DOCX, or TXT — max 5MB</p>
                  </div>

                  <div className="hidden sm:block">
                    {resume ? (
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">{resume.name}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 text-slate-700">
                        <FileIcon className="w-4 h-4" />
                        <span className="text-sm">Choose file</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-slate-800 mb-3">
                Job Description
              </label>

              <textarea
                rows="8"
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste the job description here..."
                className="w-full min-h-[180px] rounded-xl border-2 border-slate-200 bg-white p-4 text-slate-800 shadow-sm focus:ring-4 focus:ring-blue-200/40 focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6 py-3 text-base font-bold text-white transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Resume</span>
                  </>
                )}
              </button>

              <div className="text-sm text-slate-500">
                <div>Tip: upload a tailored resume for best results.</div>
              </div>
            </div>
          </div>

          {/* Right column: Highlights and quick stats */}
          <aside className="space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-slate-100 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-700">Quick Summary</h4>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Latest ATS</p>
                  <p className="text-2xl font-bold text-slate-900">{result?.ats_score ?? "--"}%</p>
                </div>
                <div className="w-20 h-20">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <span className="text-lg font-bold text-emerald-700">{result?.ats_score ?? "--"}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-700">Supported Files</h4>
              <p className="text-xs text-slate-500 mt-2">PDF, DOCX, TXT</p>
            </div>
          </aside>
        </div>

        {result && (
          <motion.div className="mt-8 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold text-slate-900">ATS Score</h2>
                <p className="text-sm text-slate-500 mt-1">Overall match to the job description</p>

                <motion.div className="mt-6 w-40 h-40 bg-gradient-to-br from-emerald-50 to-white rounded-full flex items-center justify-center shadow-[inset_0_-8px_20px_-12px_rgba(34,197,94,0.12)]" whileHover={{ scale: 1.03 }}>
                  <div className="w-32 h-32">
                    <CircularProgressbar
                      value={result.ats_score}
                      text={`${result.ats_score}%`}
                      styles={buildStyles({
                        textSize: "18px",
                        pathColor: "#059669",
                        textColor: "#065f46",
                        trailColor: "#ecfeff"
                      })}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <motion.div whileHover={{ y: -4 }} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-800">Semantic Score</h3>
                <p className="mt-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">{result.semantic_score}%</p>
                <p className="text-sm text-slate-500 mt-2">How well the resume content semantically matches the JD.</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-800">Skill Match Score</h3>
                <p className="mt-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">{result.skill_score}%</p>
                <p className="text-sm text-slate-500 mt-2">Portion of job-required skills found in the resume.</p>
              </motion.div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Matching Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.matching_skills.map((skill) => (
                  <motion.div key={skill} whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm shadow-sm">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Skills To Develop</h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.map((skill) => (
                  <motion.div key={skill} whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-100 text-sm shadow-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Recommendations</h3>
              <ul className="space-y-3">
                {result.suggestions.map((item, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.02 }} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="p-2 rounded-md bg-amber-100 text-amber-600">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div className="text-sm text-slate-700">{item}</div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">

              <h3 className="font-semibold text-slate-900 mb-3">Career Recommendations</h3>

              <div className="space-y-3">

                {getCareerSuggestions().length > 0 ? (

                  getCareerSuggestions().map((career, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                      <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
                        <Star className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium text-slate-800">{career}</div>
                    </div>
                  ))

                ) : (

                  <div className="bg-slate-50 text-slate-600 p-3 rounded-lg">
                    Analyze a resume with more technical skills to get career recommendations.
                  </div>

                )}

              </div>

            </div>

          </motion.div>
        )}

        {/* Loading overlay (keeps existing behavior, new animated overlay) */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-slate-700 animate-spin" />
              <div className="text-slate-700 font-medium">Analyzing resume — this may take a moment</div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default Analyzer;