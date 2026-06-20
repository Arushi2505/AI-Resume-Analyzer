import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  History,
  Brain,
  FileSignature,
  Settings,
  Sparkles
} from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Resume Analyzer", to: "/analyzer", icon: FileText },
  { label: "History", to: "/history", icon: History },
  { label: "Interview Prep", to: "/interview", icon: Brain },
  { label: "Cover Letter", to: "/cover-letter", icon: FileSignature },
  { label: "Settings", to: "/settings", icon: Settings }
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 shadow-xl shadow-black/20 transition-all duration-300 sm:w-72 lg:w-64">
      <div className="flex h-full min-h-0 flex-col px-3 py-4 sm:px-5">
        <div className="mb-6 flex items-center gap-3 rounded-3xl bg-slate-900/95 px-3 py-3 shadow-inner shadow-slate-950/20 sm:px-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-300/15">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.24em] text-slate-200 sm:inline-block">Pilot</span>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <motion.div key={to} layout whileHover={{ x: 6 }} className="relative">
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-emerald-400" />
                )}

                <Link
                  to={to}
                  className={`group flex items-center gap-3 rounded-3xl px-3 py-3 text-sm font-medium transition duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-emerald-500/10"
                      : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100"
                  }`}
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"
                  }`}>
                    <Icon size={18} />
                  </span>
                  <span className="hidden text-sm font-medium sm:inline-flex">{label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;