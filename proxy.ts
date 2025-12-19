import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function to protect certain routes
export async function proxy(request: NextRequest) {
  // Get the JWT token from the request (NextAuth)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to /home
  if (!token) {
    return NextResponse.redirect(new URL("/issues/list", request.url));
  }

  // If token exists, allow request to continue
  return NextResponse.next();
}

// Routes to protect
export const config = {
  matcher: [
    "/issues/new",        // protect 'new issue' page //only sigined users are able to access
    "/issues/edit/:id+"   // protect 'edit issue' page
  ]
};
