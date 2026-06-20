import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Copy, Download, RefreshCw, Loader2 } from "lucide-react";

function CoverLetter() {

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [extraJD, setExtraJD] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const generateLetter = async () => {

    const resume = document.getElementById("resumeFile")?.files?.[0];

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!company || !jobTitle) {
      alert("Enter company and job title.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);

    formData.append(
      "job_description",
      `Company: ${company}\n\nRole: ${jobTitle}\n\n${extraJD}`
    );

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-cover-letter", formData);
      setLetter(response.data.cover_letter);
    } catch (err) {
      console.error(err);
      alert("Failed to generate.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover_letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    // Open printable window — user can save as PDF via print dialog
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Cover Letter</title><style>body{font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:40px; color:#0f172a;} .container{max-width:800px;margin:0 auto;} h1{font-size:18px;margin-bottom:16px;} pre{white-space:pre-wrap;font-size:15px;line-height:1.6;}</style></head><body><div class='container'><h1>Cover Letter for ${company} — ${jobTitle}</h1><pre>${letter.replace(/</g, '&lt;')}</pre></div></body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 250);
  };

  const handleRegenerate = () => {
    generateLetter();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-white/95 border border-white/60 rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-20px_rgba(2,6,23,0.06)]">

        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Cover Letter Generator</h1>
            <p className="text-slate-500 mt-2">Generate a tailored cover letter based on your resume and role.</p>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button onClick={generateLetter} disabled={loading} className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} <span>{loading ? 'Generating...' : 'Generate'}</span>
            </button>
            <button onClick={handleRegenerate} disabled={loading} className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg font-medium">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Resume</label>
            <div className="border-2 border-dashed rounded-xl p-4 flex items-center gap-3 cursor-pointer" onClick={() => document.getElementById('resumeFile')?.click()}>
              <div className="p-2 rounded-md bg-blue-50 text-blue-600"><UploadCloud className="w-5 h-5" /></div>
              <div className="text-sm text-slate-600">Click or drag a PDF to upload</div>
              <input id="resumeFile" ref={fileRef} type="file" accept=".pdf" className="hidden" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />

            <label className="block text-sm font-medium text-slate-700 mb-2 mt-3">Job Title</label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job title" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />

            <label className="block text-sm font-medium text-slate-700 mb-2 mt-3">Additional details (optional)</label>
            <textarea value={extraJD} onChange={(e) => setExtraJD(e.target.value)} placeholder="Add context like team, responsibilities or keywords..." className="w-full rounded-xl border border-slate-200 px-3 py-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
        </div>

        {/* Result area */}
        <div className="mt-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Generated Cover Letter</h3>
                <p className="text-sm text-slate-500">Editable preview — copy or download when ready.</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handleCopy} disabled={!letter} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Copy className="w-4 h-4" /> Copy
                </button>

                <button onClick={handleDownloadTxt} disabled={!letter} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100">
                  <Download className="w-4 h-4" /> TXT
                </button>

                <button onClick={handleDownloadPdf} disabled={!letter} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100">
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <textarea value={letter} readOnly className="w-full min-h-[320px] p-4 rounded-xl border border-slate-100 bg-gray-50 text-slate-800" />
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

export default CoverLetter;