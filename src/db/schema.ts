import {
  boolean,
  date,
  index,
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * DATENBANKSCHEMA DER PERSONALDATENBANK
 *
 * Aufzählungen liegen bewusst als text vor und nicht als pgEnum. Eine neue
 * Fertigkeit oder ein neuer Status wäre bei pgEnum eine Migration mit
 * ALTER TYPE; hier genügt ein Eintrag in src/content/recruiting.ts. Die
 * Gültigkeit sichert die Validierung beim Schreiben, siehe src/lib/validation.ts.
 *
 * Mehrfachauswahlen stehen in eigenen Tabellen statt in Arrays. Der Grund ist
 * die Auswahlabfrage: "alle mit Fertigkeit X im Umkreis Y" ist als Join mit
 * Index schnell, als Array-Suche nicht.
 */

export const candidates = pgTable(
  "candidates",
  {
    id: serial("id").primaryKey(),
    /** Menschenlesbare Kennung, z. B. U360-0147. Steht auf dem Dankeschirm. */
    ref: text("ref").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),

    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone").notNull(),
    /** Leer, wenn WhatsApp unter derselben Nummer erreichbar ist. */
    whatsapp: text("whatsapp"),
    email: text("email"),

    city: text("city").notNull(),
    postalCode: text("postal_code").notNull(),
    radiusKm: integer("radius_km").notNull(),
    hasCar: boolean("has_car").notNull().default(false),
    licenses: text("licenses").array().notNull().default([]),

    experienceNote: text("experience_note"),
    availableFrom: date("available_from"),
    hoursPerWeek: integer("hours_per_week"),

    /** Ab hier nur intern gepflegt, nie vom Fragebogen beschrieben. */
    status: text("status").notNull().default("neu"),
    level: text("level"),
    hourlyRate: numeric("hourly_rate", { precision: 6, scale: 2 }),
    adminNote: text("admin_note"),

    /** Sprache, in der der Fragebogen ausgefüllt wurde. Steuert die Ansprache. */
    locale: text("locale").notNull().default("de"),

    /**
     * Nachweis der Einwilligung nach Art. 7 Abs. 1 DSGVO: ohne Zeitpunkt und
     * Fassung des zugestimmten Textes ist sie im Streitfall wertlos.
     */
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    consentVersion: text("consent_version").notNull(),

    /**
     * Stichtag der Löschung. Wird beim Anlegen gesetzt und bei jeder
     * Statusänderung neu berechnet, siehe src/lib/retention.ts.
     */
    purgeAfter: date("purge_after").notNull(),
    /** Gesetzt, sobald der Datensatz anonymisiert wurde. */
    anonymizedAt: timestamp("anonymized_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("candidates_ref_idx").on(table.ref),
    index("candidates_status_idx").on(table.status),
    index("candidates_plz_idx").on(table.postalCode),
    index("candidates_purge_idx").on(table.purgeAfter),
  ],
);

export const candidateSkills = pgTable(
  "candidate_skills",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    skill: text("skill").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.candidateId, table.skill] }),
    index("candidate_skills_skill_idx").on(table.skill),
  ],
);

export const candidateLanguages = pgTable(
  "candidate_languages",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    language: text("language").notNull(),
    level: text("level").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.candidateId, table.language] }),
    index("candidate_languages_lang_idx").on(table.language),
  ],
);

export const candidateAvailability = pgTable(
  "candidate_availability",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
  },
  (table) => [primaryKey({ columns: [table.candidateId, table.kind] })],
);

export const candidateShifts = pgTable(
  "candidate_shifts",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    shift: text("shift").notNull(),
  },
  (table) => [primaryKey({ columns: [table.candidateId, table.shift] })],
);

export const candidatePermits = pgTable(
  "candidate_permits",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    permit: text("permit").notNull(),
  },
  (table) => [primaryKey({ columns: [table.candidateId, table.permit] })],
);

export const candidateTags = pgTable(
  "candidate_tags",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    tag: text("tag").notNull(),
    /** auto = aus den Angaben abgeleitet, manual = von Hand vergeben. */
    origin: text("origin").notNull().default("auto"),
  },
  (table) => [
    primaryKey({ columns: [table.candidateId, table.tag] }),
    index("candidate_tags_tag_idx").on(table.tag),
  ],
);

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    disabledAt: timestamp("disabled_at", { withTimezone: true }),
  },
  (table) => [uniqueIndex("admin_users_email_idx").on(table.email)],
);

/**
 * Sitzungen. Gespeichert wird nur der Hash des Tokens: wer die Datenbank
 * liest, kann sich damit trotzdem nicht anmelden.
 */
export const adminSessions = pgTable(
  "admin_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    adminId: integer("admin_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => [index("admin_sessions_expiry_idx").on(table.expiresAt)],
);

/**
 * Änderungsprotokoll. Verlangt die Rechenschaftspflicht aus Art. 5 Abs. 2
 * DSGVO: bei einer Auskunft muss nachvollziehbar sein, wer wann welchen
 * Datensatz verändert hat.
 */
export const auditLog = pgTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
    adminId: integer("admin_id").references(() => adminUsers.id, { onDelete: "set null" }),
    candidateId: integer("candidate_id").references(() => candidates.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    detail: text("detail"),
  },
  (table) => [index("audit_log_candidate_idx").on(table.candidateId)],
);

/**
 * Postleitzahlen mit Mittelpunkt. Einmalig eingespielt.
 * Ersetzt einen Geodienst: die Entfernung zwischen Kandidat und Einsatzort
 * wird lokal gerechnet, es geht keine Adresse an einen Dritten.
 */
export const postalCodes = pgTable(
  "postal_codes",
  {
    plz: text("plz").primaryKey(),
    city: text("city").notNull(),
    lat: numeric("lat", { precision: 9, scale: 6 }).notNull(),
    lng: numeric("lng", { precision: 9, scale: 6 }).notNull(),
  },
  (table) => [index("postal_codes_city_idx").on(table.city)],
);

export type CandidateRow = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
