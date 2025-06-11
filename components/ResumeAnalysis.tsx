"use client";

import { useState } from "react";
import JobMatches from "./JobMatches";

export default function ResumeAnalysis() {
  const [analysis, setAnalysis] = useState<string | null>(null);
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
      setAnalysis("Failed to fetch analysis.");
    } finally {
      setLoading(false);
    }
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
          {analysis}
        </div>
      )}

      <JobMatches analysis={analysis ? JSON.parse(analysis) : null} />
    </div>
  );
}
