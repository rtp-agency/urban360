import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHead, Section } from "@/components/ui";
import { home } from "@/content/copy";
import { segments } from "@/content/services";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Zielgruppen als Kachelfeld.
 *
 * Vorher waren das fünf Textzeilen mit einem 22-px-Symbol davor. Gelesen
 * wurde davon die erste; die übrigen vier verschwanden in einer grauen
 * Wand. Als Kacheln mit farbiger Symbolfläche hat jede Gruppe eine eigene
 * Form, und man erkennt in einem Blick, ob die eigene dabei ist.
 *
 * Das Raster läuft über sechs Spalten, nicht über drei. Fünf Einträge gehen
 * in drei Spalten nicht auf, es bliebe eine Lücke. Über sechs Spalten
 * belegt die erste Reihe je zwei und die zweite je drei Spalten: das Feld
 * schließt bündig ab und die letzte Reihe bekommt sichtbar mehr Gewicht,
 * statt wie ein Rest auszusehen.
 */
export function SegmentsList({ locale }: { locale: Locale }) {
  return (
    <Section id="zielgruppen">
      <Reveal>
        <SectionHead
          label={t(home.segmentsEyebrow, locale)}
          title={t(home.segmentsTitle, locale)}
          text={t(home.segmentsText, locale)}
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {segments.map((segment, index) => (
          <Reveal
            key={segment.id}
            className={`flex ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <li className="u-panel u-lift flex w-full flex-col p-6">
              <span className="u-tile">
                <Icon name={segment.icon} size={24} />
              </span>

              <h3 className="mt-5 text-[17px] leading-snug font-semibold text-ink">
                {t(segment.label, locale)}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {t(segment.detail, locale)}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
