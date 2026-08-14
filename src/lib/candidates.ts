import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import {
  candidateAvailability,
  candidateLanguages,
  candidatePermits,
  candidateShifts,
  candidateSkills,
  candidateTags,
  candidates,
  db,
  postalCodes,
} from "@/db";
import type { Shift, Skill, Status } from "@/content/recruiting";
import { distanceKm, type MatchCandidate } from "./matching";

/**
 * Lesezugriffe auf die Personaldatenbank.
 *
 * Die Mehrfachauswahlen liegen in eigenen Tabellen. Statt für jeden Menschen
 * fünf Nachfragen zu stellen, werden sie in einer Abfrage als Array
 * eingesammelt. Bei 500 Datensätzen wäre der naive Weg 2500 Abfragen.
 */

const aggregate = {
  skills: sql<string[]>`coalesce((
    select array_agg(${candidateSkills.skill})
    from ${candidateSkills} where ${candidateSkills.candidateId} = ${candidates.id}
  ), '{}')`,
  tags: sql<string[]>`coalesce((
    select array_agg(${candidateTags.tag})
    from ${candidateTags} where ${candidateTags.candidateId} = ${candidates.id}
  ), '{}')`,
  shifts: sql<string[]>`coalesce((
    select array_agg(${candidateShifts.shift})
    from ${candidateShifts} where ${candidateShifts.candidateId} = ${candidates.id}
  ), '{}')`,
  availability: sql<string[]>`coalesce((
    select array_agg(${candidateAvailability.kind})
    from ${candidateAvailability} where ${candidateAvailability.candidateId} = ${candidates.id}
  ), '{}')`,
  permits: sql<string[]>`coalesce((
    select array_agg(${candidatePermits.permit})
    from ${candidatePermits} where ${candidatePermits.candidateId} = ${candidates.id}
  ), '{}')`,
  languages: sql<string[]>`coalesce((
    select array_agg(${candidateLanguages.language} || ':' || ${candidateLanguages.level})
    from ${candidateLanguages} where ${candidateLanguages.candidateId} = ${candidates.id}
  ), '{}')`,
};

export type CandidateFilters = {
  query?: string;
  status?: Status;
  tag?: string;
  skill?: Skill;
  hasCar?: boolean;
};

export type CandidateListItem = Awaited<ReturnType<typeof listCandidates>>[number];

export async function listCandidates(filters: CandidateFilters = {}) {
  const conditions = [];

  if (filters.query) {
    const needle = `%${filters.query}%`;
    conditions.push(
      or(
        ilike(candidates.firstName, needle),
        ilike(candidates.lastName, needle),
        ilike(candidates.phone, needle),
        ilike(candidates.ref, needle),
        ilike(candidates.city, needle),
      ),
    );
  }
  if (filters.status) conditions.push(eq(candidates.status, filters.status));
  if (filters.hasCar !== undefined) conditions.push(eq(candidates.hasCar, filters.hasCar));
  if (filters.tag) {
    conditions.push(
      sql`exists (select 1 from ${candidateTags} where ${candidateTags.candidateId} = ${candidates.id} and ${candidateTags.tag} = ${filters.tag})`,
    );
  }
  if (filters.skill) {
    conditions.push(
      sql`exists (select 1 from ${candidateSkills} where ${candidateSkills.candidateId} = ${candidates.id} and ${candidateSkills.skill} = ${filters.skill})`,
    );
  }

  return db
    .select({
      id: candidates.id,
      ref: candidates.ref,
      firstName: candidates.firstName,
      lastName: candidates.lastName,
      phone: candidates.phone,
      whatsapp: candidates.whatsapp,
      email: candidates.email,
      city: candidates.city,
      postalCode: candidates.postalCode,
      radiusKm: candidates.radiusKm,
      hasCar: candidates.hasCar,
      status: candidates.status,
      level: candidates.level,
      createdAt: candidates.createdAt,
      purgeAfter: candidates.purgeAfter,
      skills: aggregate.skills,
      tags: aggregate.tags,
    })
    .from(candidates)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(candidates.createdAt))
    .limit(300);
}

export async function getCandidate(id: number) {
  const [row] = await db
    .select({
      candidate: candidates,
      skills: aggregate.skills,
      tags: aggregate.tags,
      shifts: aggregate.shifts,
      availability: aggregate.availability,
      permits: aggregate.permits,
      languages: aggregate.languages,
    })
    .from(candidates)
    .where(eq(candidates.id, id))
    .limit(1);

  if (!row) return null;

  return {
    ...row.candidate,
    skills: row.skills as Skill[],
    tags: row.tags,
    shifts: row.shifts as Shift[],
    availability: row.availability,
    permits: row.permits,
    languages: row.languages.map((entry) => {
      const [language, level] = entry.split(":");
      return { language, level };
    }),
  };
}

/** Mittelpunkt einer Postleitzahl, für die Entfernungsrechnung. */
export async function centroidFor(plz: string): Promise<{ lat: number; lng: number } | null> {
  const [row] = await db
    .select({ lat: postalCodes.lat, lng: postalCodes.lng })
    .from(postalCodes)
    .where(eq(postalCodes.plz, plz))
    .limit(1);
  return row ? { lat: Number(row.lat), lng: Number(row.lng) } : null;
}

/**
 * Kandidaten für die Auswahl, samt Entfernung zum Einsatzort.
 *
 * Vorgefiltert wird nur, was hart ausschließt (Status). Die Feinbewertung
 * macht rankCandidates in matching.ts: sie muss auch begründen können,
 * warum jemand nicht ganz oben steht, und dafür braucht sie die Datensätze.
 */
export async function candidatesForOrder(orderPlz?: string): Promise<MatchCandidate[]> {
  const rows = await db
    .select({
      id: candidates.id,
      ref: candidates.ref,
      firstName: candidates.firstName,
      lastName: candidates.lastName,
      phone: candidates.phone,
      whatsapp: candidates.whatsapp,
      email: candidates.email,
      city: candidates.city,
      postalCode: candidates.postalCode,
      radiusKm: candidates.radiusKm,
      hasCar: candidates.hasCar,
      status: candidates.status,
      level: candidates.level,
      availableFrom: candidates.availableFrom,
      skills: aggregate.skills,
      shifts: aggregate.shifts,
      tags: aggregate.tags,
      languages: aggregate.languages,
      lat: postalCodes.lat,
      lng: postalCodes.lng,
    })
    .from(candidates)
    .leftJoin(postalCodes, eq(postalCodes.plz, candidates.postalCode))
    .where(inArray(candidates.status, ["neu", "geprueft", "verfuegbar", "beschaeftigt", "inaktiv"]))
    .limit(1000);

  const target = orderPlz ? await centroidFor(orderPlz) : null;

  return rows.map((row) => ({
    id: row.id,
    ref: row.ref,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    city: row.city,
    postalCode: row.postalCode,
    radiusKm: row.radiusKm,
    hasCar: row.hasCar,
    status: row.status as Status,
    level: row.level,
    availableFrom: row.availableFrom,
    skills: row.skills as Skill[],
    shifts: row.shifts as Shift[],
    tags: row.tags,
    languages: row.languages.map((entry) => {
      const [language, level] = entry.split(":");
      return { language, level };
    }),
    distanceKm:
      target && row.lat && row.lng
        ? distanceKm(target, { lat: Number(row.lat), lng: Number(row.lng) })
        : null,
  }));
}

/** Alle vergebenen Schlagworte, für die Filterleiste. */
export async function usedTags(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ tag: candidateTags.tag })
    .from(candidateTags)
    .orderBy(candidateTags.tag);
  return rows.map((row) => row.tag);
}

export async function candidateCounts() {
  const rows = await db
    .select({ status: candidates.status, count: sql<number>`count(*)::int` })
    .from(candidates)
    .groupBy(candidates.status);
  return Object.fromEntries(rows.map((row) => [row.status, row.count])) as Record<string, number>;
}
