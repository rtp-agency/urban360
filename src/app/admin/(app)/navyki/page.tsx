import Link from "next/link";
import { ABILITY_GROUPS, abilityGroupLabels, abilityLabels } from "@/content/abilities";
import { tr } from "@/content/application";
import { t } from "@/content/admin";
import { abilityCounts, abilityFreeText } from "@/lib/candidates";

/**
 * Сводка по навыкам.
 *
 * Отвечает на вопрос «что мы вообще умеем как база», а не «кого поставить на
 * объект»: подбор по-прежнему считается по видам работ, см. lib/matching.ts.
 * Поэтому здесь нет ни Match%, ни статусов — только сколько человек владеет
 * каждым навыком.
 *
 * Полоска рядом с числом отмеряется от самого частого навыка, а не от общего
 * числа кандидатов. Иначе при базе в тысячу человек все полоски были бы
 * одинаково короткими и картинка перестала бы что-либо показывать.
 *
 * Навыки с нулём тоже показываются. Пустая строка — это тоже ответ: она
 * говорит, что такого человека у нас нет, и её отсутствие в списке читалось
 * бы как «не спрашивали».
 */
export default async function AbilitiesPage() {
  const [counts, freeText] = await Promise.all([abilityCounts(), abilityFreeText()]);

  const peak = Math.max(1, ...Object.values(counts));
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.abilitiesTitle}</h1>
      <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-muted">{t.abilitiesLead}</p>

      {total === 0 ? (
        <p className="mt-10 text-[15px] text-muted">{t.abilitiesEmpty}</p>
      ) : (
        <div className="mt-10 grid gap-x-10 gap-y-9 lg:grid-cols-2">
          {ABILITY_GROUPS.map((group) => {
            const rows = group.abilities.map((ability) => ({
              ability,
              label: tr(abilityLabels[ability], "ru"),
              count: counts[ability] ?? 0,
            }));
            const groupTotal = rows.reduce((sum, row) => sum + row.count, 0);

            return (
              <section key={group.id} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2">
                  <h2 className="text-[15px] font-semibold tracking-tight text-ink">
                    {tr(abilityGroupLabels[group.id], "ru")}
                  </h2>
                  <span className="u-nums text-[13px] text-muted">{groupTotal}</span>
                </div>

                <ul className="mt-3 flex flex-col">
                  {rows
                    /* Внутри группы — по убыванию: сверху то, чего у нас
                       много, снизу пробелы. Порядок каталога здесь не
                       информативен. */
                    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ru"))
                    .map((row) => (
                      <li key={row.ability} className="flex items-center gap-3 py-1.5">
                        <span className="flex-1 truncate text-[14px] text-ink">
                          {row.count > 0 ? (
                            <Link
                              href={`/admin/kandidaten?ability=${row.ability}`}
                              title={t.abilitiesFilterHint}
                              className="underline decoration-hairline underline-offset-2 transition-colors hover:decoration-accent"
                            >
                              {row.label}
                            </Link>
                          ) : (
                            <span className="text-muted">{row.label}</span>
                          )}
                        </span>

                        {/* Полоска чисто декоративная: значение стоит рядом
                            цифрой, поэтому от screen reader она скрыта. */}
                        <span
                          aria-hidden
                          className="hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-sunken sm:block"
                        >
                          <span
                            className="block h-full rounded-full bg-accent"
                            style={{ width: `${Math.round((row.count / peak) * 100)}%` }}
                          />
                        </span>

                        <span
                          className={`u-nums w-8 shrink-0 text-right text-[14px] ${
                            row.count > 0 ? "font-medium text-ink" : "text-muted"
                          }`}
                        >
                          {row.count}
                        </span>
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      <section className="mt-14 border-t border-hairline pt-8">
        <h2 className="text-[17px] font-semibold tracking-tight text-ink">
          {t.abilitiesOtherTitle}
        </h2>
        <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-muted">
          {t.abilitiesOtherLead}
        </p>

        {freeText.length === 0 ? (
          <p className="mt-5 text-[15px] text-muted">{t.abilitiesOtherEmpty}</p>
        ) : (
          <ul className="mt-5 flex flex-col gap-2">
            {freeText.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Link
                  href={`/admin/kandidaten/${entry.id}`}
                  className="u-data text-[13px] text-accent underline underline-offset-2"
                >
                  {entry.ref}
                </Link>
                <span className="text-[15px] text-ink">{entry.text}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
