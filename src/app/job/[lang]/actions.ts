"use server";

import {
  candidateAvailability,
  candidateLanguages,
  candidatePermits,
  candidateShifts,
  candidateSkills,
  candidateTags,
  candidates,
  db,
} from "@/db";
import { eq } from "drizzle-orm";
import { applicationSchema } from "@/lib/validation";
import { deriveTags } from "@/lib/tags";
import { purgeDateFor } from "@/lib/retention";
import { notifyNewApplication } from "@/lib/notify";
import { CONSENT_VERSION } from "@/content/application";
import type { SubmitResult } from "./types";

/**
 * Entgegennahme einer Bewerbung.
 *
 * Reihenfolge ist Absicht: erst prüfen, dann speichern, erst danach melden.
 * Scheitert die Telegram-Meldung, ist der Datensatz trotzdem sicher, und der
 * Mensch bekommt keine Fehlermeldung für etwas, das ihn nichts angeht.
 */
export async function submitApplication(raw: unknown, trap: string): Promise<SubmitResult> {
  // Honigtopf: für Menschen unsichtbar, also immer leer. Antwort wie bei
  // Erfolg, damit ein Bot nicht lernt, woran er gescheitert ist.
  if (trap) return { ok: true, ref: "U360-0000" };

  const parsed = applicationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const input = parsed.data;
  const now = new Date();

  try {
    const result = await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(candidates)
        .values({
          // Vorläufig; die endgültige Kennung leitet sich aus der ID ab,
          // die es vor dem Einfügen noch nicht gibt.
          ref: "pending",
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          whatsapp: input.whatsappSame ? null : (input.whatsapp ?? null),
          email: input.email || null,
          city: input.city,
          postalCode: input.postalCode,
          radiusKm: input.radiusKm,
          hasCar: input.hasCar,
          licenses: input.licenses,
          experienceNote: input.experienceNote ?? null,
          availableFrom: input.availableFrom ?? null,
          hoursPerWeek: input.hoursPerWeek ?? null,
          locale: input.locale,
          consentAt: now,
          consentVersion: CONSENT_VERSION,
          purgeAfter: purgeDateFor("neu", now),
        })
        .returning({ id: candidates.id });

      const ref = `U360-${String(row.id).padStart(4, "0")}`;
      await tx.update(candidates).set({ ref }).where(eq(candidates.id, row.id));

      if (input.skills.length) {
        await tx
          .insert(candidateSkills)
          .values(input.skills.map((skill) => ({ candidateId: row.id, skill })));
      }
      if (input.languages.length) {
        await tx.insert(candidateLanguages).values(
          input.languages.map((entry) => ({
            candidateId: row.id,
            language: entry.language,
            level: entry.level,
          })),
        );
      }
      if (input.availability.length) {
        await tx
          .insert(candidateAvailability)
          .values(input.availability.map((kind) => ({ candidateId: row.id, kind })));
      }
      if (input.shifts.length) {
        await tx
          .insert(candidateShifts)
          .values(input.shifts.map((shift) => ({ candidateId: row.id, shift })));
      }
      if (input.permits.length) {
        await tx
          .insert(candidatePermits)
          .values(input.permits.map((permit) => ({ candidateId: row.id, permit })));
      }

      const tags = deriveTags(input, now);
      if (tags.length) {
        await tx
          .insert(candidateTags)
          .values(tags.map((tag) => ({ candidateId: row.id, tag, origin: "auto" })));
      }

      return { id: row.id, ref };
    });

    await notifyNewApplication({
      ref: result.ref,
      city: input.city,
      postalCode: input.postalCode,
      skills: input.skills,
      hasCar: input.hasCar,
      radiusKm: input.radiusKm,
      candidateId: result.id,
    });

    return { ok: true, ref: result.ref };
  } catch (error) {
    console.error("[bewerbung] Speichern fehlgeschlagen", error);
    return { ok: false, fieldErrors: { form: "generic" } };
  }
}
