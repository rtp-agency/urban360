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
 */
export function Assurance({ locale }: { locale: Locale }) {
  const visible = assurances.filter((entry) => claims[entry.claim]);
  if (visible.length === 0) return null;

  return (
    <Section id="zusagen" tone="sunken">
      <Reveal>
        <SectionHead title={t(home.assuranceTitle, locale)} />
      </Reveal>

      <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {visible.map((entry, index) => (
          <Reveal key={entry.claim} delay={index * 0.06}>
            <div className="border-t border-hairline pt-6">
              <h3 className="text-[17px] font-medium text-ink">{t(entry.title, locale)}</h3>
              <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
                {t(entry.text, locale)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
