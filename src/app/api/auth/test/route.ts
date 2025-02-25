import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token');
    
    return NextResponse.json({
        message: "Cookie test",
        hasCookie: !!token,
        cookieValue: token ? token.value : null
    });
}
