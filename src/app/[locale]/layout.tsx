import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isDraft } from "@/app/robots";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LOCALES, site, type Locale } from "@/content/site.config";
import { meta } from "@/content/copy";
import { htmlLang, isLocale, t } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} · ${t(meta.homeTitle, locale)}`,
      template: `%s · ${site.name}`,
    },
    description: t(meta.homeDescription, locale),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      type: "website",
      locale: htmlLang[locale],
      siteName: site.name,
      title: `${site.name} · ${t(meta.homeTitle, locale)}`,
      description: t(meta.homeDescription, locale),
    },
    /* Siehe app/robots.ts: solange Platzhalter in den Pflichtangaben stehen,
       darf die Seite nicht in den Index. */
    robots: isDraft ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  return (
    <html lang={htmlLang[typed]} suppressHydrationWarning>
      <head>
        {/* Farbe der Systemleisten in beiden Modi, passend zur Canvas-Fläche. */}
        <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          {typed === "de" ? "Zum Inhalt springen" : "Skip to content"}
        </a>
        <SiteHeader locale={typed} />
        <main id="inhalt">{children}</main>
        <SiteFooter locale={typed} />
      </body>
    </html>
  );
}
