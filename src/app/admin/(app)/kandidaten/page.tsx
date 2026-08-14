import Link from "next/link";
import { SKILLS, STATUSES, type Skill, type Status } from "@/content/recruiting";
import { STATUS_LABEL, t } from "@/content/admin";
import { candidateCounts, listCandidates, usedTags } from "@/lib/candidates";
import { retentionNote } from "@/lib/retention";
import { ContactLinks, FilterLink, StatusBadge, TagChip } from "@/components/admin/ui";

type Search = Promise<{
  q?: string;
  status?: string;
  tag?: string;
  skill?: string;
  auto?: string;
}>;

function buildHref(
  base: Record<string, string | undefined>,
  patch: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...base, ...patch })) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/admin/kandidaten?${qs}` : "/admin/kandidaten";
}

export default async function CandidatesPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const status = STATUSES.includes(sp.status as Status) ? (sp.status as Status) : undefined;
  const skill = SKILLS.includes(sp.skill as Skill) ? (sp.skill as Skill) : undefined;

  const [rows, tags, counts] = await Promise.all([
    listCandidates({
      query: sp.q?.trim() || undefined,
      status,
      tag: sp.tag,
      skill,
      hasCar: sp.auto === "1" ? true : undefined,
    }),
    usedTags(),
    candidateCounts(),
  ]);

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const base = { q: sp.q, status: sp.status, tag: sp.tag, skill: sp.skill, auto: sp.auto };

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.listTitle}</h1>
        <p className="text-[14px] text-muted">{t.listShown(rows.length, total)}</p>
      </div>

      {/* Обычная форма без JavaScript: список должен работать и тогда,
          когда в дороге скрипт не догрузился. */}
      <form method="get" className="mt-6 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder={t.searchPlaceholder}
          className="h-11 w-full max-w-[420px] rounded-[var(--radius-field)] border border-hairline bg-surface px-4 text-[16px] text-ink focus:border-accent focus:outline-none"
        />
        {status ? <input type="hidden" name="status" value={status} /> : null}
        {sp.tag ? <input type="hidden" name="tag" value={sp.tag} /> : null}
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-accent px-5 text-[15px] font-medium text-accent-ink"
        >
          {t.searchSubmit}
        </button>
      </form>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterLink href={buildHref(base, { status: undefined })} active={!status}>
            {t.filterAll}
          </FilterLink>
          {STATUSES.map((value) => (
            <FilterLink
              key={value}
              href={buildHref(base, { status: value })}
              active={status === value}
            >
              {STATUS_LABEL[value]}
              {counts[value] ? <span className="ml-1.5 opacity-60">{counts[value]}</span> : null}
            </FilterLink>
          ))}
          <FilterLink
            href={buildHref(base, { auto: sp.auto === "1" ? undefined : "1" })}
            active={sp.auto === "1"}
          >
            {t.filterCar}
          </FilterLink>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <FilterLink
                key={tag}
                href={buildHref(base, { tag: sp.tag === tag ? undefined : tag })}
                active={sp.tag === tag}
              >
                {tag}
              </FilterLink>
            ))}
          </div>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <div className="mt-12 rounded-[var(--radius-panel)] border border-hairline px-6 py-16 text-center">
          <p className="text-[17px] text-ink">{t.emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            {total === 0 ? t.emptyFirst : t.emptyFiltered}
          </p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.id}>
              <div className="u-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href={`/admin/kandidaten/${row.id}`}
                      className="text-[17px] font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {row.firstName} {row.lastName}
                    </Link>
                    <StatusBadge status={row.status as Status} />
                    <span className="font-mono text-[12px] text-muted">{row.ref}</span>
                  </div>

                  <p className="mt-1.5 text-[14px] text-muted">
                    {row.postalCode} {row.city} · {t.upTo(row.radiusKm)}
                    {row.hasCar ? ` · ${t.hasCar}` : ""}
                  </p>

                  {row.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {row.tags.slice(0, 8).map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </div>
                  ) : null}

                  <p className="mt-3 text-[12px] text-muted">{retentionNote(row.purgeAfter)}</p>
                </div>

                <ContactLinks phone={row.phone} whatsapp={row.whatsapp} email={row.email} compact />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
