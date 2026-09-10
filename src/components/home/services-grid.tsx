import Image from "next/image";
import { CheckIcon, Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead, TextLink } from "@/components/ui";
import { home } from "@/content/copy";
import { servicePackages } from "@/content/services";
import type { Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

/**
 * Fünf Leistungsgruppen in fünf Zellen.
 *
 * Reihe 1 ist eine breite Zelle mit Bild, Reihe 2 sind vier gleich hohe
 * Zellen. Das Raster geht exakt auf, es bleibt keine leere Kachel übrig.
 * Die breite Zelle teilt sich intern in Text und Bild, statt das Bild unter
 * den Text zu stellen: sonst zieht sie die Nachbarzelle auf ihre Höhe und
 * daneben steht eine halbe Bildschirmhöhe Leerraum.
 *
 * Neu ist die Farbe: die breite Zelle steht auf voller Akzentfläche. Das
 * ist der einzige Block der Seite, der die Markenfarbe großflächig trägt,
 * und er markiert damit die Hauptleistung. Wären alle fünf Zellen farbig,
 * wäre keine hervorgehoben; wäre keine farbig, sähe die Sektion aus wie
 * jede andere Kachelwand.
 *
 * Das Bild in der breiten Zelle liegt direkt als <Image> und nicht in
 * <Figure>: es braucht hier keinen Platzhalter mit Tonfläche, denn die
 * farbige Zelle darunter ist bereits eine.
 */
export function ServicesGrid({ locale }: { locale: Locale }) {
  const [feature, ...rest] = servicePackages;

  return (
    <Section id="leistungen" tone="sunken">
      <Reveal>
        <SectionHead
          label={t(home.servicesEyebrow, locale)}
          title={t(home.servicesTitle, locale)}
          text={t(home.servicesText, locale)}
        />
      </Reveal>

      <div className="mt-9 sm:mt-12 grid gap-4">
        <Reveal>
          <article className="u-accent-field u-grain relative overflow-hidden rounded-[var(--radius-panel)]">
            <div className="grid gap-7 p-5 sm:p-6 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-10 md:p-9">
              <div>
                {/* Auf farbigem Grund trägt die Kachel keinen zweiten
                    Verlauf, sondern eine durchscheinende Fläche. Ein
                    Verlauf auf einem Verlauf wird zu Matsch. */}
                <span className="grid size-12 place-items-center rounded-[15px] bg-accent-ink/15 text-accent-ink ring-1 ring-accent-ink/20">
                  <Icon name={feature.icon} size={24} />
                </span>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-accent-ink md:text-[30px]">
                  {t(feature.title, locale)}
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-accent-ink/80 md:text-base">
                  {t(feature.summary, locale)}
                </p>

                <ul className="mt-6 grid gap-2.5 border-t border-accent-ink/20 pt-5 text-[15px] text-accent-ink/85 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {feature.items.map((item) => (
                    <li key={item.de} className="flex gap-2">
                      <CheckIcon
                        size={15}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-accent-ink"
                      />
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] ring-1 ring-accent-ink/20">
                <Image
                  src="/images/objektbetreuung-treppenhaus.jpg"
                  alt={
                    locale === "de"
                      ? "Mitarbeiter mit Klemmbrett beim Kontrollgang in einem frisch gereinigten Treppenhaus."
                      : "A worker with a clipboard on an inspection round in a freshly cleaned stairwell."
                  }
                  fill
                  sizes="(min-width: 768px) 52vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((pack) => (
            <Reveal key={pack.id} className="flex">
              <article className="u-panel u-lift flex w-full flex-col p-5 sm:p-6">
                <span className="u-tile u-tile-soft">
                  <Icon name={pack.icon} size={24} />
                </span>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  {t(pack.title, locale)}
                </h3>
                <p className="mt-2 mb-5 text-[15px] leading-relaxed text-muted sm:mb-6">
                  {t(pack.summary, locale)}
                </p>

                {/* Drei Stichpunkte, nicht sechs. Wer den vollständigen
                    Umfang sucht, folgt dem Link unter der Sektion; hier
                    entscheidet sich nur, ob die Gruppe überhaupt gemeint
                    ist. */}
                {/* mt-auto schiebt die Liste an den Fuß der Karte. Ohne das
                    beginnt sie in jeder Karte auf einer anderen Höhe, weil
                    die Zusammenfassungen unterschiedlich lang sind, und die
                    vier Trennlinien stehen dann treppenförmig versetzt. */}
                <ul className="mt-auto space-y-2 border-t border-hairline pt-4 text-[15px] text-muted sm:space-y-2.5 sm:pt-5">
                  {pack.items.slice(0, 3).map((item) => (
                    <li key={item.de} className="flex gap-2">
                      <CheckIcon
                        size={15}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-accent"
                      />
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-10">
        <TextLink href={href(locale, "leistungen")}>{t(home.servicesLink, locale)}</TextLink>
      </Reveal>
    </Section>
  );
}
