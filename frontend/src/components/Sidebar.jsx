import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  History,
  Brain,
  FileSignature,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <div className="
      w-64
      h-screen
      bg-slate-900
      text-white
      fixed
      left-0
      top-0
      p-6
    ">

      <h1 className="
        text-2xl
        font-bold
        mb-10
      ">
        CareerPilot AI
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/" className="flex items-center gap-3">
            <LayoutDashboard size={20} />
            Dashboard
        </Link>

        <Link to="/analyzer" className="flex items-center gap-3">
            <FileText size={20} />
            Resume Analyzer
        </Link>

        <Link to="/history" className="flex items-center gap-3">
            <History size={20} />
            History
        </Link>

        <Link to="/interview" className="flex items-center gap-3">
            <Brain size={20} />
            Interview Prep
        </Link>

        <Link to="/cover-letter" className="flex items-center gap-3">
            <FileSignature size={20} />
            Cover Letter
        </Link>

        <Link to="/settings" className="flex items-center gap-3">
            <Settings size={20} />
            Settings
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;