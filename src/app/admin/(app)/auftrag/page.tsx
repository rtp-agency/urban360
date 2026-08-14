import Link from "next/link";
import { SHIFTS, SKILLS, type Shift, type Skill } from "@/content/recruiting";
import { shiftLabels, skillLabels, tr } from "@/content/application";
import { candidatesForOrder } from "@/lib/candidates";
import { rankCandidates, WEIGHTS } from "@/lib/matching";
import { orderSchema } from "@/lib/validation";
import { ContactLinks, LEVEL_LABEL, StatusBadge } from "@/components/admin/ui";
import type { Status } from "@/content/recruiting";

type Search = Promise<Record<string, string | string[] | undefined>>;

const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-3.5 h-11 " +
  "text-[15px] text-ink focus:border-accent focus:outline-none";

function asArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function OrderPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const submitted = Object.keys(sp).length > 0;

  const parsed = orderSchema.safeParse({
    postalCode: typeof sp.plz === "string" ? sp.plz : "",
    city: typeof sp.city === "string" ? sp.city : "",
    skills: asArray(sp.skill).filter((s): s is Skill => SKILLS.includes(s as Skill)),
    shifts: asArray(sp.shift).filter((s): s is Shift => SHIFTS.includes(s as Shift)),
    date: typeof sp.date === "string" ? sp.date : "",
    needsCar: sp.auto === "1",
    needsGerman: sp.de === "1",
    headcount: typeof sp.count === "string" ? sp.count : 1,
  });

  const order = parsed.success ? parsed.data : null;
  const pool = submitted && order ? await candidatesForOrder(order.postalCode) : [];
  const ranked = order ? rankCandidates(pool, order) : [];

  const selectedSkills = new Set(order?.skills ?? []);
  const selectedShifts = new Set(order?.shifts ?? []);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Auswahl für einen Auftrag</h1>
      <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-muted">
        Auftragsdaten eintragen, die Liste ordnet sich nach Passung. Der Wert setzt sich zusammen
        aus Tätigkeiten ({WEIGHTS.skills}), Entfernung ({WEIGHTS.distance}), Tageszeit (
        {WEIGHTS.availability}), Sprache ({WEIGHTS.language}) und Auto ({WEIGHTS.car}).
      </p>

      <form method="get" className="u-panel mt-8 flex flex-col gap-6 p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="plz" className="text-[13px] font-medium text-ink">
              Postleitzahl des Einsatzorts
            </label>
            <input
              id="plz"
              name="plz"
              inputMode="numeric"
              maxLength={5}
              defaultValue={order?.postalCode ?? ""}
              className={field}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-[13px] font-medium text-ink">
              Ort
            </label>
            <input id="city" name="city" defaultValue={order?.city ?? ""} className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-[13px] font-medium text-ink">
              Datum
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={order?.date ?? ""}
              className={field}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="count" className="text-[13px] font-medium text-ink">
              Anzahl Personen
            </label>
            <input
              id="count"
              name="count"
              type="number"
              min={1}
              max={50}
              defaultValue={order?.headcount ?? 1}
              className={field}
            />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2.5 text-[13px] font-medium text-ink">Tätigkeiten</legend>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <label
                key={skill}
                className={`inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  selectedSkills.has(skill)
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-hairline bg-surface text-muted hover:text-ink"
                }`}
              >
                <input
                  type="checkbox"
                  name="skill"
                  value={skill}
                  defaultChecked={selectedSkills.has(skill)}
                  className="sr-only"
                />
                {tr(skillLabels[skill], "de")}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[13px] font-medium text-ink">Tageszeit</legend>
          <div className="flex flex-wrap gap-2">
            {SHIFTS.map((shift) => (
              <label
                key={shift}
                className={`inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  selectedShifts.has(shift)
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-hairline bg-surface text-muted hover:text-ink"
                }`}
              >
                <input
                  type="checkbox"
                  name="shift"
                  value={shift}
                  defaultChecked={selectedShifts.has(shift)}
                  className="sr-only"
                />
                {tr(shiftLabels[shift], "de")}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2.5 text-[14px] text-ink">
            <input
              type="checkbox"
              name="auto"
              value="1"
              defaultChecked={order?.needsCar}
              className="h-4.5 w-4.5 accent-[var(--color-accent)]"
            />
            Auto erforderlich
          </label>
          <label className="flex items-center gap-2.5 text-[14px] text-ink">
            <input
              type="checkbox"
              name="de"
              value="1"
              defaultChecked={order?.needsGerman}
              className="h-4.5 w-4.5 accent-[var(--color-accent)]"
            />
            Deutsch erforderlich
          </label>

          <button
            type="submit"
            className="ml-auto inline-flex h-11 items-center rounded-full bg-accent px-6 text-[15px] font-medium text-accent-ink hover:opacity-90"
          >
            Passende suchen
          </button>
        </div>
      </form>

      {submitted ? (
        <section className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">
              {ranked.length} passende {ranked.length === 1 ? "Person" : "Personen"}
            </h2>
            {order && ranked.length < order.headcount ? (
              <p className="text-[14px] text-danger">
                Gesucht sind {order.headcount}, gefunden {ranked.length}.
              </p>
            ) : null}
          </div>

          {ranked.length === 0 ? (
            <p className="mt-6 rounded-[var(--radius-panel)] border border-hairline px-6 py-12 text-center text-[15px] text-muted">
              Niemand erfüllt die harten Bedingungen. Radius, Datum oder Autopflicht lockern.
            </p>
          ) : (
            <ul className="mt-6 flex flex-col gap-3">
              {ranked.slice(0, 50).map((result) => (
                <li key={result.candidate.id} className="u-panel p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[15px] font-semibold text-accent"
                      title="Passung"
                    >
                      {result.score}%
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Link
                          href={`/admin/kandidaten/${result.candidate.id}`}
                          className="text-[17px] font-medium text-ink underline-offset-4 hover:underline"
                        >
                          {result.candidate.firstName} {result.candidate.lastName}
                        </Link>
                        <StatusBadge status={result.candidate.status as Status} />
                        {result.candidate.level ? (
                          <span className="text-[13px] text-muted">
                            {LEVEL_LABEL[result.candidate.level]}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-1 text-[14px] text-muted">
                        {result.candidate.postalCode} {result.candidate.city}
                      </p>

                      {/* Begründung sichtbar machen: ein Prozentwert ohne
                          Erklärung wird von der Disposition ignoriert. */}
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
                        {result.reasons.map((reason) => (
                          <li key={reason.label}>
                            {reason.label}
                            <span className="ml-1.5 opacity-60">
                              {reason.earned}/{reason.max}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ContactLinks
                      phone={result.candidate.phone}
                      whatsapp={result.candidate.whatsapp}
                      email={result.candidate.email}
                      compact
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </>
  );
}
