import { notFound } from "next/navigation";
import { isAppLocale } from "@/content/recruiting";
import { tr, ui } from "@/content/application";
import { ApplicationForm } from "./application-form";

export default async function JobPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isAppLocale(lang)) notFound();

  return (
    <>
      <h1 className="text-[30px] leading-[1.12] font-semibold tracking-tight text-balance text-ink">
        {tr(ui.pageTitle, lang)}
      </h1>
      <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-muted">
        {tr(ui.intro, lang)}
      </p>

      <div className="mt-10">
        <ApplicationForm locale={lang} />
      </div>
    </>
  );
}
