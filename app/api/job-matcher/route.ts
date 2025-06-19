import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const headers = {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("Job Matches Data:", data);
    }
    return NextResponse.json({ jobs: data.data });
  } catch (error) {
    console.error("JSearch API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job matches" },
      { status: 500 }
    );
  }
}
