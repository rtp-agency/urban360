import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { APPLICATION_LOCALES, isAppLocale } from "@/content/recruiting";
import { localeNames, tr, ui } from "@/content/application";
import { site } from "@/content/site.config";
import "../../globals.css";

export function generateStaticParams() {
  return APPLICATION_LOCALES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  /* Der Bogen wird per WhatsApp verteilt, nicht über die Suche gefunden.
     Er enthält ein Formular für personenbezogene Daten und hat im Index
     nichts verloren. */
  robots: { index: false, follow: false },
};

const HTML_LANG: Record<string, string> = { de: "de-DE", ru: "ru", uk: "uk", en: "en" };

export default async function JobLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isAppLocale(lang)) notFound();

  return (
    <html lang={HTML_LANG[lang]} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <header className="border-b border-hairline">
          <div className="mx-auto flex max-w-[640px] items-center justify-between gap-4 px-5 py-4">
            <Link href="/de" className="text-[16px] font-semibold tracking-tight text-ink">
              {site.name}
              <span className="ml-1.5 font-normal text-muted">Work</span>
            </Link>

            {/* Sprachumschalter gehört nach oben und nicht ins Fußende:
                wer die Sprache nicht versteht, scrollt nicht erst nach unten. */}
            <nav aria-label={tr(ui.pageTitle, lang)} className="flex flex-wrap gap-1">
              {APPLICATION_LOCALES.map((code) => (
                <Link
                  key={code}
                  href={`/job/${code}`}
                  hrefLang={code}
                  aria-current={code === lang ? "true" : undefined}
                  title={localeNames[code]}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-medium uppercase transition-colors ${
                    code === lang ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                  }`}
                >
                  {code}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-[640px] px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
