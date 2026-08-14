import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { db, adminUsers } from "../src/db";
import { hashPassword } from "../src/lib/auth";
import { loadEnv } from "./env";

loadEnv();

/**
 * Anlegen eines Verwaltungszugangs.
 *
 * Aufruf: npm run admin:create
 *
 * Es gibt bewusst keine Selbstregistrierung im Browser. Wer Zugriff auf
 * Bewerberdaten bekommt, wird von Hand eingetragen.
 */
async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  const name = (await rl.question("Name: ")).trim();
  const email = (await rl.question("E-Mail: ")).trim().toLowerCase();
  const password = (await rl.question("Passwort (mindestens 12 Zeichen): ")).trim();
  rl.close();

  if (!name || !email) {
    console.error("Name und E-Mail sind erforderlich.");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Das Passwort ist zu kurz. Mindestens 12 Zeichen.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await db
    .insert(adminUsers)
    .values({ name, email, passwordHash })
    .onConflictDoUpdate({ target: adminUsers.email, set: { name, passwordHash } });

  console.log(`Zugang für ${email} eingerichtet.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
