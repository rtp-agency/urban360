import { Reveal } from "@/components/reveal";
import { home } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Steuerermäßigung nach § 35a EStG.
 * Die Zahlen stammen aus dem Gesetz, nicht aus dem Marketing:
 * 20 % der Arbeitskosten, gedeckelt auf 4.000 € bei haushaltsnahen
 * Dienstleistungen und auf 1.200 € bei Handwerkerleistungen im Jahr.
 */
export function TaxPanel({ locale }: { locale: Locale }) {
  const tiles = [
    { value: "4.000 €", label: t(home.taxNoteA, locale) },
    { value: "1.200 €", label: t(home.taxNoteB, locale) },
  ];

  return (
    <section className="py-4">
      <div className="u-shell">
        <Reveal>
          <div className="rounded-[var(--radius-panel)] bg-accent-soft px-6 py-12 md:px-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div>
                <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance text-ink md:text-[40px] md:leading-[1.1]">
                  {t(home.taxTitle, locale)}
                </h2>
                <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
                  {t(home.taxText, locale)}
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-8 self-center lg:grid-cols-1 lg:gap-10">
                {tiles.map((tile) => (
                  <div key={tile.value}>
                    <dt className="text-[34px] leading-none font-semibold tracking-tight text-accent md:text-[44px]">
                      {tile.value}
                    </dt>
                    <dd className="mt-2.5 max-w-[26ch] text-[14px] leading-snug text-muted">
                      {tile.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
