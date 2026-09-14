import { site } from "@/content/site.config";

/**
 * Wortmarke.
 *
 * Zwei Fassungen, eine helle und eine dunkle, ausgewählt über <picture> und
 * prefers-color-scheme. Der Browser lädt dadurch nur die eine, die er
 * braucht; zwei <img> übereinander mit CSS umzuschalten würde beide holen.
 *
 * Warum überhaupt zwei: die Schrift der Wortmarke steht in der hellen
 * Fassung fast schwarz. Im Dunkelmodus wäre sie auf der dunklen Kopfleiste
 * unsichtbar. Das ist kein Feinschliff, sondern die Bedingung dafür, dass
 * die Marke in beiden Modi überhaupt dasteht.
 *
 * Warum die Wortmarke und nicht das ganze Zeichen: die gelieferte Datei ist
 * ein stehendes Logo, Bildmarke über Schriftzug. In eine 68 Pixel hohe
 * Kopfleiste gesetzt wird der Schriftzug darin so klein, dass er nicht mehr
 * zu lesen ist. Die Bildmarke allein trägt dafür das Symbol im Reiter, wo
 * umgekehrt kein Schriftzug lesbar wäre.
 *
 * Breite und Höhe stehen fest im Markup. Ohne sie springt die Kopfleiste
 * beim Laden um die Höhe des Bildes.
 */

/** Seitenverhältnis der Dateien in public/images: 423 zu 78. */
const RATIO = 423 / 78;

export function Wordmark({
  height = 26,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * RATIO);

  return (
    <picture>
      <source srcSet="/images/wordmark-dark.png" media="(prefers-color-scheme: dark)" />
      <img
        src="/images/wordmark-light.png"
        alt={site.name}
        width={width}
        height={height}
        className={className}
        style={{ height, width: "auto" }}
        decoding="async"
      />
    </picture>
  );
}
