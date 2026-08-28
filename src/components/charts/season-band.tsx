import { charts } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";
import { ChartFrame } from "./chart-frame";

/**
 * Jahresverlauf der Leistungen.
 *
 * Warum diese Grafik und nicht eine Kennzahl: eine Betreuung wird über das
 * Jahr eingekauft, nicht über einen Einzeltermin. Die Balken zeigen, dass
 * die saisonalen Leistungen ineinandergreifen und keine Lücke entsteht.
 *
 * ALLE Zeiträume hier sind entweder Betriebsangaben oder stehen im Gesetz.
 * Es steht bewusst keine erfundene Zahl in dieser Datei: eine Aussage wie
 * "98 % Zufriedenheit" wäre nach § 5 UWG angreifbar, sobald sie nicht
 * belegt ist. Wer eine Zeile ändert, prüft vorher die Quelle in der Notiz.
 *
 * Umgesetzt als CSS-Raster, nicht als SVG. Die Beschriftungen bleiben damit
 * echter Text: sie sind markierbar, wachsen mit der Schriftgröße des Nutzers
 * mit und werden von Screenreadern gelesen.
 */

type Band = {
  key: keyof typeof charts.seasonRows;
  /** Monatsspannen, 1 = Januar. Zwei Spannen, wenn die Saison das Jahr überschreitet. */
  ranges: [number, number][];
  /** Stufe der Rampe. 3 = ganzjährig und damit das Rückgrat, 1 = engstes Fenster. */
  step: 1 | 2 | 3;
};

const BANDS: Band[] = [
  { key: "objekt", ranges: [[1, 12]], step: 3 },
  { key: "reinigung", ranges: [[1, 12]], step: 3 },
  { key: "gruen", ranges: [[3, 11]], step: 2 },
  { key: "winter", ranges: [[11, 12], [1, 4]], step: 2 },
  { key: "hecke", ranges: [[10, 12], [1, 2]], step: 1 },
];

const STEP_BG: Record<1 | 2 | 3, string> = {
  1: "bg-chart-1",
  2: "bg-chart-2",
  3: "bg-chart-3",
};

export function SeasonBand({ locale }: { locale: Locale }) {
  const months = charts.months[locale];

  return (
    <ChartFrame
      label={t(charts.seasonLabel, locale)}
      title={t(charts.seasonTitle, locale)}
      note={t(charts.seasonNote, locale)}
    >
      <div className="grid gap-y-4 sm:grid-cols-[minmax(9.5rem,auto)_1fr] sm:gap-x-6 sm:gap-y-3.5">
        {BANDS.map((band) => {
          const row = charts.seasonRows[band.key];
          return (
            /* Ab sm löst sich der Wrapper auf, damit Beschriftung und Balken
               in dieselbe Rasterzeile fallen und die Balken links bündig
               beginnen. Darunter bleibt er eine echte Box: gestapelt muss die
               Beschriftung sichtbar zu IHREM Balken gehören, und dafür braucht
               es innen weniger Abstand als zwischen den Zeilen. */
            <div key={band.key} className="sm:contents">
              <p className="mb-2 text-[14px] leading-snug text-ink sm:mb-0 sm:self-center sm:text-[15px]">
                {t(row.label, locale)}
              </p>

              <div className="self-center">
                {/* Die Spannen liegen auf einem Zwölferraster. Ein Balken, der
                    mehrere Monate überdeckt, ist ein Element und bleibt dadurch
                    durchgehend; die 2px-Lücke entsteht nur zwischen getrennten
                    Spannen und trennt sie sichtbar voneinander. */}
                <div className="grid grid-cols-12 gap-[2px]">
                  {band.ranges.map(([from, to]) => (
                    <span
                      key={`${band.key}-${from}`}
                      className={`h-2.5 rounded-[4px] ${STEP_BG[band.step]}`}
                      /* gridRow ist Pflicht, nicht Kosmetik: bei einer Saison
                         über den Jahreswechsel steht die zweite Spanne links
                         von der ersten. Ohne feste Zeile findet das Raster
                         dafür keinen Platz mehr und schiebt sie eine Zeile
                         tiefer, wodurch ein Balken zu zweien zerfällt. */
                      style={{ gridColumn: `${from} / ${to + 1}`, gridRow: 1 }}
                    />
                  ))}
                </div>
                <span className="sr-only">{t(row.spoken, locale)}</span>
              </div>
            </div>
          );
        })}

        {/* Monatsachse. Sie steht unter den Daten, nicht darüber: die Balken
            sind der Inhalt, die Achse ist die Hilfslinie zum Nachschlagen. */}
        <div className="mt-1 sm:col-start-2">
          <div className="grid grid-cols-12 gap-[2px] border-t border-grid pt-2">
            {/* Auf schmalen Geräten wäre zwölfmal "Jan" ein Brei. Dort bleibt
                nur der Anfangsbuchstabe stehen, ab sm der Kurzname. */}
            {months.map((month) => (
              <span
                key={month}
                className="u-label text-center text-[9px] tracking-[0.06em] sm:text-[10px]"
              >
                <span className="sm:hidden">{month.slice(0, 1)}</span>
                <span className="hidden sm:inline">{month}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartFrame>
  );
}
