import { ButtonLink, TextLink } from "@/components/ui";
import { Figure } from "@/components/figure";
import { Reveal } from "@/components/reveal";
import { home, nav } from "@/content/copy";
import { contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
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

        <Reveal delay={0.08}>
          <Figure
            ratio="4 / 5"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            brief={
              locale === "de"
                ? "Bildplatz Titel: Mitarbeitende in Arbeitskleidung vor einem gepflegten Mehrfamilienhaus, Hochformat 4:5, mindestens 1600 x 2000 px."
                : "Hero image slot: staff in workwear in front of a well kept apartment building, portrait 4:5, at least 1600 x 2000 px."
            }
          />
        </Reveal>
      </div>

      <Reveal
        delay={0.16}
        className="u-rule mt-16 flex flex-col gap-2 pt-6 md:mt-20 md:flex-row md:items-baseline md:justify-between"
      >
        <p className="text-[15px] text-muted">
          {locale === "de" ? "Einsatzgebiet" : "Service area"}: {t(contact.serviceArea, locale)}
        </p>
        <TextLink href={href(locale, "kontakt")}>
          {locale === "de" ? "Objekt anfragen" : "Ask about your property"}
        </TextLink>
      </Reveal>
    </section>
  );
}
