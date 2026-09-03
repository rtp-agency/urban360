"use client";

import { useMemo, useState } from "react";
import {
  ABILITY_GROUPS,
  abilityGroupLabels,
  abilityLabels,
  type Ability,
  type AbilityGroupId,
} from "@/content/abilities";
import { ui } from "@/content/application";
import type { AppLocale } from "@/content/recruiting";

/**
 * Auswahl der Fähigkeiten.
 *
 * Der Katalog hat über hundert Einträge. Als eine Liste von Kästchen wäre er
 * unbenutzbar: auf dem Telefon sind das mehr als zwanzig Bildschirmhöhen, und
 * wer die eigene Fertigkeit nicht in den ersten zehn Sekunden sieht, klickt
 * irgendetwas an oder bricht ab. Drei Mittel dagegen:
 *
 * 1. GRUPPEN, ZUGEKLAPPT. Sichtbar sind zuerst dreizehn Zeilen statt hundert
 *    Kästchen. Die Gruppe zeigt an, wie viel darin schon gewählt ist, damit
 *    man Zugeklapptes nicht aus Versehen übersieht.
 * 2. SUCHE. Wer "Pool" tippt, bekommt die drei passenden Einträge quer über
 *    alle Gruppen. Gesucht wird zusätzlich im deutschen Namen und im
 *    Schlüssel: viele Kandidaten kennen den Fachbegriff auf Deutsch von der
 *    Baustelle, auch wenn sie den Bogen auf Russisch ausfüllen.
 * 3. GEWÄHLTES OBEN. Die Auswahl steht vollständig über dem Katalog und ist
 *    dort einzeln abwählbar. Ohne das müsste man zum Prüfen alle Gruppen
 *    wieder aufklappen.
 *
 * Umgesetzt mit echten <input type="checkbox"> in <label>. Ein Kästchen aus
 * <div> mit onClick wäre für Tastatur und Screenreader nichts, und die
 * Mehrfachauswahl ist genau das, wofür es Kästchen gibt.
 */

/**
 * Vergleichsform für die Suche: Kleinschreibung, Umlaute aufgelöst, Akzente
 * entfernt. Ohne das findet "fussboden" kein "Fußboden" und "прибирання"
 * kein "прибира" mit anderer Groß-/Kleinschreibung.
 */
function fold(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function AbilityPicker({
  locale,
  selected,
  onToggle,
}: {
  locale: AppLocale;
  selected: Ability[];
  onToggle: (ability: Ability) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<AbilityGroupId[]>([]);

  const tr = (entry: Record<AppLocale, string>) => entry[locale];

  /* Suchindex einmal je Sprache, nicht bei jedem Tastendruck neu. */
  const haystack = useMemo(() => {
    const map = new Map<string, string>();
    for (const group of ABILITY_GROUPS) {
      for (const ability of group.abilities) {
        const label = abilityLabels[ability];
        map.set(ability, fold([label[locale], label.de, ability].join(" ")));
      }
    }
    return map;
  }, [locale]);

  const needle = fold(query.trim());
  const searching = needle.length > 0;

  const matches = useMemo(() => {
    if (!searching) return null;
    const found = new Set<string>();
    for (const [ability, text] of haystack) {
      if (text.includes(needle)) found.add(ability);
    }
    return found;
  }, [haystack, needle, searching]);

  const selectedSet = new Set<string>(selected);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={tr(ui.abilitySearch)}
        aria-label={tr(ui.abilitySearch)}
        className="h-12 w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-4 text-[16px] text-ink transition-colors focus:border-accent focus:outline-none"
      />

      {/* Die getroffene Auswahl. Steht über dem Katalog, weil sie das
          Ergebnis ist und nicht das Angebot. */}
      {selected.length > 0 ? (
        <div className="rounded-[var(--radius-field)] bg-accent-soft px-4 py-3">
          <p className="text-[13px] font-medium text-accent">
            {tr(ui.abilitiesSelected)}: {selected.length}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {selected.map((ability) => (
              <li key={ability}>
                <button
                  type="button"
                  onClick={() => onToggle(ability)}
                  aria-label={`${tr(abilityLabels[ability])} — ${tr(ui.abilityRemove)}`}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[14px] text-ink transition-opacity hover:opacity-70"
                >
                  {tr(abilityLabels[ability])}
                  <span aria-hidden className="text-muted">
                    ×
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        {ABILITY_GROUPS.map((group) => {
          const visible = searching
            ? group.abilities.filter((ability) => matches?.has(ability))
            : group.abilities;

          /* Bei aktiver Suche fallen leere Gruppen ganz weg, statt als
             zugeklappte Zeile ohne Inhalt stehen zu bleiben. */
          if (searching && visible.length === 0) return null;

          const chosen = group.abilities.filter((ability) => selectedSet.has(ability)).length;
          const expanded = searching || open.includes(group.id);

          return (
            <div
              key={group.id}
              className="overflow-hidden rounded-[var(--radius-field)] border border-hairline bg-surface"
            >
              <button
                type="button"
                onClick={() =>
                  setOpen((prev) =>
                    prev.includes(group.id)
                      ? prev.filter((id) => id !== group.id)
                      : [...prev, group.id],
                  )
                }
                aria-expanded={expanded}
                /* Bei aktiver Suche ist die Gruppe ohnehin offen; die
                   Schaltfläche würde dann nur einen Zustand umschalten, den
                   man nicht sieht. */
                disabled={searching}
                className="flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left disabled:cursor-default"
              >
                <span className="flex-1 text-[15px] font-medium text-ink">
                  {tr(abilityGroupLabels[group.id])}
                </span>

                {chosen > 0 ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[12px] font-medium text-accent-ink">
                    {chosen}
                  </span>
                ) : null}

                {!searching ? (
                  <span
                    aria-hidden
                    className={`text-muted transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                ) : null}
              </button>

              {expanded ? (
                <div className="grid gap-1 border-t border-hairline px-2 py-2 sm:grid-cols-2">
                  {visible.map((ability) => (
                    <label
                      key={ability}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] px-2 py-1.5 text-[15px] leading-snug text-ink transition-colors hover:bg-sunken"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSet.has(ability)}
                        onChange={() => onToggle(ability)}
                        className="h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                      />
                      {tr(abilityLabels[ability])}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {searching && matches?.size === 0 ? (
        <p className="text-[15px] text-muted">{tr(ui.abilityNoMatch)}</p>
      ) : null}
    </div>
  );
}
