"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/lib/store";

type Job = {
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
  job_apply_link: string;
};

const countries = [
  { label: "Finland", value: "fi" },
  { label: "Sweden", value: "se" },
  { label: "Norway", value: "no" },
  { label: "Denmark", value: "dk" },
  { label: "Germany", value: "de" },
  { label: "United States", value: "us" },
  { label: "Remote", value: "" },
];

export default function JobsPage() {
  const { analysis } = useResumeStore();
  const [keywords, setKeywords] = useState<string>("");
  const [country, setCountry] = useState<string>("fi");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (analysis?.jobSearchTerms?.length) {
      setKeywords(analysis.jobSearchTerms.join(" "));
    }
  }, [analysis]);

  const handleSearch = async () => {
    setLoading(true);

    const query = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      keywords
    )}&page=1&num_pages=1&country=${country}&date_posted=all`;

    try {
      const res = await fetch("/api/job-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: query }),
      });

      const data = await res.json();
      if (process.env.NODE_ENV === "development") {
        console.log("Job Matches Data:", data);
      }
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching job matches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Search</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter job keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded w-1/3 bg-white text-black"
        >
          {countries.map((country) => (
            <option
              key={country.value}
              value={country.value}
              className="bg-white text-black"
            >
              {country.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Searching..." : "Search Jobs"}
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{job.job_title}</h3>
            <p className="">Employer: {job.employer_name}</p>
            <p>
              Location: {job.job_city}, {job.job_country}
            </p>
            <a
              href={job.job_apply_link}
              target="_blank"
              className="text-black bg-white rounded text-sm mt-2 p-2 inline-block"
            >
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
