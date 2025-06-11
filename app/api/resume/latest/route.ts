import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const latestResume = await prisma.resume.findFirst({
      orderBy: { uploadedAt: "desc" },
    });

    if (!latestResume) {
      return NextResponse.json({ error: "No resumes found" }, { status: 404 });
    }

    return NextResponse.json(latestResume);
  } catch (error) {
    console.error("Error fetching latest resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
