import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/content/site.config";

/**
 * Leitet jede Adresse ohne Sprachpräfix auf die deutsche Fassung um.
 * Es findet keine Auswertung des Accept-Language-Headers statt: eine
 * automatische Weiterleitung anhand von Browserdaten wäre eine
 * Verarbeitung, die hier keinen Mehrwert hätte. Die Sprache wählt der
 * Besucher über den Umschalter in der Navigation.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
