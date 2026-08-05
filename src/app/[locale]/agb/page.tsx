import type { Metadata } from "next";
import { LegalLayout, LegalSections } from "@/components/legal-layout";
import {
  legalLabels,
  termsIntro,
  termsSections,
  withdrawalIntro,
  withdrawalSections,
} from "@/content/legal";
import { contact, legal } from "@/content/site.config";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(legalLabels.termsTitle, locale),
    alternates: { canonical: `/${locale}/agb` },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);

  const values = {
    legalName: legal.legalName,
    address: `${contact.street}, ${contact.postalCode} ${contact.city}`,
    email: contact.email,
  };

  return (
    <LegalLayout
      locale={locale}
      title={t(legalLabels.termsTitle, locale)}
      intro={t(termsIntro, locale)}
    >
      <LegalSections locale={locale} sections={termsSections} values={values} />

      <div className="mt-16 border-t border-hairline pt-10">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink">
          {t(legalLabels.withdrawalTitle, locale)}
        </h2>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-muted">
          {t(withdrawalIntro, locale)}
        </p>

        <div className="mt-8">
          <LegalSections locale={locale} sections={withdrawalSections} values={values} />
        </div>
      </div>
    </LegalLayout>
  );
}
