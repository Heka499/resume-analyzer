import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    if (process.env.NODE_ENV === "development") {
      console.log("Session ID:", sessionId);
    }
    const currentResume = await prisma.resume.findFirst({
      where: { sessionId: sessionId },
    });

    if (!currentResume) {
      return NextResponse.json(
        { error: "No current resume found" },
        { status: 404 }
      );
    }

    return NextResponse.json(currentResume);
  } catch (error) {
    console.error("Error fetching current resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
