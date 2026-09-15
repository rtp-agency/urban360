"use server";

import { resolveLocale } from "@/lib/i18n";
import { contactPage } from "@/content/copy";
import type { EnquiryState } from "@/lib/enquiry";
import { deliverEnquiry, hasDelivery } from "@/lib/mail";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Verarbeitung des Kontaktformulars.
 *
 * Datensparsam nach Artikel 5 Absatz 1 Buchstabe c DSGVO: es werden nur die
 * Felder ausgewertet, die im Formular stehen. Es wird keine IP-Adresse und
 * kein User-Agent gespeichert, es wird kein Captcha eines Drittanbieters
 * eingebunden. Gegen Bots dient ein verstecktes Honeypot-Feld, das echte
 * Besucher nie ausfüllen.
 *
 * ZUSTELLUNG, VOR DEM LIVEGANG EINRICHTEN:
 * Der Weg steht in src/lib/mail.ts. Bevorzugt SMTP über das Postfach der
 * eigenen Domain, ersatzweise ein HTTP-Endpunkt. Ist keines von beidem
 * eingerichtet, bekommt die Besucherin einen Fehler zu sehen und NICHT die
 * Erfolgsmeldung: eine vorgetäuschte Zustellung ist schlimmer als eine
 * sichtbare Störung, weil dann jemand wochenlang auf eine Antwort wartet,
 * die niemand je gelesen hat.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const locale = resolveLocale(String(formData.get("locale") ?? ""));

  const value = (key: string) => String(formData.get(key) ?? "").trim();

  const data = {
    name: value("name"),
    company: value("company"),
    email: value("email"),
    phone: value("phone"),
    subject: value("subject"),
    message: value("message"),
    consent: formData.get("consent") === "on",
    trap: value("website"),
  };

  // Honeypot: von einem Menschen immer leer, weil das Feld visuell und für
  // Screenreader ausgeblendet ist. Antwort wie bei Erfolg, ohne Zustellung.
  if (data.trap) {
    return { status: "ok", message: contactPage.formSuccess[locale], fieldErrors: {} };
  }

  const fieldErrors: Record<string, string> = {};
  if (!data.name) fieldErrors.name = contactPage.errRequired[locale];
  if (!data.email) fieldErrors.email = contactPage.errRequired[locale];
  else if (!EMAIL.test(data.email)) fieldErrors.email = contactPage.errEmail[locale];
  if (!data.message) fieldErrors.message = contactPage.errRequired[locale];
  if (!data.consent) fieldErrors.consent = contactPage.errConsent[locale];

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "", fieldErrors };
  }

  if (!hasDelivery()) {
    console.warn(
      "[kontakt] Kein Zustellweg eingerichtet (SMTP_HOST oder CONTACT_WEBHOOK_URL). " +
        "Die Anfrage wurde NICHT zugestellt.",
      { subject: data.subject },
    );
    return { status: "error", message: contactPage.formError[locale], fieldErrors: {} };
  }

  try {
    await deliverEnquiry({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      locale,
    });
  } catch (error) {
    /* Im Protokoll steht die Störung, nicht die Anfrage: Name, Adresse und
       Nachricht gehören nicht in ein Logfile, das länger lebt und von mehr
       Leuten gelesen wird als das Postfach. */
    console.error("[kontakt] Zustellung fehlgeschlagen", error);
    return { status: "error", message: contactPage.formError[locale], fieldErrors: {} };
  }

  return { status: "ok", message: contactPage.formSuccess[locale], fieldErrors: {} };
}
