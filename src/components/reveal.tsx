import type { CSSProperties, ReactNode } from "react";

/**
 * Eintrittsbewegung beim Scrollen.
 *
 * Bewusst ohne JavaScript gelöst, über eine CSS-Scroll-Timeline.
 * Der Grund ist nicht Performance, sondern Robustheit: eine Umsetzung mit
 * initial={{ opacity: 0 }} schreibt den unsichtbaren Zustand ins gerenderte
 * HTML. Lädt das Skript nicht, ist alles unterhalb des ersten Bildschirms
 * dauerhaft leer. Hier ist der Standardzustand sichtbar, die Bewegung kommt
 * nur dort dazu, wo der Browser sie unterstützt.
 *
 * Sie hat genau eine Aufgabe: die Lesereihenfolge einer Sektion zu markieren.
 * Deshalb bewegt sich nur ein kurzes Stück und nur einmal. Keine Dauerschleifen,
 * kein Parallax, kein Scroll-Hijack. Bei prefers-reduced-motion entfällt sie.
 */
export function Reveal({
  children,
  /** Staffelung. Wird als Scrollversatz in Pixeln umgesetzt. */
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const style = delay
    ? ({ "--u-reveal-delay": `${Math.round(delay * 640)}px` } as CSSProperties)
    : undefined;

  return (
    <div className={`u-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
