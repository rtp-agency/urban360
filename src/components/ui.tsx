import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/**
 * Buttons sind vollrund, Flächen 22px, Eingaben 14px. Diese Zuordnung
 * gilt auf jeder Seite. Neue Elemente greifen eine dieser drei Formen auf,
 * sie erfinden keine vierte.
 */
const shapes = {
  base:
    "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
    "whitespace-nowrap transition-[transform,background-color,border-color,color] " +
    "duration-200 ease-[var(--ease-out-soft)] active:scale-[0.98]",
  size: "h-11 px-6 text-[15px]",
  sizeLarge: "h-12 px-7 text-base",
};

const tones = {
  /* Kontrast geprüft: Weiß auf #0f6b4f liegt über 7:1, im Dark Mode
     #06231a auf #3fbc90 ebenfalls. Beide erfüllen WCAG AA und AAA. */
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "border border-hairline bg-surface text-ink hover:bg-sunken",
  quiet: "text-accent hover:opacity-70 px-0 h-auto",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  large?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  tone = "primary",
  large = false,
  className = "",
}: ButtonLinkProps) {
  const size = tone === "quiet" ? "" : large ? shapes.sizeLarge : shapes.size;
  return (
    <Link href={href} className={`${shapes.base} ${size} ${tones[tone]} ${className}`}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[15px] font-medium text-accent transition-opacity duration-200 hover:opacity-70 ${className}`}
    >
      {children}
      <ArrowRightIcon
        size={16}
        weight="bold"
        aria-hidden
        className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/**
 * Sektionskopf. Überschrift und Fließtext stehen untereinander, nicht
 * nebeneinander: ein kleiner Absatz, der rechts oben neben einer großen
 * Headline schwebt, ist eine Layoutmarotte ohne Funktion.
 */
export function SectionHead({
  title,
  text,
  className = "",
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[42ch] ${className}`}>
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[42px] md:leading-[1.08]">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-[17px] leading-relaxed text-muted md:text-lg">{text}</p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "canvas",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "sunken";
}) {
  return (
    <section
      id={id}
      className={`${tone === "sunken" ? "bg-sunken" : ""} py-20 md:py-28 ${className}`}
    >
      <div className="u-shell">{children}</div>
    </section>
  );
}
