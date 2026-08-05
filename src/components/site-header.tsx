"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { LOCALES, site, type Locale } from "@/content/site.config";
import { nav } from "@/content/copy";
import { href, t } from "@/lib/i18n";

const items = [
  { key: "leistungen", path: "leistungen" },
  { key: "ablauf", path: "#ablauf" },
  { key: "ueber", path: "ueber-uns" },
  { key: "kontakt", path: "kontakt" },
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  /* Der Scrollwert läuft über einen Motion Value, nicht über einen
     Scroll-Listener mit State. Nur der Wechsel des Schwellwerts löst ein
     Rendern aus, nicht jedes einzelne Scrollereignis. */
  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 12;
    setLifted((prev) => (prev === next ? prev : next));
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkFor = (path: string) => (path.startsWith("#") ? `${href(locale)}${path}` : href(locale, path));

  /** Gleicher Pfad, andere Sprache. */
  const swapLocale = (target: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return href(target, rest);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          lifted
            ? "border-hairline bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="u-shell flex h-[68px] items-center justify-between gap-6">
          <Link
            href={href(locale)}
            className="text-[17px] font-semibold tracking-tight text-ink"
            aria-label={site.name}
          >
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {items.map((item) => (
              <Link
                key={item.key}
                href={linkFor(item.path)}
                className="text-[15px] text-muted transition-colors duration-200 hover:text-ink"
              >
                {t(nav[item.key], locale)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="hidden items-center rounded-full border border-hairline p-0.5 sm:flex"
              role="group"
              aria-label={t(nav.langLabel, locale)}
            >
              {LOCALES.map((code) => (
                <Link
                  key={code}
                  href={swapLocale(code)}
                  hrefLang={code}
                  aria-current={code === locale ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors duration-200 ${
                    code === locale ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                  }`}
                >
                  {code}
                </Link>
              ))}
            </div>

            <Link
              href={href(locale, "kontakt")}
              className="hidden h-10 items-center rounded-full bg-accent px-5 text-[15px] font-medium whitespace-nowrap text-accent-ink transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] md:inline-flex"
            >
              {t(nav.cta, locale)}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={t(open ? nav.menuClose : nav.menuOpen, locale)}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-ink lg:hidden"
            >
              {open ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-hairline bg-canvas lg:hidden"
          >
            <div className="u-shell flex flex-col py-4">
              {items.map((item) => (
                <Link
                  key={item.key}
                  href={linkFor(item.path)}
                  className="border-b border-hairline py-3.5 text-[17px] text-ink last:border-0"
                >
                  {t(nav[item.key], locale)}
                </Link>
              ))}

              <Link
                href={href(locale, "kontakt")}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-accent text-base font-medium text-accent-ink"
              >
                {t(nav.cta, locale)}
              </Link>

              <div className="mt-4 flex items-center gap-2 sm:hidden">
                {LOCALES.map((code) => (
                  <Link
                    key={code}
                    href={swapLocale(code)}
                    hrefLang={code}
                    className={`rounded-full border border-hairline px-3 py-1.5 text-xs font-medium uppercase ${
                      code === locale ? "bg-ink text-canvas" : "text-muted"
                    }`}
                  >
                    {code}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
