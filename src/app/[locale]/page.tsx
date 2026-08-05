import { Hero } from "@/components/home/hero";
import { SegmentsList } from "@/components/home/segments-list";
import { ServicesGrid } from "@/components/home/services-grid";
import { ProcessRail } from "@/components/home/process-rail";
import { TaxPanel } from "@/components/home/tax-panel";
import { Assurance } from "@/components/home/assurance";
import { ContactBand } from "@/components/home/contact-band";
import { resolveLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);

  return (
    <>
      <Hero locale={locale} />
      <SegmentsList locale={locale} />
      <ServicesGrid locale={locale} />
      <ProcessRail locale={locale} />
      <TaxPanel locale={locale} />
      <Assurance locale={locale} />
      <ContactBand locale={locale} />
    </>
  );
}
