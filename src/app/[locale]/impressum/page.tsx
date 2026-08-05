import type { Metadata } from "next";
import { LegalLayout, LegalRow } from "@/components/legal-layout";
import { legalLabels } from "@/content/legal";
import { contact, legal } from "@/content/site.config";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(legalLabels.impressumTitle, locale),
    alternates: { canonical: `/${locale}/impressum` },
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const showRegister = Boolean(legal.registerCourt && legal.registerNumber);
  const showRepresented = legal.entityType !== "sole" && Boolean(legal.managingDirector);
  const showChamber = Boolean(legal.chamber);

  return (
    <LegalLayout
      locale={locale}
      title={t(legalLabels.impressumTitle, locale)}
      subtitle={t(legalLabels.impressumSub, locale)}
    >
      <dl className="border-b border-hairline">
        <LegalRow label={t(legalLabels.provider, locale)}>
          {legal.legalName}
          <br />
          {contact.street}
          <br />
          {contact.postalCode} {contact.city}
          <br />
          {t(contact.country, locale)}
        </LegalRow>

        {showRepresented ? (
          <LegalRow label={t(legalLabels.represented, locale)}>{legal.managingDirector}</LegalRow>
        ) : null}

        {showRegister ? (
          <LegalRow label={t(legalLabels.register, locale)}>
            {legal.registerCourt}
            <br />
            {legal.registerNumber}
          </LegalRow>
        ) : null}

        <LegalRow label={t(legalLabels.contactLabel, locale)}>
          <a href={contact.phoneHref} className="hover:text-ink">
            {contact.phone}
          </a>
          <br />
          <a href={`mailto:${contact.email}`} className="hover:text-ink">
            {contact.email}
          </a>
        </LegalRow>

        <LegalRow label={t(legalLabels.vat, locale)}>
          {legal.vatId ? legal.vatId : t(legalLabels.vatNote, locale)}
        </LegalRow>

        {showChamber ? (
          <>
            <LegalRow label={t(legalLabels.chamberLabel, locale)}>{legal.chamber}</LegalRow>
            <LegalRow label={t(legalLabels.professionLabel, locale)}>
              {legal.professionalTitle}
              <br />
              {locale === "de" ? "Verliehen in" : "Granted in"}: {t(legal.titleGrantedIn, locale)}
            </LegalRow>
            <LegalRow label={t(legalLabels.professionRules, locale)}>
              {t(legalLabels.professionRulesValue, locale)}
            </LegalRow>
          </>
        ) : null}

        <LegalRow label={t(legalLabels.hostingLabel, locale)}>{legal.hostingProvider}</LegalRow>

        <LegalRow label={t(legalLabels.disputeLabel, locale)}>
          {t(legalLabels.disputeNo, locale)}
        </LegalRow>
      </dl>

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-ink">
            {t(legalLabels.liabilityContentLabel, locale)}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {t(legalLabels.liabilityContent, locale)}
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-ink">
            {t(legalLabels.liabilityLinksLabel, locale)}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {t(legalLabels.liabilityLinks, locale)}
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-semibold tracking-tight text-ink">
            {t(legalLabels.copyrightLabel, locale)}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {t(legalLabels.copyright, locale)}
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
