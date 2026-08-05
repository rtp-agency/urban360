import Link from "next/link";
import { DEFAULT_LOCALE } from "@/content/site.config";
import { notFound as copy } from "@/content/copy";
import { htmlLang, t } from "@/lib/i18n";

/**
 * Diese Seite liegt außerhalb des [locale]-Segments und muss deshalb
 * html und body selbst mitbringen. Sprache: die Standardsprache der Seite.
 */
export default function GlobalNotFound() {
  const locale = DEFAULT_LOCALE;

  return (
    <html lang={htmlLang[locale]}>
      <body>
        <main className="u-shell flex min-h-[70dvh] flex-col justify-center py-24">
          <h1 className="text-[34px] font-semibold tracking-tight text-ink md:text-[44px]">
            {t(copy.title, locale)}
          </h1>
          <p className="mt-4 max-w-[44ch] text-[17px] leading-relaxed text-muted">
            {t(copy.text, locale)}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-[15px] font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              {t(copy.back, locale)}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
