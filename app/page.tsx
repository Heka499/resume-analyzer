import ResumeUploader from "@/components/ResumeUploader";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Resume Analyzer</h1>
      <p className="text-center mt-4">
        Get resume feedback in seconds and find your dream job
      </p>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
        <ResumeUploader />
      </div>
    </div>
  );
}
