import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Lädt .env.local für Werkzeuge außerhalb von Next.
 *
 * Die Anwendung selbst bekommt die Variablen von Next. drizzle-kit und die
 * Skripte laufen als nackte Node-Prozesse und wissen nichts davon. Statt eine
 * weitere Abhängigkeit dafür aufzunehmen, genügt dieser Leser: das Format ist
 * KEY=VALUE pro Zeile, mehr wird hier nicht gebraucht.
 */
export function loadEnv(file = ".env.local"): void {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Bereits gesetzte Werte gewinnen: eine echte Umgebungsvariable soll die
    // Datei überschreiben können, nicht umgekehrt.
    if (!process.env[key]) process.env[key] = value;
  }
}
