import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/site.config";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Liest den passenden Sprachwert aus einem Localized-Objekt. */
export function t<T extends Partial<Record<Locale, string>>>(entry: T, locale: Locale): string {
  return entry[locale] ?? entry[DEFAULT_LOCALE] ?? "";
}

/** Baut einen internen Pfad mit Sprachpräfix. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Ersetzt {{platzhalter}} in Rechtstexten durch die Werte aus site.config.
 * Fehlt ein Wert, bleibt der Platzhalter sichtbar. Das ist Absicht: ein
 * unbemerkt leeres Impressumsfeld ist gefährlicher als ein auffälliges.
 */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => values[key] ?? match);
}

export const htmlLang: Record<Locale, string> = {
  de: "de-DE",
  en: "en",
};
