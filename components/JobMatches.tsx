"use client";

import { useState } from "react";

type Analysis = {
  skills: string[];
  summary: string;
  improvementTips: string;
  jobSearchTerms: string[];
};

export default function JobMatches({ analysis }: { analysis: Analysis }) {
  const [jobs, setJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFindJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/job-matcher", {
        method: "POST",
        body: JSON.stringify({ keywords: analysis.jobSearchTerms }),
      });

      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching job matches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleFindJobs}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Searching..." : "Find Matching Jobs"}
      </button>

      <ul className="mt-4 space-y-2">
        {jobs.map((job, index) => (
          <li key={index} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{job.job_title}</h3>
            <p className="text-sm text-gray-600">{job.employer_name}</p>
            <p className="text-sm">{job.job_description.slice(0, 200)}...</p>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Apply
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
