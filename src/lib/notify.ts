import { site } from "@/content/site.config";
import { SKILL_TAGS, type Skill } from "@/content/recruiting";

/**
 * Benachrichtigung über eine neue Bewerbung.
 *
 * WICHTIG, NICHT AUFWEICHEN: die Nachricht enthält keine personenbezogenen
 * Daten. Kein Name, keine Telefonnummer, keine E-Mail, kein Aufenthaltsstatus.
 * Nur Kennung, Ort, Tätigkeitsbereiche und ein Link in die Verwaltung.
 *
 * Grund: Telegram ist ein Anbieter außerhalb der EU. Ein Chatverlauf hat
 * keine Zugriffskontrolle, keine Löschfrist und keinen Auftragsverarbeitungs-
 * vertrag. Namen, Telefonnummern und erst recht der Aufenthaltsstatus dort
 * hineinzuschreiben wäre eine Drittlandübermittlung ohne Rechtsgrundlage.
 * Der Link führt in die passwortgeschützte Verwaltung, wo die Daten liegen
 * und der Zugriff protokolliert wird.
 */

type Payload = {
  ref: string;
  city: string;
  postalCode: string;
  skills: Skill[];
  hasCar: boolean;
  radiusKm: number;
  candidateId: number;
};

export async function notifyNewApplication(payload: Payload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[notify] TELEGRAM_BOT_TOKEN oder TELEGRAM_CHAT_ID fehlt, Meldung wird übersprungen.",
      { ref: payload.ref },
    );
    return;
  }

  // Nur der grobe Bereich, keine vollständige Postleitzahl: auch die ist
  // in dünn besiedelten Gegenden ein Personenbezug.
  const area = `${payload.postalCode.slice(0, 2)}xxx`;
  const areas = [...new Set(payload.skills.map((skill) => SKILL_TAGS[skill]))].join(", ");
  const url = `${site.url}/admin/kandidaten/${payload.candidateId}`;

  const text = [
    "Neue Bewerbung",
    "",
    `Kennung: ${payload.ref}`,
    `Ort: ${payload.city} (${area})`,
    `Bereiche: ${areas || "keine Angabe"}`,
    `Radius: ${payload.radiusKm} km`,
    `Auto: ${payload.hasCar ? "ja" : "nein"}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [[{ text: "In der Verwaltung öffnen", url }]],
        },
      }),
    });

    if (!response.ok) {
      console.error("[notify] Telegram antwortete mit", response.status);
    }
  } catch (error) {
    // Eine fehlgeschlagene Meldung darf die Bewerbung nicht scheitern lassen:
    // der Datensatz liegt zu diesem Zeitpunkt bereits sicher in der Datenbank.
    console.error("[notify] Meldung fehlgeschlagen", error);
  }
}
