import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashbord(.*)",
  "/api/payment",
  "/payment(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, clerk-token",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (isProtectedRoute(req)) {
    await auth.protect(); // This will throw if unauthorized, automatically handled by Clerk
  }

  // Let the request continue and just append CORS headers
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, clerk-token");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
});


export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
