import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function QuickAction({ title, description, icon: Icon, to, color }) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Link
        to={to}
        className="block bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all"
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon size={28} className="text-white" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-slate-500 mt-2">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}

export default QuickAction;