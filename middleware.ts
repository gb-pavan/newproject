// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//     const { pathname, search } = req.nextUrl;
//     console.log("middleware......")

//     // If the URL contains `/dashboard/table`, remove it
//     if (pathname.startsWith("/dashboard/table")) {
//         const modifiedUrl = new URL(req.url);
//         modifiedUrl.pathname = pathname.replace("/dashboard/table", "/dashboard"); // Redirect to `/dashboard`
//         return NextResponse.rewrite(modifiedUrl);
//     }

//     return NextResponse.next();
// }

// // Apply middleware only to relevant routes
// export const config = {
//     matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();
    response.headers.set("X-Middleware-Log", "Middleware executed");

    if (pathname.startsWith("/dashboard/table")) {
        const modifiedUrl = new URL(req.url);
        modifiedUrl.pathname = pathname.replace("/dashboard/table", "/dashboard");
        return NextResponse.rewrite(modifiedUrl);
    }

    return response;
}

// Apply middleware to relevant routes

export const config = {
    matcher: ["/api/:path*"],
};


