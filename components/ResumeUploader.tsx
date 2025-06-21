"use client";

import { UploadDropzone } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

export default function ResumeUploader() {
  const router = useRouter();

  const handleUploadSuccess = async () => {
    router.push("/resume");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <UploadDropzone
        className="ut-button:bg-white ut-button:text-black ut-button:border ut-button:border-gray-300 
        ut-button:rounded-lg ut-button:px-4 ut-button:py-2 hover:ut-button:bg-gray-100 transition ut-button:ut-uploading:bg-white
        ut-button:ut-uploading:text-gray-500 ut-button:ut-uploading:border-gray-300"
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
          if (process.env.NODE_ENV === "development") {
            console.log("Dropzone upload response:", res);
          }
          handleUploadSuccess();
        }}
        onUploadError={(error) => {
          console.error("Dropzone upload error:", error);
          alert("Failed to upload resume. Please try again.");
        }}
      />
    </div>
  );
}
