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
 * Aussage.
 *
 * Die Schrittnummer ist jetzt eine Grafik: groß, nur als Kontur, in
 * Akzentfarbe. Als kleines Etikett war sie zwar vorhanden, aber sie las
 * sich wie eine Fußnote. Als Kontur trägt sie die Reihenfolge sichtbar und
 * erschlägt trotzdem die Überschrift daneben nicht, weil ihr die Fläche
 * fehlt.
 *
 * Die Schiene liegt waagerecht ab md und senkrecht darunter. Sie ist rein
 * dekorativ und deshalb aria-hidden: die Reihenfolge steht bereits in der
 * <ol>, ein Screenreader braucht die Linie nicht. Sie verläuft von voller
 * Akzentfarbe nach transparent, damit sie nach dem letzten Schritt endet,
 * statt ins Leere weiterzulaufen.
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

      <div className="relative mt-10 md:mt-16">
        {/* Waagerechte Schiene ab md. Sie liegt hinter den Knoten und ist
            deshalb ein eigenes Element und keine Rahmenlinie der Zellen:
            eine Rahmenlinie je Zelle bekäme an jeder Zellgrenze eine Lücke. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-px md:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-accent) 0%, color-mix(in oklab, var(--color-accent) 35%, transparent) 62%, transparent 100%)",
          }}
        />

        <ol className="grid gap-10 border-l border-grid pl-7 md:grid-cols-3 md:gap-10 md:border-l-0 md:pl-0 lg:gap-16">
          {processSteps.map((step, index) => (
            <Reveal key={step.title.de}>
              <li className="relative md:pt-9">
                {/* Knoten auf der Schiene. Der Ring in Flächenfarbe hält die
                    Linie vom Punkt ab: ohne ihn wachsen beide zusammen und der
                    Knoten verliert seine Kontur. */}
                <span
                  aria-hidden
                  className="absolute top-[0.5rem] left-0 size-[10px] -translate-x-1/2 rounded-full bg-accent ring-4 ring-canvas md:top-0 md:-translate-y-1/2"
                />

                <p className="u-numeral text-[64px] md:text-[76px]" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink md:text-xl">
                  {t(step.title, locale)}
                </h3>
                <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-muted md:mt-3">
                  {t(step.text, locale)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
