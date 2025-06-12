"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ResumeAnalysis() {
  const router = useRouter();
  const { analysis, setAnalysis } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/analyze-resume", { method: "POST" });
      if (!res.ok) throw new Error("Failed to analyze resume");
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const goToJobs = async () => {
    router.push("/jobs");
  };

  return (
    <div className="mt-10 p-6 bg-white border rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        AI Resume Analysis
      </h2>
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume with AI"}
      </button>

      {analysis && (
        <div className="mt-6 whitespace-pre-wrap text-sm text-gray-800">
          <h3 className="font-semibold">Summary:</h3>
          <p>{analysis.summary}</p>
          <h3 className="mt-4 font-semibold">Skills:</h3>
          <ul className="list-disc pl-5">
            {analysis.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3 className="mt-4 font-semibold">Improvement Tips:</h3>
          <p>{analysis.improvementTips}</p>
        </div>
      )}
      {analysis && (
        <button
          onClick={goToJobs}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Find Matching Jobs
        </button>
      )}

      {!analysis && !loading && (
        <p className="mt-4 text-gray-600">
          Click the button above to analyze your resume.
        </p>
      )}
    </div>
  );
}
