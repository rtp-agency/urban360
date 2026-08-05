import type { Metadata } from "next";
import { LegalLayout, LegalSections } from "@/components/legal-layout";
import { legalLabels, privacyIntro, privacySections } from "@/content/legal";
import { legal } from "@/content/site.config";
import { resolveLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: t(legalLabels.privacyTitle, locale),
    alternates: { canonical: `/${locale}/datenschutz` },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <LegalLayout
      locale={locale}
      title={t(legalLabels.privacyTitle, locale)}
      intro={t(privacyIntro, locale)}
    >
      <LegalSections
        locale={locale}
        sections={privacySections}
        values={{
          authority: legal.dataProtectionAuthority,
          reviewed: legal.lastReviewed,
        }}
      />
    </LegalLayout>
  );
}
