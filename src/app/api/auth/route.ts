import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json(); // Get token from request body

    const response = NextResponse.json({ message: "Token stored in cookies" });

    response.cookies.set("authData", token, {
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      path: "/",
      sameSite: "strict", // Correct case (not "Strict")
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to store token" }, { status: 500 });
  }
}

