import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ContactBand } from "@/components/home/contact-band";
import { servicePackages } from "@/content/services";
import { about, meta } from "@/content/copy";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(meta.servicesTitle, locale),
    description: t(meta.servicesDescription, locale),
    alternates: { canonical: `/${locale}/leistungen` },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <>
      <section className="u-shell pt-14 pb-16 md:pt-24 md:pb-20">
        <Reveal>
          <h1 className="max-w-[18ch] text-[40px] leading-[1.07] font-semibold tracking-tight text-balance text-ink md:text-[56px]">
            {locale === "de" ? "Leistungen" : "Services"}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted md:text-xl">
            {locale === "de"
              ? "Fünf Bereiche, frei kombinierbar. Jede Position wird im Angebot einzeln benannt, damit auf der Rechnung später nichts steht, das niemand bestellt hat."
              : "Five areas, freely combined. Every item is named separately in the quotation, so nothing appears on the invoice that nobody ordered."}
          </p>
        </Reveal>
      </section>

      {servicePackages.map((pack, index) => (
        <section
          key={pack.id}
          id={pack.id}
          className={`${index % 2 === 1 ? "bg-sunken" : ""} scroll-mt-20 py-16 md:py-20`}
        >
          <div className="u-shell">
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
                <div>
                  <Icon name={pack.icon} size={26} className="text-accent" />
                  <h2 className="mt-5 text-[28px] font-semibold tracking-tight text-ink md:text-[34px]">
                    {t(pack.title, locale)}
                  </h2>
                  <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
                    {t(pack.summary, locale)}
                  </p>
                </div>

                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 md:pt-1">
                  {pack.items.map((item) => (
                    <li
                      key={item.de}
                      className="text-[15px] leading-relaxed text-ink md:text-[16px]"
                    >
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="u-shell py-16 md:py-20">
        <Reveal>
          <div className="max-w-[68ch] border-t border-hairline pt-8">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {t(about.bodyTitleB, locale)}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{t(about.bodyB, locale)}</p>
          </div>
        </Reveal>
      </section>

      <ContactBand locale={locale} />
    </>
  );
}
