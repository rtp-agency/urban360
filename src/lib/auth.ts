import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { and, eq, gt, lt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db, adminSessions, adminUsers } from "@/db";

/**
 * Anmeldung an der Verwaltung.
 *
 * Bewusst eigene Benutzer statt eines gemeinsamen Passworts in einer
 * Umgebungsvariablen. In der Datenbank liegen Daten realer Menschen; bei
 * einer Auskunft nach Art. 15 DSGVO muss nachvollziehbar sein, wer sie
 * eingesehen und geändert hat. Mit einem geteilten Zugang ist das unmöglich.
 *
 * Vom Sitzungstoken wird nur der Hash gespeichert. Wer die Datenbank liest,
 * kann sich damit nicht anmelden.
 */

const COOKIE = "u360_session";
const SESSION_HOURS = 12;

export type SessionUser = { id: number; email: string; name: string };

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Prüft Zugangsdaten und legt bei Erfolg eine Sitzung an. */
export async function signIn(email: string, password: string): Promise<SessionUser | null> {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.trim().toLowerCase()))
    .limit(1);

  /* Auch ohne Treffer wird gehasht. Sonst verrät die Antwortzeit, ob eine
     Adresse existiert, und die Anmeldemaske wird zum Benutzerverzeichnis. */
  const hash = user?.passwordHash ?? "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin";
  const ok = await verifyPassword(password, hash);

  if (!user || !ok || user.disabledAt) return null;

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3_600_000);

  await db.insert(adminSessions).values({
    tokenHash: hashToken(token),
    adminId: user.id,
    expiresAt,
  });
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  /* Abgelaufene Sitzungen bei Gelegenheit aufräumen, damit die Tabelle
     nicht unbegrenzt wächst. */
  await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()));

  return { id: user.id, email: user.email, name: user.name };
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await db.delete(adminSessions).where(eq(adminSessions.tokenHash, hashToken(token)));
  }
  store.delete(COOKIE);
}

/** Aktuell angemeldeter Mensch, oder null. */
export async function currentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  const [row] = await db
    .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.adminId))
    .where(and(eq(adminSessions.tokenHash, hashToken(token)), gt(adminSessions.expiresAt, new Date())))
    .limit(1);

  return row ?? null;
}

/** Für Server Actions: bricht ab, wenn niemand angemeldet ist. */
export async function requireUser(): Promise<SessionUser> {
  const user = await currentUser();
  if (!user) throw new Error("Nicht angemeldet");
  return user;
}

/** Vergleich ohne Zeitunterschied, für Geheimnisse aus Umgebungsvariablen. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const SESSION_COOKIE = COOKIE;
