import fetch from "node-fetch";
import prisma from "@/lib/prisma";

export async function pdfParseAndStore(fileUrl: string, sessionId?: string) {
  const pdfParse = (await import("pdf-parse")).default;
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const data = await pdfParse(buffer);
  const resumeContent = data.text;

  // Store the resume content in the database
  await prisma.resume.create({
    data: {
      fileUrl,
      textContent: resumeContent,
      sessionId,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Parsed resume content:", resumeContent);
  }
}
