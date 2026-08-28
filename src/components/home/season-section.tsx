import { SeasonBand } from "@/components/charts/season-band";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/content/site.config";

/**
 * Die Jahresgrafik steht allein in ihrer Sektion und ohne eigene
 * Sektionsüberschrift: Etikett und Titel trägt die Grafik bereits selbst.
 * Eine Überschrift darüber wäre dieselbe Aussage zweimal.
 *
 * Die Breite ist begrenzt. Über die volle Fläche gezogen laufen die
 * Monatsspalten so weit auseinander, dass der Blick die Zeile nicht mehr
 * hält und die Beschriftung links verloren geht.
 */
export function SeasonSection({ locale }: { locale: Locale }) {
  return (
    <section className="scroll-mt-20 py-16 md:py-24" id="jahresverlauf">
      <div className="u-shell">
        <Reveal className="mx-auto max-w-[62rem]">
          <SeasonBand locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
