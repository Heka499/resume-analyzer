"use client";

import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

export default function ResumeUploader() {
  const router = useRouter();

  const handleUploadSuccess = async () => {
    router.push("/resume");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <UploadButton
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
          handleUploadSuccess();
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
          alert("Failed to upload resume. Please try again.");
        }}
      />
    </div>
  );
}
