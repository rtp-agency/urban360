import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Datenbankzugang.
 *
 * Verbunden wird ausschließlich vom Server über die Verbindungszeichenfolge.
 * Die Supabase-Bibliothek für den Browser kommt bewusst nicht zum Einsatz:
 * sie würde den Besucher Anfragen an *.supabase.co schicken lassen. Das wäre
 * ein Drittanbieter-Request, der die Content-Security-Policy verletzt und die
 * einwilligungsfreie Bauweise der Seite beendet.
 *
 * Die Verbindung entsteht erst beim ersten Zugriff, nicht beim Import.
 * Andernfalls bräuchte schon der Build eine erreichbare Datenbank, obwohl er
 * nur statische Seiten erzeugt, die damit nichts zu tun haben.
 *
 * In der Entwicklung hängt sie am globalen Objekt, sonst öffnet jeder
 * Hot Reload einen weiteren Pool.
 */

const globalForDb = globalThis as unknown as {
  urbanSql?: ReturnType<typeof postgres>;
  urbanDb?: PostgresJsDatabase<typeof schema>;
};

function connect(): PostgresJsDatabase<typeof schema> {
  if (globalForDb.urbanDb) return globalForDb.urbanDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL fehlt. Ohne Datenbank können weder Bewerbungen gespeichert " +
        "noch die Verwaltung geöffnet werden. Siehe .env.example.",
    );
  }

  const client = postgres(connectionString, {
    // Supabase liefert einen Transaktions-Pooler. Vorbereitete Anweisungen
    // funktionieren darüber nicht und müssen abgeschaltet werden.
    prepare: false,
    max: 5,
    idle_timeout: 20,
  });

  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.urbanSql = client;
    globalForDb.urbanDb = instance;
  }

  return instance;
}

/**
 * Steht wie eine gewöhnliche Instanz zur Verfügung, verbindet sich aber erst,
 * wenn tatsächlich etwas abgefragt wird.
 */
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, property, receiver) {
    return Reflect.get(connect(), property, receiver);
  },
  apply(_target, thisArg, args) {
    return Reflect.apply(connect() as never, thisArg, args);
  },
});

export * from "./schema";

/** Ist eine Datenbank konfiguriert? Für Seiten, die ohne sie auskommen sollen. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
