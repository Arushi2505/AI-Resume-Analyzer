import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Cpu, ShieldCheck } from "lucide-react"; 

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`w-12 h-7 rounded-full p-1 transition-colors ${enabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
    >
      <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function Settings() {
  const [prefs, setPrefs] = useState({
    darkMode: false,
    emailNotifications: true,
    autoSave: true,
    shareUsage: false,
    githubSync: false
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('settings')) || {};
    setPrefs(p => ({ ...p, ...saved }));
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(prefs));
  }, [prefs]);

  const setPref = (key, value) => setPrefs(p => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage account, preferences and integrations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600"><User className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-slate-900">Account</h3>
                <p className="text-sm text-slate-500 mt-1">Profile and account settings</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Dark Mode</div>
                  <div className="text-xs text-slate-400">Enable sleek dark theme</div>
                </div>
                <Toggle enabled={prefs.darkMode} onChange={(v) => setPref('darkMode', v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Auto Save</div>
                  <div className="text-xs text-slate-400">Automatically save analyses locally</div>
                </div>
                <Toggle enabled={prefs.autoSave} onChange={(v) => setPref('autoSave', v)} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><Bell className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-500 mt-1">Control email alerts and updates</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Email Notifications</div>
                  <div className="text-xs text-slate-400">Receive analysis summaries via email</div>
                </div>
                <Toggle enabled={prefs.emailNotifications} onChange={(v) => setPref('emailNotifications', v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Share Usage Data</div>
                  <div className="text-xs text-slate-400">Help us improve the product (anonymized)</div>
                </div>
                <Toggle enabled={prefs.shareUsage} onChange={(v) => setPref('shareUsage', v)} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600"><Cpu className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-slate-900">Integrations</h3>
                <p className="text-sm text-slate-500 mt-1">Connect third-party services</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">GitHub Sync</div>
                  <div className="text-xs text-slate-400">Sync analyses to a repo</div>
                </div>
                <Toggle enabled={prefs.githubSync} onChange={(v) => setPref('githubSync', v)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Zapier</div>
                  <div className="text-xs text-slate-400">Automate workflows</div>
                </div>
                <Toggle enabled={prefs.zapier || false} onChange={(v) => setPref('zapier', v)} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold text-slate-900">Privacy</h3>
                <p className="text-sm text-slate-500 mt-1">Data retention and export options</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Export Data</div>
                  <div className="text-xs text-slate-400">Download your analysis history</div>
                </div>
                <button onClick={() => { const d = JSON.parse(localStorage.getItem('analyses')||'[]'); const blob = new Blob([JSON.stringify(d, null, 2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='analyses.json'; a.click(); URL.revokeObjectURL(url); }} className="px-3 py-1 rounded-md bg-slate-100 text-slate-700">Export</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Clear Local Data</div>
                  <div className="text-xs text-slate-400">Removes analyses stored in your browser</div>
                </div>
                <button onClick={() => { if(!confirm('Clear all local analyses?')) return; localStorage.removeItem('analyses'); }} className="px-3 py-1 rounded-md bg-red-50 text-red-700">Clear</button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default Settings;