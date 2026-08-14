import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/content/site.config";
import { DEFAULT_APP_LOCALE } from "@/content/recruiting";

/**
 * Umleitungen und Grobschutz.
 *
 * Der Marketingteil lebt unter einem Sprachpräfix, Bewerbungsbogen und
 * Verwaltung nicht. Ohne die Ausnahmen unten würde /admin auf /de/admin
 * umgeleitet und wäre unerreichbar.
 *
 * Die Prüfung für /admin ist bewusst nur eine Vorprüfung auf das Vorhandensein
 * des Sitzungscookies. Ob die Sitzung gültig ist, weiß allein die Datenbank,
 * und die ist aus der Middleware nicht erreichbar. Die eigentliche Kontrolle
 * sitzt in app/admin/(app)/layout.tsx.
 */

const SESSION_COOKIE = "u360_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (!request.cookies.has(SESSION_COOKIE)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Kurzlinks für WhatsApp: /job und /bewerbung landen auf der deutschen
  // Fassung des Bogens, umschalten kann man dort oben rechts.
  if (pathname === "/job" || pathname === "/bewerbung" || pathname === "/bewerbung/") {
    const url = request.nextUrl.clone();
    url.pathname = `/job/${DEFAULT_APP_LOCALE}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/job")) return NextResponse.next();

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
