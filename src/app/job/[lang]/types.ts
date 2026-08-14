/**
 * Rückgabe des Server Action.
 * Liegt in einer eigenen Datei: ein Modul mit "use server" darf nur
 * asynchrone Funktionen exportieren, Typen und Konstanten nicht.
 */
export type SubmitResult =
  | { ok: true; ref: string }
  | { ok: false; fieldErrors: Record<string, string> };
