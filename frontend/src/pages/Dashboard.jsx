import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ATSChart from "../components/ATSChart";
import HeroBanner from "../components/HeroBanner";
import StatCard from "../components/StatCard";
import QuickAction from "../components/QuickAction";
import EmptyState from "../components/EmptyState";

import {
    FileText,
    Target,
    Trophy,
    Sparkles,
    Upload,
    Zap,
    BarChart3,
    Settings
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    highest: 0,
    latest: 0
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const history =
      JSON.parse(
        localStorage.getItem("analyses")
      ) || [];
    setHistory(history);
    if (history.length === 0) return;

    const scores =
      history.map(
        item => item.ats_score
      );

    const total =
      history.length;

    const average =
      (
        scores.reduce(
          (a, b) => a + b,
          0
        ) / total
      ).toFixed(1);

    const highest =
      Math.max(...scores);

    const latest =
      history[0].ats_score;

    setStats({
      total,
      average,
      highest,
      latest
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Analyze a new resume",
      icon: Upload,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Quick Scan",
      description: "Get instant insights",
      icon: Zap,
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "View Analytics",
      description: "Deep dive analytics",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Settings",
      description: "Customize your dashboard",
      icon: Settings,
      color: "from-slate-500 to-slate-600"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Banner */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <HeroBanner />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="mt-10 sm:mt-12 lg:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Analyses"
                value={stats.total}
                subtitle="Resumes analyzed"
                icon={FileText}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Average ATS"
                value={`${stats.average}%`}
                subtitle="Overall performance"
                icon={Target}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Highest ATS"
                value={`${stats.highest}%`}
                subtitle="Best resume"
                icon={Trophy}
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Latest ATS"
                value={`${stats.latest}%`}
                subtitle="Most recent analysis"
                icon={Sparkles}
                iconBg="bg-violet-100"
                iconColor="text-violet-600"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-12 lg:mt-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Quick Actions
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Get started with your next analysis
            </p>
          </div>
          <motion.div
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <QuickAction
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  color={action.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Career Progress Section */}
        <motion.div
          className="mt-12 lg:mt-16 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Career Progress
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Track how your ATS score improves over time
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ATSChart history={history} />
          </motion.div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          className="mt-12 lg:mt-16 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Recent Activity
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Your latest resume analyses
            </p>
          </div>

          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {history.slice(0, 5).map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-4 sm:p-5 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">
                      Resume Analysis
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {item.date}
                    </p>
                  </div>

                  <motion.div
                    className="ml-4 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="inline-flex items-center justify-center min-w-fit px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                      <span className="font-bold text-emerald-700 text-sm sm:text-base">
                        {item.ats_score}%
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;