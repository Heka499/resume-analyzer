import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    const response = NextResponse.next();
    response.cookies.set("sessionId", uuidv4(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/jobs",
    "/resume",
    "/about",
    "/contact",
  ],
};
