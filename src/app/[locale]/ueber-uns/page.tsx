import type { Metadata } from "next";
import { Figure } from "@/components/figure";
import { Reveal } from "@/components/reveal";
import { ContactBand } from "@/components/home/contact-band";
import { about, meta } from "@/content/copy";
import { contact } from "@/content/site.config";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(meta.aboutTitle, locale),
    description: t(meta.aboutDescription, locale),
    alternates: { canonical: `/${locale}/ueber-uns` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);

  const blocks = [
    { title: t(about.bodyTitleA, locale), text: t(about.bodyA, locale) },
    { title: t(about.bodyTitleB, locale), text: t(about.bodyB, locale) },
    { title: t(about.bodyTitleC, locale), text: t(about.bodyC, locale) },
  ];

  return (
    <>
      <section className="u-shell pt-14 pb-16 md:pt-24 md:pb-20">
        <Reveal>
          <h1 className="max-w-[20ch] text-[40px] leading-[1.07] font-semibold tracking-tight text-balance text-ink md:text-[56px]">
            {t(about.title, locale)}
          </h1>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted md:text-xl">
            {t(about.lead, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <Figure
            ratio="21 / 9"
            sizes="100vw"
            brief={
              locale === "de"
                ? "Bildplatz: Team vor dem Servicefahrzeug oder bei der Arbeit an einem Objekt, Panoramaformat 21:9, mindestens 2100 x 900 px. Abgebildete Personen müssen schriftlich eingewilligt haben."
                : "Image slot: the team by the service vehicle or working on a property, panorama 21:9, at least 2100 x 900 px. Anyone shown must have given written consent."
            }
          />
        </Reveal>
      </section>

      <section className="u-shell pb-16 md:pb-20">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 0.06}>
              <div className="border-t border-hairline pt-6">
                <h2 className="text-xl font-semibold tracking-tight text-ink">{block.title}</h2>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-muted">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <div className="border-t border-hairline pt-6">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                {locale === "de" ? "Einsatzgebiet" : "Service area"}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-muted">
                {t(contact.serviceArea, locale)}.{" "}
                {locale === "de"
                  ? "Objekte außerhalb dieses Gebiets nehmen wir an, wenn die Anfahrt zum Turnus passt. Fragen Sie einfach."
                  : "We take on properties outside this area when the journey fits the schedule. Just ask."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand locale={locale} />
    </>
  );
}
