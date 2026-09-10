import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/ui";
import { assurances, home } from "@/content/copy";
import { claims, type Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Zusagen an den Auftraggeber.
 *
 * Gerendert wird ausschließlich, was in site.config als belegt markiert ist.
 * Eine Versicherung, die noch nicht besteht, erscheint hier auch nicht als
 * Versprechen. Das ist keine Vorsicht, sondern § 5 UWG: eine unzutreffende
 * Angabe über Merkmale der Leistung ist eine abmahnfähige Irreführung.
 *
 * Die Spaltenzahl richtet sich nach der Anzahl der belegten Zusagen. Solange
 * nur zwei Schalter gesetzt sind, wären drei Spalten eine sichtbare Lücke,
 * und eine Lücke an dieser Stelle liest sich wie eine fehlende Zusage.
 */
export function Assurance({ locale }: { locale: Locale }) {
  const visible = assurances.filter((entry) => claims[entry.claim]);
  if (visible.length === 0) return null;

  const columns = visible.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <Section id="zusagen" tone="sunken">
      <Reveal>
        <SectionHead
          label={t(home.assuranceEyebrow, locale)}
          title={t(home.assuranceTitle, locale)}
        />
      </Reveal>

      <div className={`mt-9 sm:mt-12 grid gap-4 sm:grid-cols-2 ${columns}`}>
        {visible.map((entry) => (
          <Reveal key={entry.claim} className="flex">
            <div className="u-panel u-lift flex w-full gap-4 p-5 sm:gap-5 sm:p-6 md:p-7">
              <span className="u-tile u-tile-soft shrink-0">
                <Icon name={entry.icon} size={24} />
              </span>

              <div>
                <h3 className="text-[17px] leading-snug font-semibold text-ink">
                  {t(entry.title, locale)}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
                  {t(entry.text, locale)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
