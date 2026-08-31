import { ButtonLink, TextLink } from "@/components/ui";
import { Figure } from "@/components/figure";
import { Reveal } from "@/components/reveal";
import { home, nav } from "@/content/copy";
import { servicePackages } from "@/content/services";
import { claims, contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

/**
 * Kopf der Startseite.
 *
 * Ab lg sitzt das Bild absolut an der rechten Fensterkante statt in einer
 * Rasterspalte. Das ist der Unterschied zwischen einer Seite aus zwei gleich
 * großen Kästen und einer, die eine Richtung hat: links die Schlagzeile,
 * rechts ein Bild, das aus dem Bildschirm herausläuft.
 *
 * Warum absolut und nicht per negativem Außenabstand: der Abstand bis zur
 * Fensterkante hängt von der Fensterbreite ab und müsste als calc über vw
 * geschrieben werden. Hier genügt right-0, der Browser rechnet selbst.
 *
 * Die zweite Rasterspalte bleibt leer stehen. Sie hält den Platz frei, damit
 * der Text nicht unter das Bild läuft: ein absolut gesetztes Element nimmt
 * am Raster nicht mehr teil.
 *
 * Die Kennwerte stehen bewusst AUSSERHALB dieses Bereichs. Lägen sie darin,
 * würde das über die volle Höhe gezogene Bild über ihnen liegen.
 */
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
    <section className="pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="relative">
        <div className="u-shell">
          <div className="grid items-center lg:grid-cols-[1fr_0.82fr] lg:gap-16">
            <Reveal className="lg:py-10">
              <p className="u-label">{t(home.heroEyebrow, locale)}</p>

              {/* clamp statt drei Breakpoint-Stufen: die Schlagzeile wächst
                  stufenlos mit dem Fenster und kippt nie zwischen zwei
                  Größen. */}
              <h1 className="mt-6 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[0.97] font-semibold tracking-[-0.03em] text-balance text-ink">
                {t(home.heroTitle, locale)}
              </h1>

              <p className="mt-7 max-w-[42ch] text-[17px] leading-relaxed text-muted md:text-xl">
                {t(home.heroText, locale)}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href={href(locale, "kontakt")} large>
                  {t(nav.cta, locale)}
                </ButtonLink>
                <ButtonLink href={href(locale, "leistungen")} tone="secondary" large>
                  {t(home.heroSecondary, locale)}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Unter lg ein gewöhnlicher Block unter dem Text, ab lg an der
            Fensterkante. Die Innenabstände bilden bis dahin die Hülle nach,
            damit das Bild auf dem Telefon nicht am Rand klebt. */}
        <div className="mt-12 px-5 md:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[44vw] lg:px-0">
          <Figure
            src="/images/hero-gebaeude.jpg"
            alt={
              locale === "de"
                ? "Mitarbeiter in Arbeitskleidung schiebt eine Mülltonne über den gefegten Zugangsweg eines gepflegten Mehrfamilienhauses."
                : "A worker in workwear wheels a bin along the swept path of a well kept apartment building."
            }
            aspect="aspect-[3/2] sm:aspect-[16/10] lg:aspect-auto lg:h-full"
            /* Im Querformat säße der mittige Standardschnitt auf der leeren
               Fassade. Der Ausschnitt wandert nach unten, damit Weg, Hecke
               und Person im Bild bleiben. */
            imgClassName="object-[50%_72%] lg:object-center"
            className="u-drift lg:rounded-tr-none lg:rounded-br-none"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            brief=""
          />
        </div>
      </div>

      {/* Kennwerte statt eines einzelnen Satzes über das Einsatzgebiet.
          Drei nüchterne Angaben geben der Seite den Ton eines Betriebs und
          nicht den einer Broschüre.

          Jeder Wert ist belegbar: die Anzahl ist aus dem Leistungskatalog
          gezählt, das Gebiet steht in der Konfiguration, und der feste
          Ansprechpartner erscheint nur, solange claims.fixedContact gesetzt
          ist. Damit kann hier keine Zusage stehen, die nicht auch in
          site.config als zutreffend markiert wurde. */}
      <div className="u-shell">
        <Reveal className="u-rule mt-16 pt-7 md:mt-24 md:pt-8">
          <dl className="grid gap-7 sm:grid-cols-3 sm:gap-6">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="u-label">{spec.label}</dt>
                <dd className="u-data mt-3 text-[17px] leading-snug font-medium text-ink">
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
      </div>
    </section>
  );
}
