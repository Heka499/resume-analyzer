"use client";

import { UploadButton } from "../utils/uploadthing";

export default function ResumeUploader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <UploadButton
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
          alert("Resume uploaded successfully!");
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
          alert("Failed to upload resume. Please try again.");
        }}
      />
    </div>
  );
}
