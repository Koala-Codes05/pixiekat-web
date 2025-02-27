import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value; // Get the token from the cookie

    // Check if the request is for a protected route
    if (request.nextUrl.pathname.startsWith('/user') && !token) {
        // If no token found, redirect to login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("Decoded token:", decodedToken);

        return NextResponse.next();

    } catch (error) {
        console.error("JWT verification error:", error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Apply middleware to all routes under /user
export const config = {
    matcher: ["/user/:path*"],
};
