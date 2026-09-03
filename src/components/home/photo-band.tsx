import Image from "next/image";
import { CheckIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
import { home, nav } from "@/content/copy";
import { claims, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

/**
 * Bildband über die volle Fensterbreite.
 *
 * Es steht zwischen zwei Kachelsektionen und hat genau eine Aufgabe: den
 * Takt brechen. Vorher folgten auf der Startseite sechs Blöcke aufeinander,
 * die alle gleich gebaut waren, Überschrift links und Raster darunter. Ein
 * randloses Foto ist der einzige Wechsel, der ohne zusätzlichen Text
 * auskommt.
 *
 * Der Text liegt auf einem Verlauf, nicht direkt auf dem Foto. Ohne den
 * Verlauf hängt die Lesbarkeit vom Bildausschnitt ab, und der ändert sich
 * mit jeder Fensterbreite. Der Verlauf ist gerichtet und lässt die rechte
 * Bildhälfte offen, damit vom Fahrzeug etwas übrig bleibt.
 *
 * Volle Breite ohne 100vw: 100vw zählt auf Windows die Bildlaufleiste mit
 * und erzeugt ein waagerechtes Scrollen. Der Rand wird stattdessen über
 * negative Außenabstände aus der Hülle gezogen, dafür sitzt die Sektion
 * bewusst NICHT in <Section>.
 */
export function PhotoBand({ locale }: { locale: Locale }) {
  const facts = [
    ...(claims.fixedContact
      ? [locale === "de" ? "Ein Ansprechpartner" : "One named contact"]
      : []),
    ...(claims.documentedVisits
      ? [locale === "de" ? "Nachweis je Einsatz" : "A record per visit"]
      : []),
    locale === "de" ? "Feste Termine" : "Fixed dates",
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[26rem] md:min-h-[32rem] lg:min-h-[36rem]">
        <Image
          src="/images/team-fahrzeug.jpg"
          alt={
            locale === "de"
              ? "Einsatzfahrzeug mit geöffneten Hecktüren vor einem Wohnhaus, daneben Rasenmäher, Besen, Eimer und Leiter."
              : "A service van with its rear doors open in front of an apartment building, next to a mower, brooms, buckets and a ladder."
          }
          fill
          sizes="100vw"
          className="object-cover object-[60%_60%]"
        />

        {/* Zwei Verläufe: einer waagerecht für die Lesbarkeit der Textseite,
            einer senkrecht, damit die Kanten oben und unten nicht hart auf
            die angrenzenden Sektionen stoßen. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(100deg, var(--color-statement) 8%, color-mix(in oklab, var(--color-statement) 82%, transparent) 42%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, color-mix(in oklab, var(--color-statement) 55%, transparent), transparent 45%)",
          }}
        />

        <div className="u-shell relative flex min-h-[26rem] items-center py-16 md:min-h-[32rem] md:py-20 lg:min-h-[36rem]">
          <div className="max-w-[34ch]">
            <p className="u-label !text-statement-ink/60">{t(home.bandEyebrow, locale)}</p>

            <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance text-statement-ink">
              {t(home.bandTitle, locale)}
            </h2>

            <p className="mt-5 text-[16px] leading-relaxed text-statement-ink/75 md:text-[17px]">
              {t(home.bandText, locale)}
            </p>

            {/* Jede Angabe bekommt ihr eigenes Häkchen. Nebeneinander
                gesetzte Versalienzeilen ohne Marke laufen beim Umbruch
                ineinander und lesen sich als ein einziger Satz. */}
            <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="u-label flex items-center gap-2 !text-statement-ink/75"
                >
                  <CheckIcon size={13} weight="bold" aria-hidden className="text-accent" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ButtonLink href={href(locale, "kontakt")} large>
                {t(nav.cta, locale)}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
