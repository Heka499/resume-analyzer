import { createUploadthing, type FileRouter } from "uploadthing/server";
import { pdfParseAndStore } from "@/lib/pdf-handler";

const f = createUploadthing();

export const uploadRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded file url:", file.ufsUrl);

    // Extract and store resume content
    await pdfParseAndStore(file.ufsUrl);

    return { success: true };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
