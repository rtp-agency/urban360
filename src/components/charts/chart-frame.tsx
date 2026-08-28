import type { ReactNode } from "react";

/**
 * Rahmen für jede Grafik auf der Seite.
 *
 * Bewusst ein <figure> mit <figcaption> und nicht ein weiteres <div>: eine
 * Grafik ist ein eigenständiger Inhalt mit Beschriftung, und Screenreader
 * kündigen sie dann als solche an.
 *
 * Aufbau immer gleich, damit die Grafiken untereinander vergleichbar sind:
 * Etikett, Titel, Fläche, darunter die Fußnote. Die Fußnote ist Pflicht, wo
 * eine Zahl aus dem Gesetz stammt oder ein Beispiel gerechnet wird: eine
 * Grafik ohne Herkunft der Zahlen ist eine Behauptung.
 */
export function ChartFrame({
  label,
  title,
  note,
  children,
  className = "",
}: {
  label: string;
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`u-chart u-grain p-5 md:p-7 ${className}`}>
      <figcaption>
        <p className="u-label">{label}</p>
        <h3 className="mt-3 max-w-[30ch] text-lg font-semibold tracking-tight text-balance text-ink md:text-xl">
          {title}
        </h3>
      </figcaption>

      <div className="mt-7">{children}</div>

      {note ? (
        <p className="mt-6 border-t border-hairline pt-4 text-[13px] leading-relaxed text-muted">
          {note}
        </p>
      ) : null}
    </figure>
  );
}
