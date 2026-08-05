/**
 * ZENTRALE KONFIGURATION
 * ----------------------------------------------------------------------------
 * Alle rechtlich relevanten und alle veränderlichen Daten der Seite stehen hier
 * und nur hier. Wer Impressum, Kontaktdaten oder Leistungsumfang ändert, ändert
 * diese Datei und nichts anderes.
 *
 * Jeder Wert mit dem Präfix TODO ist ein Platzhalter und MUSS vor dem
 * Livegang ersetzt werden. Eine Veröffentlichung mit Platzhaltern im Impressum
 * ist ein Verstoß gegen § 5 DDG.
 *
 * Prüfliste vor dem Livegang: siehe /docs/02-rechts-checkliste.md
 */

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export const site = {
  /** Markenname. Erscheint in Navigation, Titeln und Footer. */
  name: "Urban360",
  /** Kurzer Zusatz hinter dem Namen im Browser-Tab. */
  tagline: {
    de: "Objektbetreuung und Gebäudedienste",
    en: "Facility care and building services",
  },
  /** Produktions-URL. Wird für canonical, hreflang und OG benötigt. */
  url: "https://TODO-domain.de",
} as const;

export const contact = {
  /** TODO: echte, ladungsfähige Anschrift. Kein Postfach (§ 5 DDG). */
  street: "TODO Musterstraße 1",
  postalCode: "TODO 00000",
  city: "TODO Stadt",
  country: { de: "Deutschland", en: "Germany" },

  /** TODO: geschäftliche Rufnummer. */
  phone: "TODO +49 000 0000000",
  /** In tel:-Links verwendet, nur Ziffern und führendes Plus. */
  phoneHref: "tel:+490000000000",

  /** TODO: E-Mail auf der eigenen Domain, nicht bei einem Freemail-Anbieter. */
  email: "TODO info@domain.de",

  /** Erreichbarkeit. Nur angeben, was auch eingehalten wird. */
  hours: {
    de: "Mo bis Fr, 8:00 bis 18:00 Uhr",
    en: "Mon to Fri, 8:00 to 18:00",
  },

  /** Einsatzgebiet. Steuert Texte und die lokale SEO. */
  serviceArea: {
    de: "TODO Stadt und Umkreis von 50 km",
    en: "TODO City and 50 km radius",
  },
} as const;

export const legal = {
  /**
   * Rechtsform des Unternehmens.
   * "sole"  = Einzelunternehmen  -> Impressum nennt Vor- und Nachname
   * "ug"    = UG (haftungsbeschränkt)
   * "gmbh"  = GmbH
   */
  entityType: "sole" as "sole" | "ug" | "gmbh",

  /** Vollständige Firmierung wie in der Gewerbeanmeldung. */
  legalName: "TODO Vorname Nachname",

  /** Nur bei UG/GmbH: vertretungsberechtigte Person(en). */
  managingDirector: "" as string,

  /** Nur bei UG/GmbH. Sonst leer lassen, dann wird der Block ausgeblendet. */
  registerCourt: "",
  registerNumber: "",

  /** USt-IdNr. nach § 27a UStG, falls vorhanden. Steuernummer NICHT angeben. */
  vatId: "",

  /** true, solange die Kleinunternehmerregelung nach § 19 UStG gilt. */
  smallBusiness: true,

  /**
   * Handwerkskammer. Pflichtangabe nach § 5 Abs. 1 Nr. 5 DDG, sobald ein
   * Gewerbe der Anlage B HwO ausgeübt wird, zum Beispiel Gebäudereinigung.
   * Bei reinem Hausmeisterservice ohne Anlage-B-Gewerbe: chamber leer lassen.
   */
  chamber: "TODO Handwerkskammer ...",
  professionalTitle: "TODO Gebäudereiniger",
  titleGrantedIn: { de: "Bundesrepublik Deutschland", en: "Federal Republic of Germany" },

  /** Zuständige Datenschutz-Aufsichtsbehörde des Bundeslandes. */
  dataProtectionAuthority: "TODO Landesbeauftragte(r) für Datenschutz ...",

  /** Hoster. Muss mit dem unterzeichneten AV-Vertrag übereinstimmen. */
  hostingProvider: "TODO Hostinganbieter, Anschrift",

  /**
   * § 36 VSBG. Standard für kleine Betriebe: keine Teilnahme.
   * Hinweis: Der Link zur EU-OS-Plattform ist entfallen, die Plattform wurde
   * am 20.07.2025 abgeschaltet (VO (EU) 2024/3228). Nicht wieder einfügen.
   */
  disputeResolution: false,

  /** Datum der letzten inhaltlichen Prüfung der Rechtstexte. */
  lastReviewed: "TODO 2026-01-01",
} as const;

/**
 * Aussagen, die auf der Seite als Versprechen erscheinen.
 * Jede dieser Angaben ist nach § 5 UWG angreifbar, wenn sie nicht stimmt.
 * Auf false setzen, solange der Nachweis fehlt. Der zugehörige Block
 * verschwindet dann automatisch aus der Seite.
 */
export const claims = {
  /** Betriebshaftpflicht abgeschlossen, Winterdienst eingeschlossen. */
  liabilityInsurance: false,
  /** Schlüsselverlustdeckung im Versicherungsschein enthalten. */
  keyLossCoverage: false,
  /** Einsätze werden dokumentiert und dem Auftraggeber übermittelt. */
  documentedVisits: true,
  /** Feste Ansprechpartner je Objekt. */
  fixedContact: true,
  /** Eintragung im Verzeichnis der Handwerkskammer erfolgt. */
  chamberRegistered: false,
} as const;
