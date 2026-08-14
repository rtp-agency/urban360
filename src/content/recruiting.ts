/**
 * FACHLICHE STAMMDATEN DER PERSONALDATENBANK
 *
 * Alles, was Fragebogen, Datenbank, Verschlagwortung und Auswahl gemeinsam
 * kennen müssen, steht hier und nur hier. Wer eine Fertigkeit ergänzt, ändert
 * diese Datei; Formular, Filter und Bewertung ziehen automatisch nach.
 *
 * Die Schlüssel sind bewusst kurze, sprachneutrale Kennungen. Sie landen so
 * in der Datenbank und dürfen sich nie ändern, sonst verlieren bestehende
 * Datensätze ihre Bedeutung. Übersetzt wird ausschließlich die Anzeige,
 * siehe src/content/application.ts.
 */

export const APPLICATION_LOCALES = ["de", "ru", "uk", "en"] as const;
export type AppLocale = (typeof APPLICATION_LOCALES)[number];
export const DEFAULT_APP_LOCALE: AppLocale = "de";

export function isAppLocale(value: string): value is AppLocale {
  return (APPLICATION_LOCALES as readonly string[]).includes(value);
}

/** Fertigkeiten. Reihenfolge bestimmt die Anzeige im Fragebogen. */
export const SKILLS = [
  "reinigung",
  "grundreinigung",
  "endreinigung",
  "bueroreinigung",
  "housekeeping",
  "gastronomie",
  "kueche",
  "service",
  "lager",
  "umzug",
  "moebelmontage",
  "gartenarbeit",
  "handwerk",
  "fensterreinigung",
  "sonderreinigung",
  "andere",
] as const;
export type Skill = (typeof SKILLS)[number];

/** Sprachen, die abgefragt werden. */
export const LANGUAGES = ["de", "ru", "uk", "en", "andere"] as const;
export type LanguageCode = (typeof LANGUAGES)[number];

/**
 * Sprachniveau. Bewusst grob gehalten: Kandidaten schätzen sich auf einer
 * A1-C2-Skala unzuverlässig ein, drei Stufen sind belastbarer.
 */
export const LANGUAGE_LEVELS = ["grund", "gut", "flie"] as const;
export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];

/** Beschäftigungsumfang. */
export const AVAILABILITY_KINDS = [
  "vollzeit",
  "teilzeit",
  "minijob",
  "einmalig",
  "wochenende",
] as const;
export type AvailabilityKind = (typeof AVAILABILITY_KINDS)[number];

/** Tageszeiten. */
export const SHIFTS = ["morgens", "tagsueber", "abends", "nachts"] as const;
export type Shift = (typeof SHIFTS)[number];

/**
 * Aufenthalts- und Erwerbsstatus.
 *
 * Die Angabe ist freiwillig und blockiert das Absenden nicht. Grund: aus dem
 * Aufenthaltstitel folgt mittelbar die Herkunft. Wird er im Bewerbungsstadium
 * verpflichtend erhoben, lässt sich eine spätere Absage nach dem AGG leichter
 * als Benachteiligung wegen der ethnischen Herkunft angreifen. Der konkrete
 * Titel gehört sauber erst in die Personalakte bei Einstellung.
 */
export const PERMITS = [
  "eu",
  "arbeitserlaubnis",
  "par24",
  "aufenthaltstitel",
  "selbststaendig",
  "andere",
  "unklar",
] as const;
export type Permit = (typeof PERMITS)[number];

/** Führerscheinklassen, die für diese Einsätze zählen. */
export const LICENSES = ["b", "be", "c1", "c", "keine"] as const;
export type License = (typeof LICENSES)[number];

/** Einsatzradius in Kilometern. */
export const RADII = [10, 25, 50, 100] as const;
export type Radius = (typeof RADII)[number];

/** Bearbeitungsstand. Wird ausschließlich intern gesetzt. */
export const STATUSES = ["neu", "geprueft", "verfuegbar", "beschaeftigt", "inaktiv"] as const;
export type Status = (typeof STATUSES)[number];

/** Für die Auswahl grundsätzlich vorschlagbar. */
export const SELECTABLE_STATUSES: Status[] = ["geprueft", "verfuegbar"];

/**
 * Erfahrungsstufe. Wird von Hand vergeben, nicht abgeleitet:
 * die Selbsteinschätzung im Fragebogen taugt dafür nicht.
 */
export const LEVELS = ["einsteiger", "erfahren", "profi"] as const;
export type Level = (typeof LEVELS)[number];

/**
 * Einsatzgebiet. Steuert die Ortsschlagworte.
 * Ein Ort wird über die Postleitzahlen zugeordnet, nicht über den
 * geschriebenen Ortsnamen: Tippfehler und Schreibvarianten wie
 * "Mönchengladbach", "Moenchengladbach" oder "MG" sind sonst nicht zu fassen.
 */
export const LOCATION_TAGS: { tag: string; label: string; plzPrefixes: string[] }[] = [
  { tag: "MG", label: "Mönchengladbach", plzPrefixes: ["41"] },
  { tag: "DÜSSELDORF", label: "Düsseldorf", plzPrefixes: ["40"] },
  { tag: "KREFELD", label: "Krefeld", plzPrefixes: ["47"] },
  { tag: "NEUSS", label: "Neuss", plzPrefixes: ["414"] },
  { tag: "VIERSEN", label: "Viersen", plzPrefixes: ["417"] },
];

/**
 * Zuordnung Fertigkeit zu Schlagwort. Mehrere Fertigkeiten fallen bewusst
 * auf dasselbe Schlagwort: für die Disposition ist "irgendeine Reinigung"
 * die nützlichere Einheit als sechs Einzelbegriffe.
 */
export const SKILL_TAGS: Record<Skill, string> = {
  reinigung: "REINIGUNG",
  grundreinigung: "REINIGUNG",
  endreinigung: "REINIGUNG",
  bueroreinigung: "REINIGUNG",
  fensterreinigung: "REINIGUNG",
  sonderreinigung: "REINIGUNG",
  housekeeping: "HOUSEKEEPING",
  gastronomie: "SERVICE",
  service: "SERVICE",
  kueche: "KÜCHE",
  lager: "LAGER",
  umzug: "UMZUG",
  moebelmontage: "HANDWERK",
  handwerk: "HANDWERK",
  gartenarbeit: "GARTEN",
  andere: "SONSTIGES",
};

/** Reine Anzeigefarbe der Statusmarke in der Verwaltung. */
export const STATUS_TONE: Record<Status, "neutral" | "accent" | "warn" | "muted"> = {
  neu: "accent",
  geprueft: "neutral",
  verfuegbar: "accent",
  beschaeftigt: "warn",
  inaktiv: "muted",
};
