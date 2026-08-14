import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LEVELS,
  STATUSES,
  type AvailabilityKind,
  type LanguageCode,
  type LanguageLevel,
  type License,
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
import { LEVEL_LABEL, STATUS_LABEL, t } from "@/content/admin";
import { getCandidate } from "@/lib/candidates";
import { retentionNote } from "@/lib/retention";
import { ContactLinks, StatusBadge, TagChip } from "@/components/admin/ui";
import { addTag, anonymizeCandidate, removeTag, updateCandidate } from "./actions";

const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-3.5 h-11 " +
  "text-[15px] text-ink focus:border-accent focus:outline-none";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-hairline py-3.5 sm:grid-cols-[12rem_1fr] sm:gap-5">
      <dt className="text-[13px] font-medium text-ink">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-muted">{children || t.noValue}</dd>
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
        {t.backToList}
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {candidate.firstName} {candidate.lastName}
        </h1>
        <StatusBadge status={status} />
        <span className="font-mono text-[13px] text-muted">{candidate.ref}</span>
        {candidate.level ? (
          <span className="text-[13px] text-muted">
            {LEVEL_LABEL[candidate.level as keyof typeof LEVEL_LABEL]}
          </span>
        ) : null}
      </div>

      {candidate.anonymizedAt ? (
        <p className="mt-4 rounded-[var(--radius-field)] bg-sunken px-4 py-3 text-[14px] text-danger">
          {t.anonymized}
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
          <h2 className="text-[17px] font-semibold tracking-tight text-ink">{t.sectionForm}</h2>
          <dl className="mt-3 border-b border-hairline">
            <Row label={t.fPhone}>{candidate.phone}</Row>
            <Row label={t.fWhatsapp}>{candidate.whatsapp ?? t.fWhatsappSame}</Row>
            <Row label={t.fEmail}>{candidate.email}</Row>
            <Row label={t.fCity}>
              {candidate.postalCode} {candidate.city}
            </Row>
            <Row label={t.fRadius}>{t.upTo(candidate.radiusKm)}</Row>
            <Row label={t.fCar}>{candidate.hasCar ? t.fCarYes : t.fCarNo}</Row>
            <Row label={t.fLicense}>
              {candidate.licenses
                .map((l) => tr(licenseLabels[l as License], "ru"))
                .join(", ")}
            </Row>
            <Row label={t.fLanguages}>
              {candidate.languages
                .map(
                  (entry) =>
                    `${tr(languageLabels[entry.language as LanguageCode], "ru")} (${tr(
                      languageLevelLabels[entry.level as LanguageLevel],
                      "ru",
                    )})`,
                )
                .join(", ")}
            </Row>
            <Row label={t.fSkills}>
              {candidate.skills.map((s) => tr(skillLabels[s as Skill], "ru")).join(", ")}
            </Row>
            <Row label={t.fExperience}>
              {candidate.experienceNote ? (
                <span className="whitespace-pre-line">{candidate.experienceNote}</span>
              ) : null}
            </Row>
            <Row label={t.fScope}>
              {candidate.availability
                .map((k) => tr(availabilityLabels[k as AvailabilityKind], "ru"))
                .join(", ")}
            </Row>
            <Row label={t.fShift}>
              {candidate.shifts.map((s) => tr(shiftLabels[s as Shift], "ru")).join(", ")}
            </Row>
            <Row label={t.fFrom}>{candidate.availableFrom ?? t.fFromNow}</Row>
            <Row label={t.fHours}>{candidate.hoursPerWeek ?? ""}</Row>
            <Row label={t.fPermit}>
              {candidate.permits.map((p) => tr(permitLabels[p as Permit], "ru")).join(", ")}
            </Row>
            <Row label={t.fFilled}>
              {candidate.createdAt.toLocaleString("ru-RU")} · {t.fLanguageOfForm}{" "}
              {candidate.locale}
            </Row>
            <Row label={t.fConsent}>
              {candidate.consentAt.toLocaleString("ru-RU")} · {t.fConsentVersion}{" "}
              {candidate.consentVersion}
            </Row>
            <Row label={t.fRetention}>{retentionNote(candidate.purgeAfter)}</Row>
          </dl>
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">{t.sectionEdit}</h2>
            <form action={updateCandidate} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="id" value={candidate.id} />

              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="text-[13px] font-medium text-ink">
                  {t.eStatus}
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
                  {t.eLevel}
                </label>
                <select id="level" name="level" defaultValue={candidate.level ?? ""} className={field}>
                  <option value="">{t.eLevelNone}</option>
                  {LEVELS.map((value) => (
                    <option key={value} value={value}>
                      {LEVEL_LABEL[value]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="rate" className="text-[13px] font-medium text-ink">
                  {t.eRate}
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
                  {t.eNote}
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
                {t.eSave}
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">{t.sectionTags}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.tags.map((tag) => (
                <form key={tag} action={removeTag}>
                  <input type="hidden" name="id" value={candidate.id} />
                  <input type="hidden" name="tag" value={tag} />
                  <button type="submit" title={t.tagRemoveHint} className="cursor-pointer">
                    <TagChip tag={tag} />
                  </button>
                </form>
              ))}
              {candidate.tags.length === 0 ? (
                <p className="text-[14px] text-muted">{t.tagsEmpty}</p>
              ) : null}
            </div>

            <form action={addTag} className="mt-4 flex gap-2">
              <input type="hidden" name="id" value={candidate.id} />
              <input
                name="tag"
                placeholder={t.tagNew}
                className={`${field} uppercase`}
                maxLength={32}
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center rounded-full border border-hairline px-4 text-[15px] text-ink hover:bg-sunken"
              >
                {t.tagAdd}
              </button>
            </form>
          </section>

          {!candidate.anonymizedAt ? (
            <section className="border-t border-hairline pt-6">
              <h2 className="text-[15px] font-medium text-ink">{t.deleteTitle}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{t.deleteLead}</p>
              <form action={anonymizeCandidate} className="mt-3">
                <input type="hidden" name="id" value={candidate.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-full border border-hairline px-4 text-[14px] text-danger hover:bg-sunken"
                >
                  {t.deleteButton}
                </button>
              </form>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
