import { z } from "zod";
import {
  AVAILABILITY_KINDS,
  APPLICATION_LOCALES,
  LANGUAGES,
  LANGUAGE_LEVELS,
  LICENSES,
  PERMITS,
  RADII,
  SHIFTS,
  SKILLS,
} from "@/content/recruiting";

/**
 * Prüfung der eingehenden Bewerbung.
 *
 * Serverseitig und ohne Ausnahme: die Prüfung im Browser ist Bequemlichkeit
 * für den Nutzer, kein Schutz. Wer das Formular umgeht, schickt trotzdem nur,
 * was hier durchkommt.
 */

/**
 * Telefonnummern werden bewusst großzügig geprüft. Kandidaten schreiben
 * +49 170 1234567, 0170/1234567 oder 0049-170-1234567. Alles davon ist
 * brauchbar; abgelehnt wird nur, was erkennbar keine Nummer ist.
 */
const phone = z
  .string()
  .trim()
  .min(6)
  .max(32)
  .regex(/^[+0-9][0-9\s()/.-]{5,31}$/, "phone");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const applicationSchema = z.object({
  locale: z.enum(APPLICATION_LOCALES),

  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  phone,
  whatsappSame: z.boolean(),
  whatsapp: phone.optional(),
  email: z.union([z.literal(""), z.email().max(160)]).optional(),

  city: z.string().trim().min(2).max(80),
  /** Fünfstellig, führende Null erlaubt. */
  postalCode: z.string().trim().regex(/^[0-9]{5}$/, "plz"),
  radiusKm: z.union([z.literal(10), z.literal(25), z.literal(50), z.literal(100)]),
  hasCar: z.boolean(),
  licenses: z.array(z.enum(LICENSES)).max(LICENSES.length),

  languages: z
    .array(z.object({ language: z.enum(LANGUAGES), level: z.enum(LANGUAGE_LEVELS) }))
    .max(LANGUAGES.length),
  skills: z.array(z.enum(SKILLS)).min(1, "skills").max(SKILLS.length),
  experienceNote: optionalText(2000),

  availability: z.array(z.enum(AVAILABILITY_KINDS)).max(AVAILABILITY_KINDS.length),
  shifts: z.array(z.enum(SHIFTS)).max(SHIFTS.length),
  availableFrom: z
    .union([z.literal(""), z.iso.date()])
    .optional()
    .transform((v) => (v ? v : undefined)),
  hoursPerWeek: z
    .union([z.literal(""), z.coerce.number().int().min(1).max(60)])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : Number(v))),

  /** Freiwillig, siehe Begründung in recruiting.ts. */
  permits: z.array(z.enum(PERMITS)).max(PERMITS.length),

  consent: z.literal(true),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** Parameter eines Auftrags, gegen den ausgewählt wird. */
export const orderSchema = z.object({
  postalCode: z
    .union([z.literal(""), z.string().trim().regex(/^[0-9]{5}$/)])
    .optional()
    .transform((v) => (v ? v : undefined)),
  city: optionalText(80),
  skills: z.array(z.enum(SKILLS)).default([]),
  shifts: z.array(z.enum(SHIFTS)).default([]),
  date: z
    .union([z.literal(""), z.iso.date()])
    .optional()
    .transform((v) => (v ? v : undefined)),
  needsCar: z.boolean().default(false),
  needsGerman: z.boolean().default(false),
  headcount: z.coerce.number().int().min(1).max(50).default(1),
});

export type OrderInput = z.infer<typeof orderSchema>;

/**
 * Normalisiert eine Telefonnummer auf reine Ziffern mit Ländervorwahl,
 * damit daraus ein wa.me-Link werden kann. Deutsche Nummern werden mit 49
 * ergänzt, wenn sie mit einer einzelnen 0 beginnen.
 */
export function toWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return `49${digits.slice(1)}`;
  return digits;
}
