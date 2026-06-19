import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-indigo-100",
  iconColor = "text-indigo-600",
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-3">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`${iconBg} ${iconColor} p-4 rounded-2xl`}
        >
          <Icon size={28} />
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;