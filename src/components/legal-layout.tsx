import type { ReactNode } from "react";
import type { LegalSection } from "@/content/legal";
import { legalLabels } from "@/content/legal";
import { legal, type Locale } from "@/content/site.config";
import { fill, t } from "@/lib/i18n";

/**
 * Gemeinsames Gerüst für Impressum, Datenschutz und AGB.
 * Schmale Spalte, ruhige Hierarchie, keine Kacheln: Rechtstexte werden
 * gelesen, nicht überflogen.
 */
export function LegalLayout({
  locale,
  title,
  subtitle,
  intro,
  children,
}: {
  locale: Locale;
  title: string;
  subtitle?: string;
  intro?: string;
  children: ReactNode;
}) {
  const note = t(legalLabels.bindingVersion, locale);

  return (
    <article className="u-shell pt-14 pb-24 md:pt-24 md:pb-28">
      <header className="max-w-[62ch]">
        <h1 className="text-[34px] leading-[1.1] font-semibold tracking-tight text-ink md:text-[44px]">
          {title}
        </h1>
        {subtitle ? <p className="mt-3 text-[15px] text-muted">{subtitle}</p> : null}
        {intro ? (
          <p className="mt-6 text-[16px] leading-relaxed text-muted md:text-[17px]">{intro}</p>
        ) : null}
        {note ? (
          <p className="mt-6 border-l-2 border-hairline pl-4 text-[14px] leading-relaxed text-muted">
            {note}
          </p>
        ) : null}
      </header>

      <div className="mt-12 max-w-[68ch]">{children}</div>

      <p className="mt-16 max-w-[68ch] border-t border-hairline pt-6 text-[13px] text-muted">
        {t(legalLabels.lastReviewedLabel, locale)}: {legal.lastReviewed}
      </p>
    </article>
  );
}

export function LegalSections({
  locale,
  sections,
  values = {},
}: {
  locale: Locale;
  sections: LegalSection[];
  values?: Record<string, string>;
}) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.heading.de}>
          <h2 className="text-[19px] font-semibold tracking-tight text-ink">
            {t(section.heading, locale)}
          </h2>

          {section.body?.map((paragraph) => (
            <p
              key={paragraph.de}
              className="mt-3 text-[16px] leading-relaxed text-muted"
            >
              {fill(t(paragraph, locale), values)}
            </p>
          ))}

          {section.list ? (
            <ul className="mt-4 space-y-2 pl-5">
              {section.list.map((item) => (
                <li
                  key={item.de}
                  className="list-disc text-[16px] leading-relaxed text-muted marker:text-hairline"
                >
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

/** Beschriftete Zeile für die Pflichtangaben im Impressum. */
export function LegalRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-hairline py-4 sm:grid-cols-[15rem_1fr] sm:gap-6">
      <dt className="text-[15px] font-medium text-ink">{label}</dt>
      <dd className="text-[16px] leading-relaxed text-muted">{children}</dd>
    </div>
  );
}
