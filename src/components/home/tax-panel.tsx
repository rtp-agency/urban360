import { TaxBar } from "@/components/charts/tax-bar";
import { Reveal } from "@/components/reveal";
import { home } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Steuerermäßigung nach § 35a EStG.
 *
 * Der Block trägt jetzt die volle Akzentfläche. Er ist das stärkste
 * Kaufargument der Seite für Privatkunden, und er stand vorher auf einem
 * blassen Grünton, der sich vom Rest der Seite kaum unterschied.
 *
 * Die Grafik daneben bleibt eine weiße Karte. Sie auf die farbige Fläche zu
 * setzen, hätte alle Kontrastwerte der Diagrammrampe ungültig gemacht, die
 * gegen Weiß gerechnet sind. Als Karte auf Farbe behält sie ihre Werte und
 * gewinnt zusätzlich an Tiefe.
 *
 * Die Zahlen selbst liegen in der Grafik, zusammen mit ihrer Quelle. Die
 * große 20 % daneben ist bewusst dieselbe Zahl, die auch im Kopf der Seite
 * steht: sie ist die einzige, die man sich merken soll.
 */
export function TaxPanel({ locale }: { locale: Locale }) {
  return (
    <section className="py-4">
      <div className="u-shell">
        <Reveal>
          <div className="u-accent-field u-grain relative overflow-hidden rounded-[var(--radius-panel)] px-6 py-12 md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="u-label !text-accent-ink/65">{t(home.taxEyebrow, locale)}</p>

                {/* Die Prozentzahl steht über der Überschrift und nicht
                    darin: als Ziffer wird sie beim Scrollen erfasst, als
                    Wort am Satzanfang nicht.

                    Auf dem Telefon entfällt sie. Dort stehen Ziffer und
                    Überschrift unmittelbar untereinander, und dieselbe Zahl
                    zweimal in zwei Zeilen liest sich nicht als Betonung,
                    sondern als Versehen. Der Verlust ist keiner: die
                    Überschrift beginnt selbst mit der Zahl. */}
                <p
                  aria-hidden
                  /* Die Zahl steht so auch in der Überschrift darunter. Für
                     die Vorlesesoftware wäre sie damit doppelt, sichtbar ist
                     sie der Grund, warum der Block überhaupt gelesen wird. */
                  className="u-data mt-4 hidden text-[76px] leading-[0.85] font-semibold text-accent-ink sm:block md:text-[104px]"
                >
                  20&thinsp;%
                </p>

                <h2 className="mt-6 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance text-accent-ink md:text-[32px] md:leading-[1.12]">
                  {t(home.taxTitle, locale)}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-accent-ink/80 md:text-[16px]">
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
