import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Kopf einer Unterseite.
 *
 * Alle Unterseiten begannen vorher mit einer weißen Fläche, einer Zeile
 * Überschrift und einem Absatz. Damit sah der Einstieg jeder Seite aus wie
 * das Ende der vorigen: es gab kein Signal, dass hier etwas Neues anfängt.
 *
 * Der Kopf trägt deshalb dasselbe Farbfeld wie die Startseite. Das ist der
 * einzige gemeinsame Baustein, der eine Seite ohne zusätzlichen Inhalt als
 * zu dieser Website gehörig ausweist.
 *
 * Das Feld liegt hinter dem Inhalt und ist rein dekorativ. Es endet weich
 * über eine Maske, damit keine sichtbare Kante zur ersten Sektion entsteht,
 * und es reicht unter die durchsichtige Kopfzeile.
 */
export function PageHeader({
  title,
  lead,
  eyebrow,
  children,
  className = "",
}: {
  title: string;
  lead?: string;
  /** Kurzes Etikett über der Überschrift. */
  eyebrow?: string;
  /** Zusätzlicher Inhalt unter dem Vorspann, etwa eine Sprungmarkenleiste. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate pt-14 pb-14 md:pt-20 md:pb-16 ${className}`}>
      <div
        aria-hidden
        className="u-mesh absolute inset-x-0 -top-[68px] -z-10 h-[420px] md:h-[520px]"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent)",
        }}
      />

      <div className="u-shell">
        <Reveal>
          {eyebrow ? (
            <p className="u-label mb-5 flex items-center gap-2 text-accent">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className="max-w-[20ch] text-[clamp(2.5rem,4.8vw,3.6rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-balance text-ink">
            {title}
          </h1>

          {lead ? (
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted md:text-xl">
              {lead}
            </p>
          ) : null}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
