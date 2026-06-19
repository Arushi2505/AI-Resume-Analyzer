import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">

      <div className="flex justify-center">

        <div className="bg-indigo-100 p-6 rounded-full">
          <FileSearch
            size={48}
            className="text-indigo-600"
          />
        </div>

      </div>

      <h2 className="text-2xl font-bold mt-6">
        No resume analyses yet
      </h2>

      <p className="text-slate-500 mt-3">
        Upload your first resume to unlock
        personalized career insights.
      </p>

      <Link
        to="/analyzer"
        className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Analyze Resume
      </Link>

    </div>
  );
}

export default EmptyState;