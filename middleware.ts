import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  let user = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      user = data.user;
    }
  } catch (err) {
    console.warn("Supabase auth check in middleware temporarily unavailable:", err);
  }

  const pathname = request.nextUrl.pathname;

  // Protect /admin/* routes — redirect to /login if not authenticated
  if (pathname.startsWith("/admin") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Protect /kitchen (but not /kitchen/login) — redirect to /kitchen/login if not authenticated
  if (pathname.startsWith("/kitchen") && pathname !== "/kitchen/login" && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/kitchen/login";
    return NextResponse.redirect(url);
  }

  // Protect /myadmin (but not /myadmin/login) — redirect to /myadmin/login if not authenticated
  if (pathname.startsWith("/myadmin") && pathname !== "/myadmin/login" && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/myadmin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|wav)$).*)",
  ],
};
