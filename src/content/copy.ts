import type { Locale } from "./site.config";

type L = Record<Locale, string>;

export const nav = {
  leistungen: { de: "Leistungen", en: "Services" },
  ablauf: { de: "Ablauf", en: "How it works" },
  ueber: { de: "Über uns", en: "About" },
  kontakt: { de: "Kontakt", en: "Contact" },
  /** Ein Label je Absicht. Dieses steht in Navigation, Hero und Footer. */
  cta: { de: "Angebot anfordern", en: "Request a quote" },
  menuOpen: { de: "Menü öffnen", en: "Open menu" },
  menuClose: { de: "Menü schließen", en: "Close menu" },
  langLabel: { de: "Sprache", en: "Language" },
} satisfies Record<string, L>;

export const home = {
  heroTitle: {
    de: "Ihre Immobilie in verlässlichen Händen.",
    en: "Your property, reliably looked after.",
  },
  heroText: {
    de: "Hausmeisterservice, Reinigung und Grünpflege für Wohnanlagen, Hotels, Gastronomie und Büros. Feste Teams, dokumentierte Einsätze.",
    en: "Caretaking, cleaning and grounds care for residential buildings, hotels, hospitality and offices. Fixed teams, documented visits.",
  },
  heroSecondary: { de: "Leistungen ansehen", en: "See the services" },

  segmentsTitle: {
    de: "Für wen wir arbeiten",
    en: "Who we work for",
  },
  segmentsText: {
    de: "Der Bedarf einer Wohnanlage sieht anders aus als der eines Hotels. Deshalb wird jeder Ablauf am Objekt festgelegt, nicht im Katalog.",
    en: "A residential block needs something different from a hotel. So the routine is set at the property, not in a catalogue.",
  },

  servicesTitle: {
    de: "Fünf Bereiche, ein Vertrag",
    en: "Five areas, one contract",
  },
  servicesText: {
    de: "Kombinierbar in jedem Umfang. Wer nur den Winterdienst braucht, bekommt nur den Winterdienst.",
    en: "Combine them in any scope. If you only need winter service, you only get winter service.",
  },
  servicesLink: { de: "Alle Leistungen im Detail", en: "All services in detail" },

  processTitle: {
    de: "So beginnt die Zusammenarbeit",
    en: "How we get started",
  },

  taxTitle: {
    de: "20 % der Arbeitskosten holen Privatkunden zurück",
    en: "Private clients get 20 % of labour costs back",
  },
  taxText: {
    de: "Nach § 35a EStG sind haushaltsnahe Dienstleistungen und Handwerkerleistungen anteilig von der Steuerschuld abziehbar. Voraussetzung ist eine Rechnung mit getrennt ausgewiesenen Arbeitskosten und die Zahlung per Überweisung. Barzahlung erkennt das Finanzamt nicht an, deshalb rechnen wir ausschließlich unbar ab.",
    en: "Under § 35a of the German Income Tax Act, household services and trade work are partly deductible from your tax bill. It requires an invoice that separates labour costs, and payment by bank transfer. Cash is not accepted by the tax office, which is why we never invoice in cash.",
  },
  taxNoteA: { de: "auf haushaltsnahe Dienstleistungen, bis 4.000 € im Jahr", en: "on household services, up to €4,000 a year" },
  taxNoteB: { de: "auf Handwerkerleistungen, bis 1.200 € im Jahr", en: "on trade work, up to €1,200 a year" },

  assuranceTitle: {
    de: "Woran Sie uns messen können",
    en: "What you can hold us to" ,
  },

  contactTitle: {
    de: "Objekt beschreiben, Angebot bekommen",
    en: "Describe the property, get a quote",
  },
  contactText: {
    de: "Adresse, Größe und gewünschter Turnus genügen für eine erste Einschätzung. Für einen verbindlichen Preis kommen wir zur Begehung vorbei.",
    en: "Address, size and the cycle you need are enough for a first estimate. For a binding price we come and look at the property.",
  },
} satisfies Record<string, L>;

export const processSteps: { title: L; text: L }[] = [
  {
    title: { de: "Anfragen", en: "Get in touch" },
    text: {
      de: "Sie schildern das Objekt und was daran regelmäßig zu tun ist. Wir melden uns innerhalb eines Werktags zurück.",
      en: "You describe the property and what needs doing there regularly. We reply within one working day.",
    },
  },
  {
    title: { de: "Begehen", en: "Walk the property" },
    text: {
      de: "Gemeinsame Begehung vor Ort. Danach steht schriftlich fest, welche Arbeiten in welchem Turnus zu welchem Preis erfolgen.",
      en: "We walk the property together. Afterwards you have it in writing: which tasks, at what interval, at what price.",
    },
  },
  {
    title: { de: "Betreuen", en: "Ongoing care" },
    text: {
      de: "Feste Teams, feste Termine. Jeder Einsatz wird dokumentiert, Mängel melden wir, bevor daraus Schäden werden.",
      en: "Fixed teams, fixed dates. Every visit is logged, and we report defects before they turn into damage.",
    },
  },
];

/** Zusagen. Jeder Eintrag ist an ein Flag in claims gebunden und
 *  verschwindet, solange die Zusage nicht belegt ist. */
export const assurances: { claim: "liabilityInsurance" | "keyLossCoverage" | "documentedVisits" | "fixedContact" | "chamberRegistered"; title: L; text: L }[] = [
  {
    claim: "fixedContact",
    title: { de: "Ein Ansprechpartner je Objekt", en: "One contact per property" },
    text: {
      de: "Sie rufen nicht in einer Zentrale an, sondern bei der Person, die Ihr Objekt kennt.",
      en: "You are not calling a switchboard. You are calling the person who knows your property.",
    },
  },
  {
    claim: "documentedVisits",
    title: { de: "Jeder Einsatz wird dokumentiert", en: "Every visit is documented" },
    text: {
      de: "Leistungsnachweis mit Datum, Umfang und Foto. Beim Winterdienst als Räum- und Streuprotokoll, das vor Gericht Bestand hat.",
      en: "A record with date, scope and photo. For winter service, a clearing log that stands up in court.",
    },
  },
  {
    claim: "liabilityInsurance",
    title: { de: "Betriebshaftpflicht mit Winterdienst", en: "Liability cover including winter service" },
    text: {
      de: "Die Verkehrssicherungspflicht geht mit dem Auftrag auf uns über. Der Versicherungsschutz deckt genau diesen Fall ab.",
      en: "The duty to keep the property safe passes to us with the contract, and our cover is written for exactly that case.",
    },
  },
  {
    claim: "keyLossCoverage",
    title: { de: "Schlüsselverlust ist abgesichert", en: "Key loss is covered" },
    text: {
      de: "Ein verlorener Zentralschlüssel bedeutet eine neue Schließanlage. Dieser Fall ist versichert, nicht nur bedauert.",
      en: "A lost master key means a new locking system. That case is insured, not merely regretted.",
    },
  },
  {
    claim: "chamberRegistered",
    title: { de: "Eingetragen bei der Handwerkskammer", en: "Registered with the chamber of crafts" },
    text: {
      de: "Reinigungsleistungen setzen die Eintragung im Verzeichnis der zulassungsfreien Handwerke voraus. Die liegt vor.",
      en: "Cleaning services require entry in the register of licence free trades. Ours is in place.",
    },
  },
];

export const about = {
  title: { de: "Was wir tun und was nicht", en: "What we do, and what we do not" },
  lead: {
    de: "Ein Dienstleister für den laufenden Betrieb von Gebäuden und Außenanlagen. Kein Bauunternehmen, kein Zeitarbeitsvermittler.",
    en: "A service company for the running of buildings and grounds. Not a construction firm, not a staffing agency.",
  },
  bodyTitleA: { de: "Warum feste Teams", en: "Why fixed teams" },
  bodyA: {
    de: "Objektbetreuung lebt davon, dass jemand merkt, wenn etwas anders ist als letzte Woche. Das kann nur ein Team, das dasselbe Haus regelmäßig sieht. Deshalb werden Objekte fest zugeordnet und nicht nach Tagesverfügbarkeit verteilt.",
    en: "Property care depends on someone noticing that something is different from last week. Only a team that sees the same building regularly can do that. So properties are assigned permanently, not handed out by daily availability.",
  },
  bodyTitleB: { de: "Die Grenze zum Handwerk", en: "Where the trades begin" },
  bodyB: {
    de: "Wir führen Instandhaltung, Reinigung, Pflege und einfache Reparaturen aus. Arbeiten, die nach der Handwerksordnung einen Meisterbetrieb voraussetzen, etwa Maler-, Elektro- oder Sanitärarbeiten, übernehmen wir nicht selbst. Dafür holen wir eingetragene Fachbetriebe, koordinieren den Termin und nehmen die Arbeit für Sie ab. Diese Trennung ist kein Zurückhalten von Leistung, sondern die Voraussetzung dafür, dass Ihre Gewährleistung im Schadensfall trägt.",
    en: "We handle upkeep, cleaning, grounds care and simple repairs. Work that German trade law reserves for a licensed master business, such as painting, electrical or plumbing work, we do not carry out ourselves. For that we bring in registered specialist firms, arrange the appointment and sign the work off for you. That line is not us holding back. It is what keeps your warranty intact when something goes wrong.",
  },
  bodyTitleC: { de: "Abrechnung", en: "Billing" },
  bodyC: {
    de: "Leistungen werden nach Aufwand oder als monatliche Pauschale abgerechnet, je nachdem, was zum Objekt passt. Arbeitskosten und Material stehen getrennt auf der Rechnung, damit Privatkunden den Steuerabzug nach § 35a EStG nutzen können. Gezahlt wird per Überweisung.",
    en: "Work is billed by the hour or as a monthly flat rate, whichever fits the property. Labour and materials appear separately on the invoice so private clients can claim the § 35a deduction. Payment is by bank transfer.",
  },
} satisfies Record<string, L>;

export const contactPage = {
  title: { de: "Kontakt", en: "Contact" },
  lead: {
    de: "Schreiben Sie kurz, um welches Objekt es geht. Alles Weitere klären wir bei der Begehung.",
    en: "Tell us briefly which property this is about. Everything else we settle when we walk it.",
  },
  formName: { de: "Name", en: "Name" },
  formCompany: { de: "Firma oder Verwaltung", en: "Company or management" },
  formCompanyHint: { de: "Optional", en: "Optional" },
  formEmail: { de: "E-Mail", en: "Email" },
  formPhone: { de: "Telefon", en: "Phone" },
  formPhoneHint: { de: "Optional", en: "Optional" },
  formSubject: { de: "Gewünschte Leistung", en: "Service needed" },
  formMessage: { de: "Nachricht", en: "Message" },
  formMessageHint: {
    de: "Objektart, Adresse, Größe und gewünschter Turnus helfen uns am meisten.",
    en: "Property type, address, size and the interval you need help us most.",
  },
  formConsent: {
    de: "Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage gespeichert werden. Die Einwilligung kann jederzeit widerrufen werden.",
    en: "I agree that my details may be stored in order to handle this enquiry. This consent can be withdrawn at any time.",
  },
  formConsentLink: { de: "Datenschutzerklärung", en: "Privacy policy" },
  formSubmit: { de: "Anfrage senden", en: "Send enquiry" },
  formSending: { de: "Wird gesendet", en: "Sending" },
  formSuccess: {
    de: "Danke, die Anfrage ist angekommen. Wir melden uns innerhalb eines Werktags.",
    en: "Thank you, your enquiry has arrived. We will reply within one working day.",
  },
  formError: {
    de: "Das hat nicht funktioniert. Bitte versuchen Sie es erneut oder rufen Sie an.",
    en: "That did not work. Please try again or give us a call.",
  },
  errRequired: { de: "Bitte ausfüllen", en: "Please fill this in" },
  errEmail: { de: "Bitte eine gültige E-Mail-Adresse angeben", en: "Please enter a valid email address" },
  errConsent: { de: "Ohne Einwilligung können wir die Anfrage nicht bearbeiten", en: "Without consent we cannot process the enquiry" },
  directTitle: { de: "Direkt erreichbar", en: "Reach us directly" },
  hoursLabel: { de: "Erreichbarkeit", en: "Hours" },
  areaLabel: { de: "Einsatzgebiet", en: "Service area" },
} satisfies Record<string, L>;

export const footer = {
  rights: { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
  legalHeading: { de: "Rechtliches", en: "Legal" },
  companyHeading: { de: "Unternehmen", en: "Company" },
  contactHeading: { de: "Kontakt", en: "Contact" },
  impressum: { de: "Impressum", en: "Legal notice" },
  privacy: { de: "Datenschutz", en: "Privacy" },
  terms: { de: "AGB", en: "Terms" },
  cookieNote: {
    de: "Diese Seite setzt keine Cookies, lädt keine Schriften oder Skripte von Dritten und verwendet keine Analyse- oder Trackingdienste.",
    en: "This site sets no cookies, loads no third party fonts or scripts, and uses no analytics or tracking.",
  },
} satisfies Record<string, L>;

export const meta = {
  homeTitle: {
    de: "Hausmeisterservice, Reinigung und Grünpflege",
    en: "Caretaking, cleaning and grounds care",
  },
  homeDescription: {
    de: "Objektbetreuung, Gebäudereinigung, Außenanlagen, Winterdienst, Entrümpelung und technische Dienste für Hausverwaltungen, Hotels, Gastronomie, Büros und Privathaushalte.",
    en: "Property care, building cleaning, grounds, winter service, clearance and technical services for property managers, hotels, hospitality, offices and private households.",
  },
  servicesTitle: { de: "Leistungen", en: "Services" },
  servicesDescription: {
    de: "Alle Leistungen im Überblick: Objektbetreuung, Reinigung, Außenanlagen und Winterdienst, Räumung und Transport, technische Dienste.",
    en: "Every service at a glance: property care, cleaning, grounds and winter service, clearance and transport, technical services.",
  },
  aboutTitle: { de: "Über uns", en: "About us" },
  aboutDescription: {
    de: "Wer wir sind, wie wir arbeiten und wo die Grenze zu meisterpflichtigen Handwerksleistungen verläuft.",
    en: "Who we are, how we work, and where licensed trade work begins.",
  },
  contactDescription: {
    de: "Anfrage für ein Angebot zur Objektbetreuung, Reinigung oder Grünpflege.",
    en: "Request a quote for property care, cleaning or grounds maintenance.",
  },
} satisfies Record<string, L>;

export const notFound = {
  title: { de: "Seite nicht gefunden", en: "Page not found" },
  text: {
    de: "Diese Adresse gibt es nicht oder nicht mehr.",
    en: "This address does not exist, or no longer exists.",
  },
  back: { de: "Zur Startseite", en: "Back to the home page" },
} satisfies Record<string, L>;
