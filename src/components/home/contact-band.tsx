import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { home, nav } from "@/content/copy";
import { contact, type Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";

export function ContactBand({ locale }: { locale: Locale }) {
  return (
    <section className="u-rule">
      <div className="u-shell py-20 md:py-28">
        <Reveal className="mx-auto max-w-[54ch] text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink md:text-[42px] md:leading-[1.1]">
            {t(home.contactTitle, locale)}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            {t(home.contactText, locale)}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={href(locale, "kontakt")} large>
              {t(nav.cta, locale)}
            </ButtonLink>
            <a
              href={contact.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-full border border-hairline bg-surface px-7 text-base font-medium whitespace-nowrap text-ink transition-colors duration-200 hover:bg-sunken active:scale-[0.98]"
            >
              {contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
