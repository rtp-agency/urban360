import type { Status } from "@/content/recruiting";
import { t } from "@/content/admin";

/**
 * Aufbewahrungsfristen für Bewerberdaten.
 *
 * Bewerbungsunterlagen dürfen nicht dauerhaft liegen bleiben. Maßgeblich ist
 * die Klagefrist aus § 15 Abs. 4 AGG von zwei Monaten, zuzüglich Puffer für
 * ein anschließendes Verfahren. In der Praxis haben sich sechs Monate nach
 * Abschluss des Verfahrens etabliert; darüber hinaus braucht es einen Grund.
 *
 * Wer im Bestand steht und für Einsätze vorgesehen ist, wird nicht nach sechs
 * Monaten gelöscht: dort besteht ein laufender Zweck. Für diesen Fall wird
 * die Frist bei jeder Statusänderung neu gesetzt, damit ein karteileichenhafter
 * Datensatz trotzdem irgendwann verfällt.
 */

const MONTH = 30;

const DAYS_BY_STATUS: Record<Status, number> = {
  neu: 6 * MONTH,
  geprueft: 12 * MONTH,
  verfuegbar: 12 * MONTH,
  beschaeftigt: 24 * MONTH,
  inaktiv: 6 * MONTH,
};

export function purgeDateFor(status: Status, from: Date = new Date()): string {
  const days = DAYS_BY_STATUS[status] ?? 6 * MONTH;
  const target = new Date(from.getTime() + days * 86_400_000);
  return target.toISOString().slice(0, 10);
}

/**
 * Подпись для админки: сколько ещё хранится эта запись.
 */
export function retentionNote(purgeAfter: string, today: Date = new Date()): string {
  const target = new Date(`${purgeAfter}T00:00:00Z`);
  const days = Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
  if (days <= 0) return t.retentionDue;
  if (days <= 31) return t.retentionDays(days);
  return t.retentionDate(target.toLocaleDateString("ru-RU"));
}
