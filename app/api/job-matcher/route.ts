import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { keywords } = await req.json();

  if (!keywords || keywords.length === 0) {
    return NextResponse.json(
      { error: "No keywords provided" },
      { status: 400 }
    );
  }

  const query = keywords.slice(0, 3).join(" ");

  const res = await fetch("https://jsearch.p.rapidapi.com/search", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  } as RequestInit & { url: string });

  const data = await res.json();

  return NextResponse.json(data);
}
