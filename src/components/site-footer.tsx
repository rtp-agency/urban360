import Link from "next/link";
import { contact, legal, site, type Locale } from "@/content/site.config";
import { footer, nav } from "@/content/copy";
import { href, t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = 2026;

  const company = [
    { label: t(nav.leistungen, locale), path: "leistungen" },
    { label: t(nav.ueber, locale), path: "ueber-uns" },
    { label: t(nav.kontakt, locale), path: "kontakt" },
  ];

  const legalLinks = [
    { label: t(footer.impressum, locale), path: "impressum" },
    { label: t(footer.privacy, locale), path: "datenschutz" },
    { label: t(footer.terms, locale), path: "agb" },
  ];

  return (
    <footer className="u-rule bg-canvas">
      <div className="u-shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-tight text-ink">{site.name}</p>
            <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-muted">
              {t(site.tagline, locale)}
            </p>
          </div>

          <nav aria-label={t(footer.companyHeading, locale)}>
            <p className="text-[13px] font-medium text-ink">{t(footer.companyHeading, locale)}</p>
            <ul className="mt-3 space-y-2">
              {company.map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(locale, item.path)}
                    className="text-[15px] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t(footer.legalHeading, locale)}>
            <p className="text-[13px] font-medium text-ink">{t(footer.legalHeading, locale)}</p>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(locale, item.path)}
                    className="text-[15px] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] font-medium text-ink">{t(footer.contactHeading, locale)}</p>
            <address className="mt-3 space-y-2 text-[15px] not-italic text-muted">
              <p>
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}
              </p>
              <p>
                <a
                  href={contact.phoneHref}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {contact.phone}
                </a>
                <br />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="u-rule mt-12 flex flex-col gap-4 pt-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[62ch] text-[13px] leading-relaxed text-muted">
            {t(footer.cookieNote, locale)}
          </p>
          <p className="text-[13px] whitespace-nowrap text-muted">
            © {year} {legal.legalName}. {t(footer.rights, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
