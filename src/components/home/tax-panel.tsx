import { TaxBar } from "@/components/charts/tax-bar";
import { Reveal } from "@/components/reveal";
import { home } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Steuerermäßigung nach § 35a EStG.
 *
 * Früher standen hier zwei große Zahlen nebeneinander. Sie waren richtig,
 * aber sie beantworteten die eigentliche Frage nicht: worauf die 20 % denn
 * gerechnet werden. Deshalb übernimmt jetzt eine Grafik den Beleg, und der
 * Text daneben sagt nur noch, warum das den Auftraggeber angeht.
 *
 * Die Zahlen selbst liegen in der Grafik, zusammen mit ihrer Quelle.
 */
export function TaxPanel({ locale }: { locale: Locale }) {
  return (
    <section className="py-4">
      <div className="u-shell">
        <Reveal>
          <div className="u-grain relative overflow-hidden rounded-[var(--radius-panel)] bg-accent-soft px-6 py-12 md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="u-label">{t(home.taxEyebrow, locale)}</p>
                <h2 className="mt-4 max-w-[20ch] text-3xl font-semibold tracking-tight text-balance text-ink md:text-[40px] md:leading-[1.1]">
                  {t(home.taxTitle, locale)}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
                  {t(home.taxText, locale)}
                </p>
              </div>

              <TaxBar locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
