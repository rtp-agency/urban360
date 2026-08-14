import {
  SELECTABLE_STATUSES,
  type LanguageLevel,
  type Shift,
  type Skill,
  type Status,
} from "@/content/recruiting";
import type { OrderInput } from "./validation";
import { t } from "@/content/admin";
import { languageLevelLabels, tr } from "@/content/application";

/**
 * Bewertung, wie gut ein Mensch auf einen Auftrag passt.
 *
 * Absichtlich nachvollziehbar und nicht raffiniert: die Disposition muss in
 * einem Satz erklären können, warum jemand 87 % hat und jemand anderes 61 %.
 * Ein undurchsichtiger Wert wird ignoriert, ein erklärbarer wird benutzt.
 *
 * Die Gewichte stehen als Konstanten. Wer die Auswahl anders priorisieren
 * will, ändert Zahlen, keine Logik.
 */

export const WEIGHTS = {
  skills: 35,
  distance: 25,
  availability: 20,
  language: 10,
  car: 10,
} as const;

export type MatchCandidate = {
  id: number;
  ref: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  city: string;
  postalCode: string;
  radiusKm: number;
  hasCar: boolean;
  status: Status;
  level: string | null;
  availableFrom: string | null;
  skills: Skill[];
  shifts: Shift[];
  languages: { language: string; level: string }[];
  tags: string[];
  /** Luftlinie zum Einsatzort in km, null wenn nicht bestimmbar. */
  distanceKm: number | null;
};

export type MatchReason = { label: string; earned: number; max: number };

export type MatchResult = {
  candidate: MatchCandidate;
  score: number;
  reasons: MatchReason[];
  /** Harte Ausschlussgründe. Ist die Liste nicht leer, taucht der Mensch nicht auf. */
  blockers: string[];
};

export function scoreCandidate(candidate: MatchCandidate, order: OrderInput): MatchResult {
  const reasons: MatchReason[] = [];
  const blockers: string[] = [];

  /* Harte Ausschlüsse. Bewusst kein Punktabzug: wer im Einsatz oder inaktiv
     ist, gehört nicht mit 40 % in die Liste, sondern gar nicht hinein. */
  if (!SELECTABLE_STATUSES.includes(candidate.status)) {
    blockers.push(candidate.status === "beschaeftigt" ? t.bBusy : t.bInactive);
  }
  if (order.needsCar && !candidate.hasCar) {
    blockers.push(t.bNoCar);
  }
  if (order.date && candidate.availableFrom && candidate.availableFrom > order.date) {
    blockers.push(t.bFrom(candidate.availableFrom));
  }

  /* Fertigkeiten: Anteil der geforderten Tätigkeiten, die abgedeckt sind. */
  if (order.skills.length > 0) {
    const covered = order.skills.filter((skill) => candidate.skills.includes(skill)).length;
    const share = covered / order.skills.length;
    reasons.push({
      label: t.rSkills(covered, order.skills.length),
      earned: Math.round(share * WEIGHTS.skills),
      max: WEIGHTS.skills,
    });
  } else {
    reasons.push({ label: t.rSkillsAny, earned: WEIGHTS.skills, max: WEIGHTS.skills });
  }

  /* Entfernung: gemessen am selbst angegebenen Radius. Wer 8 km bis zu einem
     Einsatz fährt und 50 km angegeben hat, bekommt die volle Punktzahl; wer
     seinen Radius überschreitet, bekommt keine. */
  if (candidate.distanceKm === null) {
    reasons.push({
      label: t.rDistanceUnknown,
      earned: Math.round(WEIGHTS.distance / 2),
      max: WEIGHTS.distance,
    });
  } else if (candidate.distanceKm > candidate.radiusKm) {
    reasons.push({
      label: t.rDistanceOut(Math.round(candidate.distanceKm)),
      earned: 0,
      max: WEIGHTS.distance,
    });
  } else {
    const closeness = 1 - candidate.distanceKm / Math.max(candidate.radiusKm, 1);
    reasons.push({
      label: t.rDistance(Math.round(candidate.distanceKm)),
      earned: Math.round((0.5 + 0.5 * closeness) * WEIGHTS.distance),
      max: WEIGHTS.distance,
    });
  }

  /* Verfügbarkeit: Tageszeit des Auftrags gegen die angegebenen Zeiten. */
  if (order.shifts.length > 0) {
    const covered = order.shifts.filter((shift) => candidate.shifts.includes(shift)).length;
    const share = covered / order.shifts.length;
    reasons.push({
      label: covered > 0 ? t.rShiftOk(covered, order.shifts.length) : t.rShiftNo,
      earned: Math.round(share * WEIGHTS.availability),
      max: WEIGHTS.availability,
    });
  } else {
    reasons.push({
      label: t.rShiftAny,
      earned: WEIGHTS.availability,
      max: WEIGHTS.availability,
    });
  }

  /* Sprache: nur relevant, wenn der Auftrag Deutsch verlangt, etwa bei
     Kundenkontakt. Grundkenntnisse zählen halb. */
  if (order.needsGerman) {
    const german = candidate.languages.find((entry) => entry.language === "de");
    const factor = german ? (german.level === "grund" ? 0.5 : 1) : 0;
    reasons.push({
      label: german
        ? t.rGerman(
            tr(languageLevelLabels[german.level as LanguageLevel] ?? languageLevelLabels.gut, "ru"),
          )
        : t.rGermanNo,
      earned: Math.round(factor * WEIGHTS.language),
      max: WEIGHTS.language,
    });
  } else {
    reasons.push({ label: t.rLangAny, earned: WEIGHTS.language, max: WEIGHTS.language });
  }

  /* Auto: als Pluspunkt auch dann, wenn es nicht verlangt wurde. Ein eigenes
     Fahrzeug macht die Disposition in fast jedem Fall einfacher. */
  reasons.push({
    label: candidate.hasCar ? t.rCarYes : t.rCarNo,
    earned: candidate.hasCar ? WEIGHTS.car : 0,
    max: WEIGHTS.car,
  });

  const score = reasons.reduce((sum, reason) => sum + reason.earned, 0);

  return { candidate, score: Math.min(100, score), reasons, blockers };
}

export function rankCandidates(candidates: MatchCandidate[], order: OrderInput): MatchResult[] {
  return candidates
    .map((candidate) => scoreCandidate(candidate, order))
    .filter((result) => result.blockers.length === 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Luftlinie zwischen zwei Punkten in Kilometern.
 * Haversine reicht hier vollkommen: die Frage ist "20 oder 60 km", nicht
 * "20,4 oder 20,7 km". Für eine echte Fahrstrecke bräuchte es einen
 * Routendienst, also einen Drittanbieter mit Adressdaten im Gepäck.
 */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
