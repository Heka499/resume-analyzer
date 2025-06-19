import {
  createUploadthing,
  UploadThingError,
  type FileRouter,
} from "uploadthing/server";
import { pdfParseAndStore } from "@/lib/pdf-handler";
import { cookies } from "next/headers";

const f = createUploadthing();

export const uploadRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({}) => {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get("sessionId")?.value;

      if (!sessionId) {
        throw new UploadThingError("Session ID not found.");
      }

      return { sessionId: sessionId };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Upload complete:", metadata, file);
      }
      // Extract and store resume content
      await pdfParseAndStore(file.ufsUrl, metadata.sessionId);

      return { success: true };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
