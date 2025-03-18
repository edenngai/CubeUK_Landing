import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Pass the response to the Supabase session update
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - The root URL (/)
     * - The /teacher/create route
     * - Image files (e.g., .svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|^/$|^/teacher/create$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Also match i18n routes
    "/",
    "/(zh|en)/:path*",
  ],
};
