import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, ChevronDown } from "lucide-react";

function History() {
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("analyses")) || [];
    setHistory(saved);
  }, []);

  const saveHistory = (next) => {
    localStorage.setItem("analyses", JSON.stringify(next));
    setHistory(next);
  };

  const handleDelete = (index) => {
    const ok = window.confirm("Delete this analysis? This action cannot be undone.");
    if (!ok) return;
    const next = [...history];
    next.splice(index, 1);
    saveHistory(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = history.slice(); // keep original order

    if (q) {
      list = list.filter((item) => {
        const date = (item.date || "").toLowerCase();
        const skills = ((item.matching_skills || []).join(" ") + " " + (item.missing_skills || []).join(" ")).toLowerCase();
        return date.includes(q) || skills.includes(q) || String(item.ats_score).includes(q);
      });
    }

    if (sortBy === "ats") {
      list.sort((a, b) => (b.ats_score || 0) - (a.ats_score || 0));
    }

    // sortBy === 'newest' keep stored order (assumed newest-first)
    return list;
  }, [history, query, sortBy]);

  const badgeColor = (score) => {
    if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 50) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Analysis History</h1>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by date, skill or score..."
                className="pl-10 pr-3 py-2 rounded-xl border border-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="newest">Sort: Newest</option>
                <option value="ats">Sort: ATS Score</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-lg font-medium text-slate-700">No analyses found.</p>
            <p className="text-sm text-slate-500 mt-2">Upload and analyze a resume to see your history here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.date + idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(2,6,23,0.08)" }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Resume Analysis</p>
                        <p className="mt-1 text-sm text-slate-400">{item.date}</p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${badgeColor(item.ats_score)}`}>
                        {item.ats_score}%
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-600">
                      <div className="flex flex-wrap gap-2">
                        {(item.matching_skills || []).slice(0,6).map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-slate-500">Semantic: <span className="font-medium text-slate-700">{item.semantic_score}%</span></div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDelete(history.indexOf(item))} className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;