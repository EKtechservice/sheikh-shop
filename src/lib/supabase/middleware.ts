import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are not set yet, allow request to proceed without crashing
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Use getUser(), NEVER getSession(), for secure server-side verification
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  const ownerEmail = (process.env.OWNER_EMAIL || "").trim().toLowerCase();
  const isOwner =
    Boolean(user?.email) &&
    Boolean(ownerEmail) &&
    user?.email?.trim().toLowerCase() === ownerEmail;

  // 1. Protect all /admin routes except /admin/login
  if (isAdminRoute && !isLoginPage) {
    if (!isOwner) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // 2. Redirect logged-in owner away from /admin/login to /admin
  if (isLoginPage && isOwner) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
