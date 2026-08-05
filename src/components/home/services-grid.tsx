import { Figure } from "@/components/figure";
import { Icon } from "@/components/icons";
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
 */
export function ServicesGrid({ locale }: { locale: Locale }) {
  const [feature, ...rest] = servicePackages;

  return (
    <Section id="leistungen" tone="sunken">
      <Reveal>
        <SectionHead title={t(home.servicesTitle, locale)} text={t(home.servicesText, locale)} />
      </Reveal>

      <div className="mt-12 grid gap-4">
        <Reveal>
          <article className="u-panel grid gap-8 p-6 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-10 md:p-8">
            <div>
              <Icon name={feature.icon} size={24} className="text-accent" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink md:text-[28px]">
                {t(feature.title, locale)}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-muted md:text-base">
                {t(feature.summary, locale)}
              </p>

              <ul className="mt-6 grid gap-2 border-t border-hairline pt-5 text-[15px] text-muted sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {feature.items.map((item) => (
                  <li key={item.de}>{t(item, locale)}</li>
                ))}
              </ul>
            </div>

            <Figure
              aspect="aspect-[4/3]"
              sizes="(min-width: 768px) 52vw, 100vw"
              brief={
                locale === "de"
                  ? "Bildplatz: Kontrollgang im Treppenhaus oder am Müllplatz, Querformat 4:3, mindestens 1600 x 1200 px."
                  : "Image slot: an inspection round in a stairwell or bin area, landscape 4:3, at least 1600 x 1200 px."
              }
            />
          </article>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((pack, index) => (
            <Reveal key={pack.id} className="flex">
              <article
                className={`u-panel flex w-full flex-col p-6 ${
                  index === 1 ? "bg-accent-soft" : ""
                }`}
              >
                <Icon name={pack.icon} size={24} className="text-accent" />

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                  {t(pack.title, locale)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {t(pack.summary, locale)}
                </p>

                <ul className="mt-6 space-y-2 border-t border-hairline pt-5 text-[15px] text-muted">
                  {pack.items.slice(0, 3).map((item) => (
                    <li key={item.de}>{t(item, locale)}</li>
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
