import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHead, Section } from "@/components/ui";
import { home } from "@/content/copy";
import { segments } from "@/content/services";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Zielgruppen. Bewusst als getrennte Zeilen und nicht als Kartenraster:
 * die Kacheln kommen eine Sektion später, und zweimal dieselbe Layoutfamilie
 * hintereinander lässt eine Seite templatehaft wirken.
 */
export function SegmentsList({ locale }: { locale: Locale }) {
  return (
    <Section id="zielgruppen">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionHead title={t(home.segmentsTitle, locale)} text={t(home.segmentsText, locale)} />
        </Reveal>

        <ul className="lg:pt-2">
          {segments.map((segment, index) => (
            <Reveal key={segment.id} delay={index * 0.05}>
              <li className="flex gap-5 border-b border-hairline py-6 first:pt-0 last:border-0 last:pb-0">
                <Icon name={segment.icon} size={22} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h3 className="text-[17px] font-medium text-ink">{t(segment.label, locale)}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-[15px] leading-relaxed text-muted">
                    {t(segment.detail, locale)}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
