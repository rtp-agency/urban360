import type { ReactNode } from "react";

/**
 * Eintrittsbewegung beim Scrollen.
 *
 * Ohne JavaScript gelöst, über eine CSS-Scroll-Timeline. Der Grund ist
 * Robustheit: eine Umsetzung mit initial={{ opacity: 0 }} schreibt den
 * unsichtbaren Zustand ins gerenderte HTML. Lädt das Skript nicht, bleibt
 * alles unterhalb des ersten Bildschirms dauerhaft leer. Hier ist der
 * Standardzustand sichtbar, die Bewegung kommt nur dort dazu, wo der
 * Browser sie unterstützt.
 *
 * BEWUSST OHNE STAFFELUNG.
 * Jedes Element hat seine eigene Timeline, die an seiner eigenen Position
 * hängt. Untereinander stehende Blöcke staffeln sich dadurch von selbst,
 * weil sie nacheinander in den Sichtbereich kommen. Ein zusätzlicher
 * Versatz je Element wäre bei einer scrollgebundenen Animation fatal:
 * nebeneinander stehende Spalten teilen dieselbe Position und stünden
 * dann während des gesamten Scrollens in unterschiedlichen Phasen, also
 * dauerhaft unterschiedlich hell und vertikal versetzt. Das sieht nicht
 * nach Staffelung aus, sondern nach kaputtem Layout.
 *
 * Wichtig für aufrufende Komponenten: kein Elternelement darf
 * overflow-hidden tragen. Die Bewegung verschiebt den Inhalt nach unten,
 * ein beschnittener Container schneidet genau diese Pixel ab.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`u-reveal ${className}`}>{children}</div>;
}
