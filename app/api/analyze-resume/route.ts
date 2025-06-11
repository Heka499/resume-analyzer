import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: { uploadedAt: "desc" },
    });

    if (!resume) {
      return NextResponse.json(
        { message: "No resumes found" },
        { status: 404 }
      );
    }

    const prompt = `
            You are a career coach analyzing a resume.
            Please:
            - Extract key skills
            - Summarize professional experience
            - Identify weak areas or gaps
            - Suggest how to improve this resume
            - Recommend roles that match the candidate's skills
            Resume content:
            ${resume.textContent}
        `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
