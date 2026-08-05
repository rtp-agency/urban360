import type { Locale } from "./site.config";

export type Localized = Record<Locale, string>;

export type ServicePackage = {
  id: string;
  /** Name eines Icons aus src/components/icons.tsx */
  icon: "buildings" | "broom" | "leaf" | "truck" | "wrench";
  title: Localized;
  /** Ein Satz, der die Gruppe erklärt. Max 25 Wörter. */
  summary: Localized;
  items: Localized[];
  /**
   * Rechtliche Grundlage der Gruppe. Erscheint nicht auf der Seite,
   * dient der Nachvollziehbarkeit bei einer Prüfung durch die Kammer.
   * Quelle: /docs/01-leistungskatalog-lizenzen.md
   */
  basis: string;
  /** Bildslot. Siehe /docs/03-content-todo.md fuer die Aufnahmeliste. */
  image?: { src: string; alt: Localized };
};

export const servicePackages: ServicePackage[] = [
  {
    id: "objektbetreuung",
    icon: "buildings",
    title: {
      de: "Objektbetreuung",
      en: "Property care",
    },
    summary: {
      de: "Der laufende Betrieb einer Liegenschaft. Kontrolliert, dokumentiert, mit festem Ansprechpartner.",
      en: "The day to day running of a property. Checked, documented, with one named contact.",
    },
    items: [
      { de: "Kontrollgänge mit Mängeldokumentation", en: "Inspection rounds with defect reports" },
      { de: "Mülltonnendienst und Pflege der Müllplätze", en: "Bin service and waste area upkeep" },
      { de: "Zählerablesung und Ablesetermine", en: "Meter readings and reading appointments" },
      { de: "Schlüsselverwaltung, Wohnungsübergaben, Protokolle", en: "Key handling, handovers, written protocols" },
      { de: "Kleinreparaturen und Möbelmontage", en: "Minor repairs and furniture assembly" },
      { de: "Koordination beauftragter Fachbetriebe", en: "Coordinating the specialist firms you appoint" },
    ],
    basis: "Freies Gewerbe. Kleinreparaturen im Rahmen von § 1 Abs. 2 Satz 2 Nr. 1 HwO.",
  },
  {
    id: "reinigung",
    icon: "broom",
    title: {
      de: "Reinigung",
      en: "Cleaning",
    },
    summary: {
      de: "Unterhaltsreinigung im Turnus und Grundreinigung nach Bedarf, innen wie an erreichbaren Glasflächen.",
      en: "Scheduled maintenance cleaning and deep cleans on request, indoors and on reachable glass.",
    },
    items: [
      { de: "Treppenhaus- und Unterhaltsreinigung", en: "Stairwell and maintenance cleaning" },
      { de: "Büro-, Praxis- und Ladenreinigung", en: "Office, practice and retail cleaning" },
      { de: "Hotelzimmer und Housekeeping", en: "Hotel rooms and housekeeping" },
      { de: "Glasreinigung im erreichbaren Bereich", en: "Glass cleaning within safe reach" },
      { de: "Grundreinigung und Bauendreinigung", en: "Deep cleans and post construction cleaning" },
      { de: "Teppich- und Polsterreinigung", en: "Carpet and upholstery cleaning" },
    ],
    basis: "Gebäudereiniger, Anlage B1 Nr. 23 HwO. Teppichreinigung, Anlage B2 Nr. 42 HwO. Eintragung im Verzeichnis der Handwerkskammer erforderlich, kein Meisterbrief.",
  },
  {
    id: "aussenanlagen",
    icon: "leaf",
    title: {
      de: "Außenanlagen",
      en: "Grounds",
    },
    summary: {
      de: "Grünpflege über die Saison und Winterdienst nach festem Räumplan mit Nachweis je Einsatz.",
      en: "Grounds care through the season and winter service on a fixed plan, logged per visit.",
    },
    items: [
      { de: "Rasen- und Grünflächenpflege", en: "Lawn and green space upkeep" },
      { de: "Hecken- und Strauchschnitt", en: "Hedge and shrub trimming" },
      { de: "Laubentfernung und Wegereinigung", en: "Leaf clearing and path cleaning" },
      { de: "Beetpflege, Bepflanzung, Bewässerung", en: "Beds, planting and watering" },
      { de: "Schneeräumung und Streudienst", en: "Snow clearing and gritting" },
      { de: "Räum- und Streuprotokoll je Einsatz", en: "A clearing log for every visit" },
    ],
    basis: "Freies Gewerbe. Garten- und Landschaftspflege ist in Anlage A und B HwO nicht aufgeführt.",
  },
  {
    id: "raeumung",
    icon: "truck",
    title: {
      de: "Räumung und Transport",
      en: "Clearance and transport",
    },
    summary: {
      de: "Entrümpelung bis zur besenreinen Übergabe. Entsorgung läuft über zugelassene Entsorgungsbetriebe.",
      en: "Clearance through to broom clean handover. Disposal runs via licensed waste contractors.",
    },
    items: [
      { de: "Keller-, Dachboden- und Wohnungsräumung", en: "Cellar, attic and flat clearance" },
      { de: "Sperrmüll bereitstellen und vorsortieren", en: "Bulky waste staging and pre sorting" },
      { de: "Umzugs- und Tragehilfe", en: "Moving and carrying help" },
      { de: "Transporte bis 3,5 Tonnen", en: "Transport up to 3.5 tonnes" },
      { de: "Entsorgung über zugelassene Partner", en: "Disposal through licensed partners" },
      { de: "Besenreine Übergabe mit Fotoprotokoll", en: "Broom clean handover with photo record" },
    ],
    basis: "Freies Gewerbe. Eigener Abfalltransport erfordert zusätzlich die Anzeige nach § 53 KrWG.",
  },
  {
    id: "technik",
    icon: "wrench",
    title: {
      de: "Technische Dienste",
      en: "Technical services",
    },
    summary: {
      de: "Arbeiten, die zwischen Hausmeister und Fachbetrieb liegen und keinen Meisterbrief voraussetzen.",
      en: "Work that sits between caretaking and the trades, and needs no master craftsman licence.",
    },
    items: [
      { de: "Rohr- und Abflussreinigung", en: "Pipe and drain cleaning" },
      { de: "Verlegen von Laminat, Vinyl und Teppichboden", en: "Laying laminate, vinyl and carpet" },
      { de: "Montage genormter Bauteile: Türen, Zargen, Regale", en: "Fitting standard components: doors, frames, shelving" },
      { de: "Fugenarbeiten im Hochbau", en: "Jointing work in building construction" },
      { de: "Bautentrocknung nach Wasserschäden", en: "Drying out after water damage" },
      { de: "Reinigung von Getränkeleitungen", en: "Beverage line cleaning" },
    ],
    basis: "Handwerksähnliche Gewerbe, Anlage B2 HwO Nr. 3, 5, 14, 23, 43 sowie Bautentrocknung Nr. 2. Eintragung im Verzeichnis der Handwerkskammer, kein Meisterbrief.",
  },
];

export type Segment = {
  id: string;
  icon: "buildings" | "bed" | "fork" | "briefcase" | "house";
  label: Localized;
  detail: Localized;
};

export const segments: Segment[] = [
  {
    id: "verwaltung",
    icon: "buildings",
    label: { de: "Hausverwaltungen und WEG", en: "Property managers and owner associations" },
    detail: {
      de: "Rahmenverträge über mehrere Objekte, ein Ansprechpartner, eine Rechnung je Abrechnungszeitraum.",
      en: "Framework contracts across several properties, one contact, one invoice per billing period.",
    },
  },
  {
    id: "hotel",
    icon: "bed",
    label: { de: "Hotels und Pensionen", en: "Hotels and guesthouses" },
    detail: {
      de: "Housekeeping und Objektpflege im eigenen Team, mit eigener Einsatzleitung und eigenen Mitteln.",
      en: "Housekeeping and upkeep with our own team, our own supervision and our own equipment.",
    },
  },
  {
    id: "gastro",
    icon: "fork",
    label: { de: "Gastronomie", en: "Bars and restaurants" },
    detail: {
      de: "Reinigung außerhalb der Öffnungszeiten, Leergutlogistik, Getränkeleitungen, Außenflächen.",
      en: "Cleaning outside opening hours, empties logistics, beverage lines and outdoor areas.",
    },
  },
  {
    id: "buero",
    icon: "briefcase",
    label: { de: "Büros und Praxen", en: "Offices and practices" },
    detail: {
      de: "Feste Turnusreinigung vor oder nach Geschäftszeit, Verbrauchsmaterial inklusive.",
      en: "Fixed cleaning cycles before or after business hours, consumables included.",
    },
  },
  {
    id: "privat",
    icon: "house",
    label: { de: "Privathaushalte", en: "Private households" },
    detail: {
      de: "Einzelaufträge und wiederkehrende Termine. Arbeitskosten sind nach § 35a EStG absetzbar.",
      en: "One off jobs and recurring visits. Labour costs are tax deductible under § 35a EStG.",
    },
  },
];
