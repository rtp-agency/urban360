import { ButtonLink } from "@/components/ui";
import { Figure } from "@/components/figure";
import { Reveal } from "@/components/reveal";
import { CheckIcon } from "@/components/icons";
import { home, nav } from "@/content/copy";
import { servicePackages } from "@/content/services";
import { claims, contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

/**
 * Kopf der Startseite.
 *
 * Drei Entscheidungen tragen diesen Block:
 *
 * 1. Die Fläche ist eingefärbt, nicht weiß. Unter dem Inhalt liegt ein
 *    Farbfeld aus versetzten radialen Verläufen (.u-mesh). Der erste
 *    Bildschirm war vorher weiß auf weiß, und eine Seite, die mit einer
 *    leeren Fläche beginnt, wirkt nicht ruhig, sondern unfertig.
 *
 * 2. Das Bild sitzt ab lg absolut an der rechten Fensterkante statt in einer
 *    Rasterspalte. Das ist der Unterschied zwischen einer Seite aus zwei
 *    gleich großen Kästen und einer, die eine Richtung hat. Die zweite
 *    Rasterspalte bleibt leer stehen und hält den Platz frei, damit der Text
 *    nicht unter das Bild läuft: ein absolut gesetztes Element nimmt am
 *    Raster nicht mehr teil.
 *
 * 3. Über der unteren Bildkante liegt eine Glaskarte mit der Zahl, die den
 *    Auftraggeber am unmittelbarsten angeht. Die Überlappung ist der Grund
 *    für die Karte: zwei Elemente, die sich überschneiden, erzeugen Tiefe,
 *    zwei Elemente nebeneinander erzeugen ein Formular.
 *
 * KEIN overflow-hidden auf der Sektion. Die Eintrittsbewegung verschiebt
 * Inhalt um einige Pixel, ein beschnittener Container kappt genau die.
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

  /* Etiketten unter der Schlagzeile. Der mittlere hängt am selben Schalter
     wie die zugehörige Zusage weiter unten: was in site.config nicht als
     belegt markiert ist, wird auch hier nicht behauptet. */
  const chips = [
    ...(claims.fixedContact ? [t(home.heroChipTeams, locale)] : []),
    ...(claims.documentedVisits ? [t(home.heroChipLog, locale)] : []),
    t(home.heroChipTax, locale),
  ];

  return (
    <section className="relative isolate pt-10 pb-10 md:pt-16 md:pb-16">
      {/* Farbfeld. Läuft oben unter die durchsichtige Kopfzeile und endet
          weich, damit keine sichtbare Kante zur nächsten Sektion entsteht. */}
      <div
        aria-hidden
        className="u-mesh absolute inset-x-0 -top-[68px] -z-10 h-[560px] md:h-[760px] lg:h-[920px]"
        style={{
          maskImage: "linear-gradient(to bottom, black 62%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent)",
        }}
      />

      <div className="relative">
        <div className="u-shell">
          <div className="grid items-center lg:grid-cols-[1fr_0.86fr] lg:gap-16">
            <Reveal className="lg:py-14">
              {/* Dasselbe Etikettenmuster wie in jeder Sektion darunter:
                  Punkt, Versalien, Akzentfarbe. */}
              <p className="u-label flex items-center gap-2 text-accent">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {t(home.heroEyebrow, locale)}
              </p>

              {/* clamp statt drei Breakpoint-Stufen: die Schlagzeile wächst
                  stufenlos mit dem Fenster und kippt nie zwischen zwei
                  Größen. */}
              <h1 className="mt-6 text-[clamp(2.75rem,5.8vw,4.9rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance text-ink">
                {t(home.heroTitle, locale)}
              </h1>

              <p className="mt-6 max-w-[34ch] text-[19px] leading-snug font-medium text-muted md:text-[22px]">
                {t(home.heroText, locale)}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li key={chip} className="u-chip">
                    <CheckIcon size={13} weight="bold" aria-hidden />
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-3">
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
        <div className="relative mt-12 px-5 md:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[46vw] lg:px-0">
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
            className="u-drift u-tone lg:rounded-tr-none lg:rounded-br-none"
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            brief=""
          />

          {/* Die Karte liegt über der unteren Bildkante und ragt links
              heraus. Auf dem Telefon säße sie sonst über der Person im
              Bild, deshalb rückt sie dort an den unteren Rand. */}
          <div className="u-glass absolute bottom-4 left-8 w-[13.5rem] rounded-[18px] px-5 py-4 md:bottom-7 md:left-12 md:w-[15rem] lg:bottom-14 lg:-left-8">
            <p className="u-label">{t(home.taxEyebrow, locale)}</p>
            <p className="u-data mt-2 text-[34px] leading-none font-semibold text-accent md:text-[42px]">
              20&thinsp;%
            </p>
            <p className="mt-2.5 text-[13px] leading-snug text-muted">
              {locale === "de"
                ? "der Arbeitskosten für Privatkunden absetzbar"
                : "of labour costs deductible for private clients"}
            </p>
          </div>
        </div>
      </div>

      {/* Kennwerte statt eines einzelnen Satzes über das Einsatzgebiet.
          Drei nüchterne Angaben geben der Seite den Ton eines Betriebs und
          nicht den einer Broschüre.

          Jeder Wert ist belegbar: die Anzahl ist aus dem Leistungskatalog
          gezählt, das Gebiet steht in der Konfiguration, und der feste
          Ansprechpartner erscheint nur, solange claims.fixedContact gesetzt
          ist. Damit kann hier keine Zusage stehen, die nicht auch in
          site.config als zutreffend markiert wurde.

          Der senkrechte Strich in Akzentfarbe ersetzt die frühere Hairline
          über der ganzen Zeile: er bindet den Wert an sein Etikett, statt
          drei Angaben unter einer gemeinsamen Linie aufzureihen. */}
      <div className="u-shell">
        <Reveal className="mt-14 md:mt-20">
          <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {specs.map((spec) => (
              <div key={spec.label} className="border-l-2 border-accent/35 pl-4">
                <dt className="u-label">{spec.label}</dt>
                <dd className="u-data mt-2.5 text-[19px] leading-snug font-medium text-ink">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
