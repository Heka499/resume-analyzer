"use client";

import { useEffect, useState } from "react";

type Resume = {
  id: number;
  fileUrl: string;
  textContent: string;
  uploadedAt: string;
};

export default function ResumePreview() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch("/api/resume/latest");
        if (!res.ok) throw new Error("Failed to fetch resume");
        const data = await res.json();
        setResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading resume...</p>;
  if (!resume)
    return <p className="text-center text-red-500">No resume found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Parsed Resume Preview
      </h2>
      <div className="whitespace-pre-wrap text-sm text-gray-800">
        {resume.textContent}
      </div>
    </div>
  );
}
