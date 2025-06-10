import ResumeUploader from "@/components/ResumeUploader";

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <ResumeUploader />
    </div>
  );
}
