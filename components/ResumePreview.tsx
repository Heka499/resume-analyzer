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
  const [loading, setLoading] = useState<boolean>(true);
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch("/api/resume/current");
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
    <div className="relative max-w-4xl mx-auto my-8">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden 
        ${preview ? "max-h-[1000px]" : "max-h-[160px]"}
        whitespace-pre-wrap text-sm text-gray-800 bg-white border p-4 rounded shadow`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-between">
          Parsed Resume Preview
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Show less" : "Show full resume"}
          </button>
        </h2>
        {resume.textContent}
      </div>

      {!preview && (
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t 
        from-white to-transparent pointer-events-none rounded-b"
        />
      )}
    </div>
  );
}
