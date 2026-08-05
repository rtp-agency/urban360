import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/ui";
import { home, processSteps } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Drei Schritte auf einer Linie. Nummerierte Etiketten wie "Schritt 1"
 * fehlen absichtlich: die Reihenfolge steht bereits in der Anordnung,
 * das Verb sagt schneller, worum es geht.
 *
 * Kein overflow-hidden am Raster. Die Eintrittsbewegung verschiebt den
 * Inhalt um einige Pixel nach unten, ein beschnittener Container würde
 * genau diese Pixel abschneiden und die letzte Textzeile kappen.
 */
export function ProcessRail({ locale }: { locale: Locale }) {
  return (
    <Section id="ablauf">
      <Reveal>
        <SectionHead title={t(home.processTitle, locale)} />
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-8 lg:gap-12">
        {processSteps.map((step) => (
          <Reveal key={step.title.de}>
            <div className="border-t border-hairline pt-5 md:pt-6">
              <h3 className="text-lg font-semibold tracking-tight text-ink md:text-xl">
                {t(step.title, locale)}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-muted md:mt-3">
                {t(step.text, locale)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
