import type { Metadata } from "next";
import { CheckIcon, Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactBand } from "@/components/home/contact-band";
import { servicePackages } from "@/content/services";
import { about, meta, nav } from "@/content/copy";
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
      <PageHeader
        eyebrow={t(nav.leistungen, locale)}
        title={locale === "de" ? "Leistungen" : "Services"}
        lead={
          locale === "de"
            ? "Fünf Bereiche, frei kombinierbar. Jede Position wird im Angebot einzeln benannt, damit auf der Rechnung später nichts steht, das niemand bestellt hat."
            : "Five areas, freely combined. Every item is named separately in the quotation, so nothing appears on the invoice that nobody ordered."
        }
      >
        {/* Sprungmarken statt einer weiteren Absatzzeile.

            Die Seite ist lang, und die fünf Bereiche standen bisher erst
            nach mehrmaligem Scrollen fest. Als Leiste sind sie zugleich
            Inhaltsverzeichnis und die erste Grafik der Seite: fünf
            Symbole zeigen den Umfang schneller als der Vorspann darüber. */}
        <Reveal className="mt-10">
          <nav aria-label={locale === "de" ? "Leistungsbereiche" : "Service areas"}>
            <ul className="flex flex-wrap gap-2.5">
              {servicePackages.map((pack) => (
                <li key={pack.id}>
                  <a
                    href={`#${pack.id}`}
                    className="u-lift inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface py-2 pr-5 pl-2 text-[15px] font-medium text-ink"
                  >
                    <span className="u-tile u-tile-soft size-8 rounded-full">
                      <Icon name={pack.icon} size={17} />
                    </span>
                    {t(pack.title, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </PageHeader>

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
                  <span className="u-tile u-tile-lg">
                    <Icon name={pack.icon} size={28} />
                  </span>
                  <h2 className="mt-6 text-[28px] font-semibold tracking-tight text-ink md:text-[34px]">
                    {t(pack.title, locale)}
                  </h2>
                  <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-muted md:text-[17px]">
                    {t(pack.summary, locale)}
                  </p>
                </div>

                {/* Häkchen vor jeder Position. Ohne Marke steht hier eine
                    zweispaltige Textwand, in der keine Zeile als eigene
                    Leistung erkennbar ist. */}
                <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2 md:pt-2">
                  {pack.items.map((item) => (
                    <li
                      key={item.de}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-ink md:text-[16px]"
                    >
                      <CheckIcon
                        size={16}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-accent"
                      />
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
          <div className="u-panel max-w-[68ch] p-7 md:p-9">
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
