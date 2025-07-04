import ResumePreview from "@/components/ResumePreview";
import ResumeAnalysis from "@/components/ResumeAnalysis";

export default function ResumePage() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Resume</h1>
      <ResumePreview />
      <ResumeAnalysis />
    </main>
  );
}
