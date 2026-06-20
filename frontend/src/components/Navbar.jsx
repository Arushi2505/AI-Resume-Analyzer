import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";

const pageLabels = {
  "/": "Dashboard",
  "/analyzer": "Resume Analyzer",
  "/history": "History",
  "/interview": "Interview Prep",
  "/cover-letter": "Cover Letter",
  "/settings": "Settings"
};

function Navbar() {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    return pageLabels[location.pathname] || "Overview";
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Current page</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            <UserCircle className="h-5 w-5 text-slate-500" />
            <span>Arushi</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;