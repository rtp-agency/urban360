import { charts } from "@/content/copy";
import type { Locale } from "@/content/site.config";
import { t } from "@/lib/i18n";
import { ChartFrame } from "./chart-frame";

/**
 * § 35a EStG als Rechnung statt als Behauptung.
 *
 * Die Grafik zerlegt eine Beispielrechnung in Material und Arbeitskosten und
 * zeigt, worauf die Ermäßigung greift: 20 % der Arbeitskosten, nicht 20 % der
 * Rechnung. Genau dieser Unterschied wird von Kunden regelmäßig übersehen,
 * und genau er entscheidet, ob eine getrennt ausgewiesene Rechnung etwas wert
 * ist.
 *
 * HERKUNFT DER ZAHLEN, NICHT ÄNDERN OHNE QUELLE:
 * - 20 % der Arbeitskosten, § 35a Abs. 2 und Abs. 3 EStG
 * - Höchstbetrag 4.000 € im Jahr bei haushaltsnahen Dienstleistungen, Abs. 2
 * - Höchstbetrag 1.200 € im Jahr bei Handwerkerleistungen, Abs. 3
 * Die Beträge der Beispielrechnung sind als Beispiel gekennzeichnet. Sie
 * dürfen nicht als Preisangabe gelesen werden und stehen deshalb nirgends
 * ohne das Wort "Beispiel" daneben.
 */

/* Beispielwerte. Bewusst krumm und nicht 1.000/500: eine glatte Zahl liest
   sich als Werbung, eine echte Rechnung sieht so nicht aus. */
const EXAMPLE = {
  total: 1480,
  material: 560,
  labour: 920,
};

const RATE = 0.2;
const refund = Math.round(EXAMPLE.labour * RATE);

const money = (value: number, locale: Locale) =>
  locale === "de"
    ? `${value.toLocaleString("de-DE")} €`
    : `€${value.toLocaleString("en-GB")}`;

export function TaxBar({ locale }: { locale: Locale }) {
  const materialShare = (EXAMPLE.material / EXAMPLE.total) * 100;
  const labourShare = (EXAMPLE.labour / EXAMPLE.total) * 100;

  return (
    <ChartFrame
      label={t(charts.taxLabel, locale)}
      title={t(charts.taxChartTitle, locale)}
      note={t(charts.taxChartNote, locale)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-muted">{t(charts.taxInvoice, locale)}</span>
        <span className="u-nums text-[15px] font-medium text-ink">
          {money(EXAMPLE.total, locale)}
        </span>
      </div>

      {/* Gestapelter Balken. Die 2px-Lücke zwischen den Abschnitten ist kein
          Dekor: ohne sie verschmelzen zwei Flächen derselben Farbfamilie
          optisch zu einer und der Anteil ist nicht mehr ablesbar. */}
      <div className="mt-3 flex gap-[2px]">
        <span
          className="h-9 rounded-l-[4px] bg-chart-1"
          style={{ width: `${materialShare}%` }}
        />
        <span
          className="h-9 rounded-r-[4px] bg-chart-3"
          style={{ width: `${labourShare}%` }}
        />
      </div>

      {/* Direktbeschriftung statt Legende: bei zwei Abschnitten ist eine
          Legende ein Umweg, der den Blick zwischen Kasten und Balken hin und
          her schickt. */}
      <div className="mt-3 flex gap-[2px]">
        <div style={{ width: `${materialShare}%` }} className="pr-3">
          <p className="u-label">{t(charts.taxMaterial, locale)}</p>
          <p className="u-nums mt-1.5 text-[14px] text-muted">
            {money(EXAMPLE.material, locale)}
          </p>
        </div>
        <div style={{ width: `${labourShare}%` }}>
          <p className="u-label text-accent">{t(charts.taxLabour, locale)}</p>
          <p className="u-nums mt-1.5 text-[14px] font-medium text-ink">
            {money(EXAMPLE.labour, locale)}
          </p>
        </div>
      </div>

      {/* Das Ergebnis. Eine einzelne große Zahl, weil genau sie die Frage des
          Kunden beantwortet: was kommt zurück. */}
      <div className="mt-7 border-t border-hairline pt-6">
        <p className="u-label">{t(charts.taxRefundLabel, locale)}</p>
        <p className="mt-3 flex items-baseline gap-3">
          <span className="u-nums text-[40px] leading-none font-semibold tracking-tight text-accent md:text-[52px]">
            {money(refund, locale)}
          </span>
          <span className="text-[14px] text-muted">{t(charts.taxRefundHint, locale)}</span>
        </p>
      </div>

      {/* Die gesetzlichen Höchstbeträge. Sie gehören sichtbar dazu: ohne sie
          entstünde der Eindruck, die Ermäßigung sei nach oben offen. */}
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6">
        <div>
          <dt className="u-nums text-[22px] leading-none font-semibold tracking-tight text-ink">
            {money(4000, locale)}
          </dt>
          <dd className="mt-2 text-[13px] leading-snug text-muted">
            {t(charts.taxCapA, locale)}
          </dd>
        </div>
        <div>
          <dt className="u-nums text-[22px] leading-none font-semibold tracking-tight text-ink">
            {money(1200, locale)}
          </dt>
          <dd className="mt-2 text-[13px] leading-snug text-muted">
            {t(charts.taxCapB, locale)}
          </dd>
        </div>
      </dl>
    </ChartFrame>
  );
}
