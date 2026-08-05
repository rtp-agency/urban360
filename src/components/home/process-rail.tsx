import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/ui";
import { home, processSteps } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Drei Schritte auf einer Linie. Nummerierte Etiketten wie "Schritt 1"
 * fehlen absichtlich: die Reihenfolge steht bereits in der Anordnung,
 * das Verb sagt schneller, worum es geht.
 */
export function ProcessRail({ locale }: { locale: Locale }) {
  return (
    <Section id="ablauf">
      <Reveal>
        <SectionHead title={t(home.processTitle, locale)} />
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden md:grid-cols-3">
        {processSteps.map((step, index) => (
          <Reveal key={step.title.de} delay={index * 0.07}>
            <div className="border-t border-hairline pt-6 md:h-full md:pr-8">
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                {t(step.title, locale)}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-muted">
                {t(step.text, locale)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
