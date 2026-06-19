import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[32px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl"
    >
      <h1 className="text-5xl font-extrabold mb-4">
        🚀 CareerPilot AI
      </h1>

      <p className="text-lg text-blue-100 max-w-2xl">
        Analyze resumes, improve ATS scores,
        generate AI-powered cover letters and
        prepare confidently for interviews.
      </p>

      <div className="flex gap-4 mt-8">

        <Link
          to="/analyzer"
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2"
        >
          Analyze Resume
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/history"
          className="border border-white/50 px-6 py-3 rounded-xl hover:bg-white/10 transition"
        >
          View History
        </Link>

      </div>
    </motion.div>
  );
}

export default HeroBanner;