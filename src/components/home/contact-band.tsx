import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { home, nav } from "@/content/copy";
import { contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

/**
 * Schlussblock.
 *
 * Als einzige Sektion der Seite auf dunklem Grund. Das ist eine Entscheidung
 * und kein Ausrutscher: nach sieben hellen Flächen braucht die Aufforderung
 * einen Bruch, sonst scrollt man an ihr vorbei wie an allem davor.
 *
 * Die Fläche ist in beiden Modi dunkel. Ein Band, das im Dunkelmodus nach
 * Weiß kippt, wäre mitten in einer ruhigen Seite ein Blitz. Die Tokens dafür
 * stehen in globals.css.
 */
export function ContactBand({ locale }: { locale: Locale }) {
  return (
    <section className="u-grain relative bg-statement text-statement-ink">
      <div className="u-shell py-24 md:py-32">
        <Reveal className="mx-auto max-w-[58ch] text-center">
          <p className="u-label !text-statement-ink/55">
            {locale === "de" ? "Nächster Schritt" : "Next step"}
          </p>

          <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance">
            {t(home.contactTitle, locale)}
          </h2>

          <p className="mx-auto mt-6 max-w-[46ch] text-[17px] leading-relaxed text-statement-ink/70">
            {t(home.contactText, locale)}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={href(locale, "kontakt")} large>
              {t(nav.cta, locale)}
            </ButtonLink>

            {/* Die Rufnummer bekommt auf dunklem Grund eine eigene Fassung.
                Die Variante "secondary" zieht ihre Farben aus den Flächen-
                tokens der hellen Seite und wäre hier unlesbar. */}
            <a
              href={contact.phoneHref}
              className="u-data inline-flex h-12 items-center justify-center rounded-full border border-statement-ink/25 px-7 text-base font-medium whitespace-nowrap text-statement-ink transition-colors duration-200 hover:bg-statement-ink/10 active:scale-[0.98]"
            >
              {contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
