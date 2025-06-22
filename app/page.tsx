import ResumeUploader from "@/components/ResumeUploader";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Resume Analyzer</h1>
      <p className="text-center mt-4">
        Get resume feedback in seconds and search for jobs
      </p>
      <div className="flex flex-col items-center justify-center min-h-full pt-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
        <ResumeUploader />
        <p className="text-gray-500 mt-4 w-1/2 text-center">
          Resumes are stored using{" "}
          <a href="https://uploadthing.com/">Uploadthing</a> and analyzed with{" "}
          <a href="https://openai.com/">OpenAI</a>. Your data is not shared with
          third parties and is used only for analysis purposes.
        </p>
        <p className="text-gray-500 mt-20 w-1/2 text-center">
          App by Heikki Järvinen,{" "}
          <a
            href="https://github.com/Heka499/resume-analyzer"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
}
