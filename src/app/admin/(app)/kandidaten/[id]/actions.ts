"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auditLog, candidateTags, candidates, db } from "@/db";
import { requireUser } from "@/lib/auth";
import { purgeDateFor } from "@/lib/retention";
import { LEVELS, STATUSES, type Level, type Status } from "@/content/recruiting";

/**
 * Änderungen an einer Kandidatenkarte.
 *
 * Jede Änderung landet im Protokoll. Das ist keine Bürokratie, sondern die
 * Rechenschaftspflicht aus Art. 5 Abs. 2 DSGVO: bei einer Auskunft muss
 * belegbar sein, wer wann was an einem Datensatz getan hat.
 */

async function record(
  adminId: number,
  candidateId: number,
  action: string,
  detail?: string,
): Promise<void> {
  await db.insert(auditLog).values({ adminId, candidateId, action, detail });
}

export async function updateCandidate(formData: FormData): Promise<void> {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) throw new Error("Ungültige Kennung");

  const status = String(formData.get("status") ?? "");
  const level = String(formData.get("level") ?? "");
  const rate = String(formData.get("hourlyRate") ?? "").replace(",", ".");
  const note = String(formData.get("adminNote") ?? "");

  if (!STATUSES.includes(status as Status)) throw new Error("Unbekannter Status");

  const [before] = await db
    .select({ status: candidates.status })
    .from(candidates)
    .where(eq(candidates.id, id))
    .limit(1);

  await db
    .update(candidates)
    .set({
      status,
      level: LEVELS.includes(level as Level) ? level : null,
      hourlyRate: rate && !Number.isNaN(Number(rate)) ? rate : null,
      adminNote: note || null,
      updatedAt: new Date(),
      /* Die Löschfrist hängt am Status: wer im Bestand geführt wird, darf
         länger gespeichert bleiben als eine unbearbeitete Bewerbung. */
      purgeAfter: purgeDateFor(status as Status),
    })
    .where(eq(candidates.id, id));

  await record(
    user.id,
    id,
    "update",
    before && before.status !== status ? `Status ${before.status} → ${status}` : "Karte bearbeitet",
  );

  revalidatePath(`/admin/kandidaten/${id}`);
  revalidatePath("/admin/kandidaten");
}

export async function addTag(formData: FormData): Promise<void> {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  const tag = String(formData.get("tag") ?? "")
    .trim()
    .toUpperCase();

  if (!Number.isInteger(id) || !tag) return;

  await db
    .insert(candidateTags)
    .values({ candidateId: id, tag, origin: "manual" })
    .onConflictDoNothing();
  await record(user.id, id, "tag_add", tag);

  revalidatePath(`/admin/kandidaten/${id}`);
}

export async function removeTag(formData: FormData): Promise<void> {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  const tag = String(formData.get("tag") ?? "");

  if (!Number.isInteger(id) || !tag) return;

  await db
    .delete(candidateTags)
    .where(and(eq(candidateTags.candidateId, id), eq(candidateTags.tag, tag)));
  await record(user.id, id, "tag_remove", tag);

  revalidatePath(`/admin/kandidaten/${id}`);
}

/**
 * Anonymisierung auf Wunsch der betroffenen Person (Art. 17 DSGVO).
 * Der Datensatz bleibt als Zeile bestehen, verliert aber jeden Personenbezug.
 * Vollständiges Löschen würde die Protokollkette zerreißen.
 */
export async function anonymizeCandidate(formData: FormData): Promise<void> {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await db
    .update(candidates)
    .set({
      firstName: "gelöscht",
      lastName: "gelöscht",
      phone: "",
      whatsapp: null,
      email: null,
      experienceNote: null,
      adminNote: null,
      city: "",
      status: "inaktiv",
      anonymizedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(candidates.id, id));

  await record(user.id, id, "anonymize", "Auf Verlangen gelöscht");

  revalidatePath("/admin/kandidaten");
  revalidatePath(`/admin/kandidaten/${id}`);
}
