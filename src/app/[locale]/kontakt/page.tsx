import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contactPage, meta, nav } from "@/content/copy";
import { contact } from "@/content/site.config";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(nav.kontakt, locale),
    description: t(meta.contactDescription, locale),
    alternates: { canonical: `/${locale}/kontakt` },
  };
}

export default async function ContactPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  const rows = [
    {
      label: t(contactPage.hoursLabel, locale),
      value: t(contact.hours, locale),
    },
    {
      label: t(contactPage.areaLabel, locale),
      value: t(contact.serviceArea, locale),
    },
  ];

  return (
    <section className="u-shell pt-14 pb-24 md:pt-24 md:pb-28">
      <Reveal>
        <h1 className="text-[40px] leading-[1.07] font-semibold tracking-tight text-ink md:text-[56px]">
          {t(contactPage.title, locale)}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted md:text-xl">
          {t(contactPage.lead, locale)}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <Reveal>
          <ContactForm locale={locale} />
        </Reveal>

        <Reveal>
          <div className="border-t border-hairline pt-6 lg:border-t-0 lg:pt-0">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {t(contactPage.directTitle, locale)}
            </h2>

            <div className="mt-5 space-y-1.5 text-[16px] text-ink">
              <p>
                <a href={contact.phoneHref} className="transition-opacity hover:opacity-70">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-opacity hover:opacity-70"
                >
                  {contact.email}
                </a>
              </p>
            </div>

            <address className="mt-6 text-[16px] leading-relaxed not-italic text-muted">
              {contact.street}
              <br />
              {contact.postalCode} {contact.city}
              <br />
              {t(contact.country, locale)}
            </address>

            <dl className="mt-8 space-y-5">
              {rows.map((row) => (
                <div key={row.label} className="border-t border-hairline pt-4">
                  <dt className="text-[13px] font-medium text-ink">{row.label}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-muted">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
