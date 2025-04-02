import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const authCookie = req.cookies.get("authData"); 
    const token = authCookie?.value || null;

    const response = NextResponse.next();
    response.headers.set("X-Middleware-Log", "Middleware executed");

    

    // If the user is trying to access protected routes without being logged in, redirect to login
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user is on the home page and logged in, redirect to /dashboard/table
    if (pathname === "/" && token) {
        console.log("in middleware");
        return NextResponse.redirect(new URL("/dashboard/table", req.url));
    }

    return response;
}

// Apply middleware to relevant routes

export const config = {
    // matcher: ["/api/:path*"],
    matcher: ["/dashboard/:path*", "/"],
};


