import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LEVELS,
  STATUSES,
  type AvailabilityKind,
  type LanguageCode,
  type LanguageLevel,
  type Permit,
  type Shift,
  type Skill,
  type Status,
} from "@/content/recruiting";
import {
  availabilityLabels,
  languageLabels,
  languageLevelLabels,
  licenseLabels,
  permitLabels,
  shiftLabels,
  skillLabels,
  tr,
} from "@/content/application";
import { getCandidate } from "@/lib/candidates";
import { retentionNote } from "@/lib/retention";
import { ContactLinks, LEVEL_LABEL, STATUS_LABEL, StatusBadge, TagChip } from "@/components/admin/ui";
import { addTag, anonymizeCandidate, removeTag, updateCandidate } from "./actions";

const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-3.5 h-11 " +
  "text-[15px] text-ink focus:border-accent focus:outline-none";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-hairline py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-5">
      <dt className="text-[13px] font-medium text-ink">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-muted">{children || "keine Angabe"}</dd>
    </div>
  );
}

export default async function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = await getCandidate(Number(id));
  if (!candidate) notFound();

  const status = candidate.status as Status;

  return (
    <>
      <Link href="/admin/kandidaten" className="text-[14px] text-muted hover:text-ink">
        Zurück zur Liste
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {candidate.firstName} {candidate.lastName}
        </h1>
        <StatusBadge status={status} />
        <span className="font-mono text-[13px] text-muted">{candidate.ref}</span>
        {candidate.level ? (
          <span className="text-[13px] text-muted">{LEVEL_LABEL[candidate.level]}</span>
        ) : null}
      </div>

      {candidate.anonymizedAt ? (
        <p className="mt-4 rounded-[var(--radius-field)] bg-sunken px-4 py-3 text-[14px] text-danger">
          Dieser Datensatz wurde auf Verlangen anonymisiert und enthält keine personenbezogenen
          Daten mehr.
        </p>
      ) : (
        <div className="mt-5">
          <ContactLinks
            phone={candidate.phone}
            whatsapp={candidate.whatsapp}
            email={candidate.email}
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <div>
          <h2 className="text-[17px] font-semibold tracking-tight text-ink">Angaben aus dem Bogen</h2>
          <dl className="mt-3 border-b border-hairline">
            <Row label="Telefon">{candidate.phone}</Row>
            <Row label="WhatsApp">{candidate.whatsapp ?? "gleiche Nummer"}</Row>
            <Row label="E-Mail">{candidate.email}</Row>
            <Row label="Ort">
              {candidate.postalCode} {candidate.city}
            </Row>
            <Row label="Einsatzradius">bis {candidate.radiusKm} km</Row>
            <Row label="Auto">{candidate.hasCar ? "vorhanden" : "nein"}</Row>
            <Row label="Führerschein">
              {candidate.licenses.length
                ? candidate.licenses
                    .map((l) => tr(licenseLabels[l as keyof typeof licenseLabels], "de"))
                    .join(", ")
                : ""}
            </Row>
            <Row label="Sprachen">
              {candidate.languages
                .map(
                  (entry) =>
                    `${tr(languageLabels[entry.language as LanguageCode], "de")} (${tr(
                      languageLevelLabels[entry.level as LanguageLevel],
                      "de",
                    )})`,
                )
                .join(", ")}
            </Row>
            <Row label="Tätigkeiten">
              {candidate.skills.map((s) => tr(skillLabels[s as Skill], "de")).join(", ")}
            </Row>
            <Row label="Erfahrung">
              {candidate.experienceNote ? (
                <span className="whitespace-pre-line">{candidate.experienceNote}</span>
              ) : null}
            </Row>
            <Row label="Umfang">
              {candidate.availability
                .map((k) => tr(availabilityLabels[k as AvailabilityKind], "de"))
                .join(", ")}
            </Row>
            <Row label="Tageszeit">
              {candidate.shifts.map((s) => tr(shiftLabels[s as Shift], "de")).join(", ")}
            </Row>
            <Row label="Verfügbar ab">{candidate.availableFrom ?? "sofort"}</Row>
            <Row label="Stunden pro Woche">{candidate.hoursPerWeek ?? ""}</Row>
            <Row label="Status in Deutschland">
              {candidate.permits.map((p) => tr(permitLabels[p as Permit], "de")).join(", ")}
            </Row>
            <Row label="Bogen ausgefüllt">
              {candidate.createdAt.toLocaleString("de-DE")} · Sprache {candidate.locale}
            </Row>
            <Row label="Einwilligung">
              {candidate.consentAt.toLocaleString("de-DE")} · Fassung {candidate.consentVersion}
            </Row>
            <Row label="Aufbewahrung">{retentionNote(candidate.purgeAfter)}</Row>
          </dl>
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">Bearbeitung</h2>
            <form action={updateCandidate} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="id" value={candidate.id} />

              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="text-[13px] font-medium text-ink">
                  Status
                </label>
                <select id="status" name="status" defaultValue={status} className={field}>
                  {STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {STATUS_LABEL[value]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="level" className="text-[13px] font-medium text-ink">
                  Erfahrungsstufe
                </label>
                <select id="level" name="level" defaultValue={candidate.level ?? ""} className={field}>
                  <option value="">nicht bewertet</option>
                  {LEVELS.map((value) => (
                    <option key={value} value={value}>
                      {LEVEL_LABEL[value]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="rate" className="text-[13px] font-medium text-ink">
                  Stundensatz in Euro
                </label>
                <input
                  id="rate"
                  name="hourlyRate"
                  inputMode="decimal"
                  defaultValue={candidate.hourlyRate ?? ""}
                  className={field}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="note" className="text-[13px] font-medium text-ink">
                  Interner Vermerk
                </label>
                <textarea
                  id="note"
                  name="adminNote"
                  rows={4}
                  defaultValue={candidate.adminNote ?? ""}
                  className={`${field} h-auto py-2.5`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-[15px] font-medium text-accent-ink hover:opacity-90"
              >
                Speichern
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">Schlagworte</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.tags.map((tag) => (
                <form key={tag} action={removeTag}>
                  <input type="hidden" name="id" value={candidate.id} />
                  <input type="hidden" name="tag" value={tag} />
                  <button type="submit" title="Entfernen" className="cursor-pointer">
                    <TagChip tag={tag} />
                  </button>
                </form>
              ))}
              {candidate.tags.length === 0 ? (
                <p className="text-[14px] text-muted">Noch keine Schlagworte.</p>
              ) : null}
            </div>

            <form action={addTag} className="mt-4 flex gap-2">
              <input type="hidden" name="id" value={candidate.id} />
              <input
                name="tag"
                placeholder="Neues Schlagwort"
                className={`${field} uppercase`}
                maxLength={32}
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center rounded-full border border-hairline px-4 text-[15px] text-ink hover:bg-sunken"
              >
                Hinzufügen
              </button>
            </form>
          </section>

          {!candidate.anonymizedAt ? (
            <section className="border-t border-hairline pt-6">
              <h2 className="text-[15px] font-medium text-ink">Auf Verlangen löschen</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Entfernt alle personenbezogenen Angaben unwiderruflich. Zu verwenden, wenn die
                betroffene Person Löschung nach Art. 17 DSGVO verlangt.
              </p>
              <form action={anonymizeCandidate} className="mt-3">
                <input type="hidden" name="id" value={candidate.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-full border border-hairline px-4 text-[14px] text-danger hover:bg-sunken"
                >
                  Daten anonymisieren
                </button>
              </form>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
