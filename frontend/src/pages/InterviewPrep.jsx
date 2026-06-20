import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Loader2, Building, Briefcase, ChevronDown } from "lucide-react";

function InterviewPrep() {

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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

    // small UX delay to show loading animation (does not change generation logic)
    setLoading(true);
    setTimeout(() => {
      setQuestions(generated);
      setLoading(false);
    }, 450);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // subtle feedback could be added later
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const handleRegenerate = () => {
    generateQuestions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8">

      <div className="max-w-4xl mx-auto bg-white/95 border border-white/60 rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-20px_rgba(2,6,23,0.06)]">

        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Interview Prep</h1>
            <p className="text-slate-500 mt-2">Generate interview questions based on your latest analysis.</p>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button onClick={generateQuestions} disabled={loading} className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} 
              <span>{loading ? "Generating..." : "Generate"}</span>
            </button>

            <button onClick={handleRegenerate} disabled={loading} className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>

        {/* Selectors */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700 mb-1">Company</span>
            <div className="relative">
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Acme Corp" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <Building className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
            </div>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700 mb-1">Role</span>
            <div className="relative">
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Senior ML Engineer" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <Briefcase className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
            </div>
          </label>
        </div>

        {/* Questions list */}
        <div className="mt-6">
          <AnimatePresence>
            {questions.length === 0 && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center text-slate-600">No questions yet — generate based on your latest resume analysis.</motion.div>
            )}

            {loading && (
              <div className="p-6 rounded-xl bg-white border border-slate-100 text-center">
                <Loader2 className="w-6 h-6 mx-auto animate-spin text-slate-700" />
                <div className="mt-3 text-slate-700">Generating interview questions…</div>
              </div>
            )}

            <div className="mt-4 space-y-3">
              {questions.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">Q{i+1}</div>
                        <div>
                          <div className="font-medium text-slate-900">{q}</div>
                          <div className="text-xs text-slate-400">{company || "Any Company"} • {role || "Any Role"}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); handleCopy(q); }} className="text-slate-600 hover:text-slate-800 p-2 rounded-md" title="Copy question">
                          <Copy className="w-4 h-4" />
                        </button>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                      </div>
                    </summary>

                    <div className="px-4 pb-4 pt-0 text-sm text-slate-700">
                      <p className="mb-3">Use this prompt when practicing aloud or with a peer.</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleCopy(q)} className="text-sm px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">Copy</button>
                        <button onClick={() => navigator.clipboard.writeText(`${q}\nCompany: ${company}\nRole: ${role}`)} className="text-sm px-3 py-2 rounded-md bg-slate-100">Copy with context</button>
                      </div>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}

export default InterviewPrep;