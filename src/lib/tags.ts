import { LOCATION_TAGS, SKILL_TAGS, type Skill } from "@/content/recruiting";
import type { ApplicationInput } from "./validation";

/**
 * Automatische Verschlagwortung.
 *
 * Aus den Angaben des Fragebogens werden Schlagworte abgeleitet, mit denen
 * sich später disponieren lässt. Von Hand vergebene Schlagworte bleiben davon
 * unberührt: die Ableitung erzeugt nur Einträge mit origin = "auto", eine
 * spätere Korrektur durch einen Menschen wird nicht überschrieben.
 *
 * Die Erfahrungsstufe (EINSTEIGER/ERFAHREN/PROFI) wird hier bewusst NICHT
 * abgeleitet. Es gibt keine belastbare Grundlage dafür: die Selbstauskunft im
 * Freitextfeld taugt nicht als Messwert. Diese Stufe vergibt die Verwaltung
 * nach dem ersten Einsatz.
 */

/** Ab wie vielen Tagen Vorlauf gilt jemand noch als "sofort verfügbar". */
const SOFORT_WITHIN_DAYS = 3;

export function deriveTags(input: ApplicationInput, today: Date): string[] {
  const tags = new Set<string>();

  tags.add("NEU");

  for (const skill of input.skills) {
    tags.add(SKILL_TAGS[skill as Skill]);
  }

  const location = locationTagFor(input.postalCode);
  if (location) tags.add(location);

  if (input.availability.includes("vollzeit")) tags.add("VOLLZEIT");
  if (input.availability.includes("wochenende")) tags.add("WOCHENENDE");
  if (input.shifts.includes("abends") || input.shifts.includes("nachts")) tags.add("ABENDS");

  if (isAvailableSoon(input.availableFrom, today)) tags.add("SOFORT");

  if (input.hasCar) tags.add("AUTO");

  return [...tags];
}

/**
 * Ortsschlagwort über die Postleitzahl, nicht über den geschriebenen
 * Ortsnamen. "Mönchengladbach", "Moenchengladbach", "M.Gladbach" und "MG"
 * sind derselbe Ort, die Postleitzahl ist der einzige verlässliche Anker.
 */
export function locationTagFor(postalCode: string): string | null {
  const matches = LOCATION_TAGS.filter((entry) =>
    entry.plzPrefixes.some((prefix) => postalCode.startsWith(prefix)),
  );
  if (matches.length === 0) return null;

  // Längstes Präfix gewinnt: 41747 ist Viersen (417) und nicht
  // Mönchengladbach (41), obwohl beide Präfixe passen.
  return matches.reduce((best, entry) => {
    const bestLen = Math.max(...best.plzPrefixes.map((p) => p.length));
    const len = Math.max(...entry.plzPrefixes.map((p) => p.length));
    return len > bestLen ? entry : best;
  }).tag;
}

function isAvailableSoon(availableFrom: string | undefined, today: Date): boolean {
  if (!availableFrom) return true; // keine Angabe heißt: kann sofort
  const from = new Date(`${availableFrom}T00:00:00Z`);
  if (Number.isNaN(from.getTime())) return false;
  const diffDays = (from.getTime() - startOfDay(today).getTime()) / 86_400_000;
  return diffDays <= SOFORT_WITHIN_DAYS;
}

function startOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

/** Schlagworte, die die Verwaltung als Vorschlag anbietet. */
export function knownTags(): string[] {
  const skills = new Set(Object.values(SKILL_TAGS));
  return [
    ...skills,
    ...LOCATION_TAGS.map((entry) => entry.tag),
    "SOFORT",
    "WOCHENENDE",
    "ABENDS",
    "VOLLZEIT",
    "AUTO",
    "EINSTEIGER",
    "ERFAHREN",
    "PROFI",
  ];
}
