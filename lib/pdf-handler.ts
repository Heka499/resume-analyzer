import fetch from "node-fetch";
import pdfParse from "pdf-parse";
import prisma from "@/lib/prisma";

export async function pdfParseAndStore(fileUrl: string) {
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
    },
  });

  console.log("Resume content stored successfully.");
}
