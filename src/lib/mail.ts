import nodemailer from "nodemailer";
import { contact, site } from "@/content/site.config";

/**
 * ZUSTELLUNG DER KONTAKTANFRAGE
 *
 * Zwei Wege, und die Reihenfolge ist eine Entscheidung, keine Bequemlichkeit.
 *
 * 1. SMTP-Weiterleitung über das Postfach, das ohnehin schon zur Domain
 *    gehört. Das ist der Vorzugsweg: der Mailanbieter verarbeitet die Post
 *    dieser Domain bereits, es kommt also KEIN weiterer Auftragsverarbeiter
 *    hinzu, und die Datenschutzerklärung bleibt so, wie sie ist.
 *
 * 2. HTTP-Endpunkt (Web3Forms, Formspree und Ähnliches). Schneller
 *    eingerichtet, aber ein zusätzlicher Dritter, der Name, Mailadresse und
 *    Nachricht der Anfragenden zu sehen bekommt. Wer diesen Weg nimmt,
 *    braucht einen AV-Vertrag mit dem Anbieter und muss den Abschnitt über
 *    Empfänger in der Datenschutzerklärung ergänzen. Steht heute dort nicht.
 *
 * Kein eigener Mailserver auf dieser Maschine, und das ist nicht
 * Bequemlichkeit: der ausgehende Port 25 ist beim Betreiber der Maschine
 * gesperrt, eine PTR-Zuordnung für die Adresse gibt es nicht, und eine
 * frische Adresse aus einem Rechenzentrumsbereich landet bei den grossen
 * Anbietern im Spam. Nachgemessen, nicht vermutet.
 */

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  locale: string;
};

/** Ist überhaupt ein Zustellweg eingerichtet? */
export function hasDelivery(): boolean {
  return Boolean(process.env.SMTP_HOST || process.env.CONTACT_WEBHOOK_URL);
}

/**
 * Wirft bei Misserfolg. Der Aufrufer meldet der Besucherin dann einen
 * Fehler, statt eine Zustellung vorzutäuschen, die nicht stattgefunden hat.
 */
export async function deliverEnquiry(data: Enquiry): Promise<void> {
  if (process.env.SMTP_HOST) return sendBySmtp(data);
  if (process.env.CONTACT_WEBHOOK_URL) return sendByWebhook(data);
  throw new Error("Kein Zustellweg eingerichtet: weder SMTP_HOST noch CONTACT_WEBHOOK_URL");
}

/* ------------------------------------------------------------------ SMTP */

async function sendBySmtp(data: Enquiry): Promise<void> {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) throw new Error("SMTP_USER oder SMTP_PASS fehlt");

  const transport = nodemailer.createTransport({
    host,
    port,
    // 465 spricht von der ersten Sekunde an TLS, 587 handelt es über
    // STARTTLS nach. Beides ist verschlüsselt, die Unterscheidung muss aber
    // stimmen, sonst bleibt die Verbindung hängen.
    secure: port === 465,
    auth: { user, pass },
  });

  /* Absender ist IMMER das eigene Postfach, nie die Adresse der anfragenden
     Person. Andernfalls verschickt der Server Post im fremden Namen: SPF
     und DMARC der fremden Domain schlagen an, und die Nachricht landet im
     Spam oder wird abgewiesen. Die eingetragene Adresse steht stattdessen
     im Antwort-an-Feld, dort gehört sie hin. */
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_TO || contact.email;

  await transport.sendMail({
    from: { name: site.name, address: from },
    to,
    replyTo: data.email ? { name: data.name, address: data.email } : undefined,
    subject: `Anfrage über ${site.url.replace(/^https?:\/\//, "")}: ${data.subject || "ohne Betreff"}`,
    text: asText(data),
  });
}

/** Nur Text, kein HTML. Eine Anfrage ist eine Nachricht, kein Prospekt. */
function asText(d: Enquiry): string {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Firma oder Verwaltung", d.company],
    ["E-Mail", d.email],
    ["Telefon", d.phone],
    ["Gewünschte Leistung", d.subject],
    ["Sprache des Formulars", d.locale],
  ];

  return [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Nachricht:",
    d.message,
    "",
    "--",
    `Gesendet über das Kontaktformular auf ${site.url}`,
  ].join("\n");
}

/* --------------------------------------------------------------- Webhook */

async function sendByWebhook(data: Enquiry): Promise<void> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL!;

  /* Web3Forms und die meisten vergleichbaren Dienste erwarten ihren
     Schlüssel IM Rumpf der Anfrage, nicht als Kopfzeile. Ist keiner
     gesetzt, geht der Rumpf unverändert raus: dann liegt dahinter ein
     eigener Endpunkt, der keinen Schlüssel braucht. */
  const key = process.env.CONTACT_WEBHOOK_KEY;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    /* Reihenfolge zählt: erst die Felder der Anfrage, dann die berechneten.
       Andersherum würde data.subject, also die gewählte Leistung, die
       zusammengesetzte Betreffzeile wieder überschreiben. Der Compiler hat
       genau das angemerkt. Die gewählte Leistung bleibt unter eigenem
       Namen erhalten. */
    body: JSON.stringify({
      ...data,
      ...(key ? { access_key: key } : {}),
      leistung: data.subject,
      subject: `Anfrage über ${site.url.replace(/^https?:\/\//, "")}: ${data.subject || "ohne Betreff"}`,
      from_name: data.name,
    }),
  });

  if (!response.ok) {
    throw new Error(`Endpunkt antwortete mit ${response.status}`);
  }
}
