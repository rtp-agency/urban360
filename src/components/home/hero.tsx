import { ButtonLink, TextLink } from "@/components/ui";
import { Figure } from "@/components/figure";
import { Reveal } from "@/components/reveal";
import { home, nav } from "@/content/copy";
import { servicePackages } from "@/content/services";
import { claims, contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const specs = [
    {
      label: t(home.heroSpecScope, locale),
      /* Gezählt, nicht gepflegt: wer eine Leistungsgruppe ergänzt, ändert
         services.ts, und die Zahl hier zieht von selbst nach. */
      value: String(servicePackages.length).padStart(2, "0"),
    },
    { label: t(home.heroSpecArea, locale), value: t(contact.serviceArea, locale) },
    ...(claims.fixedContact
      ? [
          {
            label: t(home.heroSpecContact, locale),
            value: t(home.heroSpecContactValue, locale),
          },
        ]
      : []),
  ];

  return (
    <section className="u-shell pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <h1 className="text-[40px] leading-[1.06] font-semibold tracking-tight text-balance text-ink sm:text-[52px] lg:text-[60px]">
            {t(home.heroTitle, locale)}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted md:text-xl">
            {t(home.heroText, locale)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={href(locale, "kontakt")} large>
              {t(nav.cta, locale)}
            </ButtonLink>
            <ButtonLink href={href(locale, "leistungen")} tone="secondary" large>
              {t(home.heroSecondary, locale)}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal>
          <Figure
            src="/images/hero-gebaeude.jpg"
            alt={
              locale === "de"
                ? "Mitarbeiter in Arbeitskleidung schiebt eine Mülltonne über den gefegten Zugangsweg eines gepflegten Mehrfamilienhauses."
                : "A worker in workwear wheels a bin along the swept path of a well kept apartment building."
            }
            aspect="aspect-[3/2] sm:aspect-[16/10] lg:aspect-[4/5]"
            /* Im Querformat säße der mittige Standardschnitt auf der leeren
               Fassade. Der Ausschnitt wandert nach unten, damit Weg, Hecke
               und Person im Bild bleiben. */
            imgClassName="object-[50%_72%] lg:object-center"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            brief=""
          />
        </Reveal>
      </div>

      {/* Kennwerte statt eines einzelnen Satzes über das Einsatzgebiet.
          Drei nüchterne Angaben unter dem Hero geben der Seite den Ton eines
          Betriebs und nicht den einer Broschüre.

          Jeder Wert ist belegbar: die Anzahl ist aus dem Leistungskatalog
          gezählt, das Gebiet steht in der Konfiguration, und der feste
          Ansprechpartner erscheint nur, solange claims.fixedContact gesetzt
          ist. Damit kann hier keine Zusage stehen, die nicht auch in
          site.config als zutreffend markiert wurde. */}
      <Reveal className="u-rule mt-16 pt-7 md:mt-20 md:pt-8">
        <dl className="grid gap-7 sm:grid-cols-3 sm:gap-6">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="u-label">{spec.label}</dt>
              <dd className="u-nums mt-2.5 text-[17px] leading-snug font-medium text-ink">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <TextLink href={href(locale, "kontakt")}>
            {locale === "de" ? "Objekt anfragen" : "Ask about your property"}
          </TextLink>
        </div>
      </Reveal>
    </section>
  );
}
