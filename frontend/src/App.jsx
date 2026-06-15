import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI Resume Analyzer
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Upload Resume
          </label>

          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Job Description
          </label>

          <textarea
            rows="8"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
            className="border p-3 rounded w-full"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Analyze Resume
        </button>

        {result && (
          <div className="mt-8 space-y-4">
            <div className="p-4 border rounded">
              <p className="mt-2">
                Semantic Score: {result.semantic_score}%
              </p>

              <p>
                Skill Score: {result.skill_score}%
              </p>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-bold">Matching Skills</h3>
              <ul className="list-disc pl-6">
                {result.matching_skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-bold">Missing Skills</h3>
              <ul className="list-disc pl-6">
                {result.missing_skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-bold">Suggestions</h3>
              <ul className="list-disc pl-6">
                {result.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;