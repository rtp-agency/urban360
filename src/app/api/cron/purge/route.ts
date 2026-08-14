import { NextResponse } from "next/server";
import { and, isNull, lte, sql } from "drizzle-orm";
import { candidates, db } from "@/db";
import { safeEqual } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Automatische Löschung abgelaufener Bewerberdaten.
 *
 * Die DSGVO verlangt keine Aufbewahrung auf Vorrat: was den Zweck erfüllt
 * hat, muss weg. Ohne diesen Lauf wächst die Datenbank zu einem Archiv, das
 * bei einer Prüfung nicht zu rechtfertigen ist.
 *
 * Anonymisiert statt gelöscht: die Zeile bleibt, damit Protokolleinträge und
 * Statistiken nicht ins Leere zeigen, der Personenbezug verschwindet.
 *
 * Einrichtung: in vercel.json als Cron eintragen, täglich. Der Aufruf ist
 * mit CRON_SECRET geschützt, sonst könnte jeder die Löschung auslösen.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET не задан" }, { status: 500 });
  }

  const auth = request.headers.get("authorization") ?? "";
  const provided = auth.replace(/^Bearer\s+/i, "");
  if (!provided || !safeEqual(provided, secret)) {
    return NextResponse.json({ error: "нет доступа" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const purged = await db
    .update(candidates)
    .set({
      firstName: "удалено",
      lastName: "удалено",
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
    .where(and(lte(candidates.purgeAfter, today), isNull(candidates.anonymizedAt)))
    .returning({ id: candidates.id });

  // Abgelaufene Sitzungen gleich mit aufräumen.
  await db.execute(sql`delete from admin_sessions where expires_at < now()`);

  return NextResponse.json({ anonymized: purged.length, date: today });
}
