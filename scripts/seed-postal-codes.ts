import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { db, postalCodes } from "../src/db";
import { loadEnv } from "./env";

loadEnv();

/**
 * Einspielen des Postleitzahlenverzeichnisses.
 *
 * Aufruf: npm run db:seed
 *
 * Erwartet data/postal-codes.json im Format
 *   [{ "plz": "41061", "city": "Mönchengladbach", "lat": 51.19, "lng": 6.44 }]
 *
 * Warum lokal und nicht über einen Geodienst: für die Entfernung zwischen
 * Wohnort und Einsatzort müsste sonst bei jeder Auswahl eine Adresse an einen
 * Dritten gehen. Das Verzeichnis ist klein genug, um es mitzuführen, und
 * ändert sich praktisch nie.
 *
 * Quelle: zauberware/german-postal-codes (MIT) oder OpenGeoDB.
 */
type Entry = { plz: string; city: string; lat: number; lng: number };

async function main() {
  const path = resolve(process.cwd(), "data/postal-codes.json");

  let entries: Entry[];
  try {
    entries = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    console.error(
      `Datei nicht gefunden: ${path}\n` +
        "Ohne Verzeichnis rechnet die Auswahl ohne Entfernung weiter, " +
        "die Bewertung wird dadurch aber ungenauer.",
    );
    process.exit(1);
  }

  const rows = entries
    .filter((entry) => /^[0-9]{5}$/.test(entry.plz) && entry.lat && entry.lng)
    .map((entry) => ({
      plz: entry.plz,
      city: entry.city,
      lat: String(entry.lat),
      lng: String(entry.lng),
    }));

  // In Blöcken einfügen: ein einzelnes Statement mit 8000 Zeilen läuft in
  // Parameterlimits.
  const size = 500;
  for (let i = 0; i < rows.length; i += size) {
    await db
      .insert(postalCodes)
      .values(rows.slice(i, i + size))
      .onConflictDoNothing();
  }

  console.log(`${rows.length} Postleitzahlen eingespielt.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
