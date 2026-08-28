import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/ui";
import { home, processSteps } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";

/**
 * Der Ablauf als Schiene, nicht als drei gleich große Kacheln.
 *
 * Drei nebeneinanderstehende Karten sagen "hier sind drei Dinge". Eine Linie
 * mit Knoten sagt "das geschieht nacheinander", und genau das ist die
 * Aussage. Die Nummer steht jetzt dabei: sie war vorher weggelassen, aber
 * ohne sichtbare Reihenfolge trägt die Anordnung allein die Information,
 * und auf dem Telefon steht alles untereinander.
 *
 * Die Schiene liegt waagerecht ab md und senkrecht darunter. Sie ist rein
 * dekorativ und deshalb aria-hidden: die Reihenfolge steht bereits in der
 * <ol>, ein Screenreader braucht die Linie nicht.
 *
 * Kein overflow-hidden am Raster. Die Eintrittsbewegung verschiebt den
 * Inhalt um einige Pixel nach unten, ein beschnittener Container würde
 * genau diese Pixel abschneiden und die letzte Textzeile kappen.
 */
export function ProcessRail({ locale }: { locale: Locale }) {
  return (
    <Section id="ablauf">
      <Reveal>
        <SectionHead label={t(home.processEyebrow, locale)} title={t(home.processTitle, locale)} />
      </Reveal>

      <ol className="mt-10 grid gap-9 border-l border-grid pl-7 md:mt-14 md:grid-cols-3 md:gap-10 md:border-l-0 md:pl-0 lg:gap-14">
        {processSteps.map((step, index) => (
          <Reveal key={step.title.de}>
            <li className="relative md:border-t md:border-grid md:pt-8">
              {/* Knoten auf der Schiene. Der Ring in Flächenfarbe hält die
                  Linie vom Punkt ab: ohne ihn wachsen beide zusammen und der
                  Knoten verliert seine Kontur. */}
              <span
                aria-hidden
                className="absolute top-[0.5rem] left-0 size-[9px] -translate-x-1/2 rounded-full bg-accent ring-4 ring-canvas md:top-0 md:-translate-y-1/2"
              />

              <p className="u-label u-nums">{String(index + 1).padStart(2, "0")}</p>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink md:text-xl">
                {t(step.title, locale)}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-muted md:mt-3">
                {t(step.text, locale)}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
