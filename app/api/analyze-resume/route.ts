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
            First, analyze the resume text.
            Then return **only** a valid JSON object with the following structure,
            and nothing else. Do not add commentary or explanation.
            Choose only one most fitting jobSearchTerms based on the resume content.
            Do NOT wrap your response in markdown.
            Return only raw JSON.

{
  "skills": ["JavaScript", "React", "Node.js"],
  "summary": "Short summary of experience...",
  "improvementTips": "Suggestions to improve resume...",
  "jobSearchTerms": ["React Developer", "Frontend Developer", "Full Stack"]
}

            Now, here is the resume text:
            ${resume.textContent}
        `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    // Remove markdown formatting if present
    let raw = completion.choices[0].message.content || "";
    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error("OpenAI analysis error:", error);
      console.error("Raw response:", completion.choices[0].message.content);
      return NextResponse.json(
        { error: "Failed to parse OpenAI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis: parsed });
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
