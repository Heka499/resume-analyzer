import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const resumeData: Prisma.ResumeCreateInput[] = [
  {
    fileUrl: "https://example.com/resume1.pdf",
    textContent: "Sample resume content for resume 1.",
  },
  {
    fileUrl: "https://example.com/resume2.pdf",
    textContent: "Sample resume content for resume 2.",
  },
  {
    fileUrl: "https://example.com/resume3.pdf",
    textContent: "Sample resume content for resume 3.",
  },
];

export async function main() {
  for (const resume of resumeData) {
    await prisma.resume.create({
      data: resume,
    });
  }
}

main();
