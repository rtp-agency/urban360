import type { AppLocale } from "./recruiting";

/**
 * KATALOG DER FÄHIGKEITEN
 *
 * WAS DAS IST UND WAS ES NICHT IST
 *
 * Das hier ist die Antwort auf die Frage "was können Sie?" und ausdrücklich
 * NICHT die Antwort auf "was sollen Sie bei uns machen?". Der Unterschied ist
 * der ganze Zweck dieser Datei:
 *
 *   SKILLS in recruiting.ts   sechzehn Einsatzbereiche, in denen WIR Aufträge
 *                             haben. Sie gehen in die Auswahl ein und tragen
 *                             35 Punkte im Match%, siehe lib/matching.ts.
 *   ABILITIES hier            was der Mensch tatsächlich kann, unabhängig
 *                             davon, ob wir dafür gerade einen Auftrag haben.
 *                             Reine Erhebung für uns, kein Bestandteil der
 *                             Bewertung.
 *
 * Deshalb wird das Match% von diesem Katalog nicht angefasst. Wer den
 * Poolreiniger findet, weil wir nächstes Jahr Pools anbieten, hat den Nutzen
 * dieser Erhebung verstanden; wer ihn heute in eine Treppenhausreinigung
 * einplant, weil er "irgendwas mit Reinigung" angeklickt hat, hätte ihn
 * missverstanden.
 *
 * WARUM SCHLÜSSEL UND ÜBERSETZUNG HIER ZUSAMMENSTEHEN
 *
 * Die übrige Stammdatenhaltung trennt Schlüssel (recruiting.ts) von Anzeige
 * (application.ts). Bei über hundert Einträgen wäre diese Trennung ein
 * Nachteil: wer eine Fähigkeit ergänzt, müsste sie an zwei Stellen in der
 * richtigen Reihenfolge eintragen, und ein vergessener Eintrag fällt erst
 * beim Übersetzen auf. Hier steht beides beieinander, dafür erzwingt
 * TypeScript über Record<Ability, T> die Vollständigkeit: eine Fähigkeit
 * ohne Übersetzung ist ein Compilerfehler, kein stiller Leerstring.
 *
 * DIE SCHLÜSSEL DÜRFEN SICH NIE ÄNDERN. Sie liegen so in der Datenbank; ein
 * umbenannter Schlüssel verliert die Zuordnung aller bestehenden Datensätze.
 * Eine Fähigkeit, die nicht mehr erhoben werden soll, wird deshalb nicht
 * gelöscht, sondern in RETIRED_ABILITIES aufgenommen: sie verschwindet aus
 * dem Fragebogen, bleibt aber in Auswertung und Kandidatenkarte lesbar.
 */

type T = Record<AppLocale, string>;

/**
 * Gruppen. Die Reihenfolge ist die Anzeigereihenfolge im Fragebogen und
 * bewusst nicht alphabetisch: oben stehen die Bereiche, in denen wir heute
 * arbeiten, unten die, die für uns Ausblick sind. Wer den Bogen ausfüllt,
 * findet dadurch das Erwartbare zuerst.
 */
export const ABILITY_GROUPS = [
  {
    id: "reinigung",
    abilities: [
      "unterhaltsreinigung",
      "grundreinigung",
      "bauendreinigung",
      "treppenhausreinigung",
      "bueroreinigung",
      "fensterreinigung",
      "glasfassadenreinigung",
      "teppichreinigung",
      "polsterreinigung",
      "kuechenreinigung",
      "industriereinigung",
      "hochdruckreinigung",
      "desinfektion",
      "schaedlingsbekaempfung",
      "autoaufbereitung",
    ],
  },
  {
    id: "wasser",
    abilities: [
      "poolreinigung",
      "poolwartung",
      "saunapflege",
      "teichpflege",
      "rohrreinigung",
      "bautrocknung",
    ],
  },
  {
    id: "garten",
    abilities: [
      "rasenpflege",
      "heckenschnitt",
      "baumpflege",
      "baumfaellung",
      "bepflanzung",
      "bewaesserung",
      "laubentfernung",
      "winterdienst",
      "pflasterarbeiten",
      "zaunbau",
      "spielplatzpflege",
    ],
  },
  {
    id: "hausmeister",
    abilities: [
      "hausmeisterdienst",
      "kleinreparaturen",
      "moebelmontage",
      "kuechenmontage",
      "tuerenundschloesser",
      "schliessanlagen",
      "zaehlerablesung",
      "muellmanagement",
    ],
  },
  {
    id: "bau",
    abilities: [
      "malerarbeiten",
      "tapezieren",
      "trockenbau",
      "putzarbeiten",
      "fliesenlegen",
      "bodenverlegung",
      "parkettarbeiten",
      "maurerarbeiten",
      "betonarbeiten",
      "abbrucharbeiten",
      "daemmarbeiten",
      "geruestbau",
      "dacharbeiten",
      "fenstermontage",
    ],
  },
  {
    id: "holzmetall",
    abilities: [
      "tischlerarbeiten",
      "zimmererarbeiten",
      "metallbau",
      "schweissen",
      "schlosserarbeiten",
      "glaserarbeiten",
    ],
  },
  {
    id: "technik",
    abilities: [
      "sanitaerinstallation",
      "heizungstechnik",
      "lueftungstechnik",
      "klimatechnik",
      "elektroinstallation",
      "elektrokleinarbeiten",
      "photovoltaik",
      "smarthome",
      "brandschutztechnik",
    ],
  },
  {
    id: "logistik",
    abilities: [
      "umzugshilfe",
      "entruempelung",
      "moebeltransport",
      "lkwfahren",
      "lieferfahrten",
      "staplerfahren",
      "lagerarbeit",
      "kommissionierung",
      "beundentladen",
    ],
  },
  {
    id: "hotelgastro",
    abilities: [
      "housekeeping",
      "zimmerreinigung",
      "waescherei",
      "kuechenhilfe",
      "spuelkueche",
      "kochen",
      "servicekellner",
      "barkeeper",
      "barista",
      "fruehstuecksservice",
      "bankettservice",
    ],
  },
  {
    id: "betreuung",
    abilities: [
      "seniorenbetreuung",
      "pflegehilfe",
      "kinderbetreuung",
      "haushaltshilfe",
      "einkaufshilfe",
      "begleitdienst",
      "tierbetreuung",
    ],
  },
  {
    id: "sicherheit",
    abilities: ["objektschutz", "pfoertnerdienst", "empfangsdienst", "veranstaltungsordner"],
  },
  {
    id: "produktion",
    abilities: [
      "bauhelfer",
      "montagehelfer",
      "produktionshelfer",
      "maschinenbedienung",
      "qualitaetskontrolle",
      "verpackung",
    ],
  },
  {
    id: "buero",
    abilities: [
      "buerotaetigkeit",
      "buchhaltung",
      "disposition",
      "kundentelefonie",
      "uebersetzen",
      "itsupport",
    ],
  },
] as const;

export type AbilityGroupId = (typeof ABILITY_GROUPS)[number]["id"];

export type Ability = (typeof ABILITY_GROUPS)[number]["abilities"][number];

/**
 * Flache Liste aller Schlüssel. Aus den Gruppen abgeleitet und nicht daneben
 * gepflegt: eine zweite Liste würde irgendwann von der ersten abweichen, und
 * dann wäre eine Fähigkeit im Fragebogen sichtbar, aber bei der Prüfung
 * ungültig.
 */
export const ABILITIES: readonly Ability[] = ABILITY_GROUPS.flatMap((group) => [
  ...group.abilities,
]);

/**
 * Nicht mehr erhobene Fähigkeiten. Sie verschwinden aus dem Fragebogen,
 * bleiben aber gültige Werte für bestehende Datensätze.
 * Noch ist die Liste leer; sie ist der vorgesehene Weg, damit niemand einen
 * Schlüssel aus ABILITY_GROUPS löscht.
 */
export const RETIRED_ABILITIES: readonly string[] = [];

export const abilityGroupLabels: Record<AbilityGroupId, T> = {
  reinigung: {
    de: "Reinigung und Hygiene",
    ru: "Уборка и клининг",
    uk: "Прибирання та клінінг",
    en: "Cleaning and hygiene",
  },
  wasser: {
    de: "Pool, Sauna, Wasser",
    ru: "Бассейны, сауны, вода",
    uk: "Басейни, сауни, вода",
    en: "Pool, sauna, water",
  },
  garten: {
    de: "Garten und Außenanlagen",
    ru: "Сад и территория",
    uk: "Сад і територія",
    en: "Garden and grounds",
  },
  hausmeister: {
    de: "Hausmeister und Kleinreparaturen",
    ru: "Хаусмайстер и мелкий ремонт",
    uk: "Хаусмайстер і дрібний ремонт",
    en: "Caretaking and small repairs",
  },
  bau: {
    de: "Bau und Ausbau",
    ru: "Стройка и отделка",
    uk: "Будівництво та обробка",
    en: "Construction and finishing",
  },
  holzmetall: {
    de: "Holz, Metall, Glas",
    ru: "Дерево, металл, стекло",
    uk: "Дерево, метал, скло",
    en: "Wood, metal, glass",
  },
  technik: {
    de: "Sanitär, Heizung, Elektro",
    ru: "Сантехника, отопление, электрика",
    uk: "Сантехніка, опалення, електрика",
    en: "Plumbing, heating, electrical",
  },
  logistik: {
    de: "Transport und Logistik",
    ru: "Транспорт и логистика",
    uk: "Транспорт і логістика",
    en: "Transport and logistics",
  },
  hotelgastro: {
    de: "Hotel und Gastronomie",
    ru: "Отель и общепит",
    uk: "Готель і харчування",
    en: "Hotel and hospitality",
  },
  betreuung: {
    de: "Betreuung und Haushalt",
    ru: "Уход и хозяйство",
    uk: "Догляд і господарство",
    en: "Care and household",
  },
  sicherheit: {
    de: "Sicherheit und Empfang",
    ru: "Охрана и приём",
    uk: "Охорона та прийом",
    en: "Security and reception",
  },
  produktion: {
    de: "Produktion und Hilfsarbeiten",
    ru: "Производство и подсобные работы",
    uk: "Виробництво та підсобні роботи",
    en: "Production and general labour",
  },
  buero: {
    de: "Büro und Verwaltung",
    ru: "Офис и администрирование",
    uk: "Офіс та адміністрування",
    en: "Office and administration",
  },
};

export const abilityLabels: Record<Ability, T> = {
  // Reinigung und Hygiene
  unterhaltsreinigung: {
    de: "Unterhaltsreinigung",
    ru: "Поддерживающая уборка",
    uk: "Поточне прибирання",
    en: "Maintenance cleaning",
  },
  grundreinigung: {
    de: "Grundreinigung",
    ru: "Генеральная уборка",
    uk: "Генеральне прибирання",
    en: "Deep cleaning",
  },
  bauendreinigung: {
    de: "Bauendreinigung",
    ru: "Уборка после ремонта",
    uk: "Прибирання після ремонту",
    en: "Post construction cleaning",
  },
  treppenhausreinigung: {
    de: "Treppenhausreinigung",
    ru: "Уборка подъездов",
    uk: "Прибирання підʼїздів",
    en: "Stairwell cleaning",
  },
  bueroreinigung: {
    de: "Büroreinigung",
    ru: "Уборка офисов",
    uk: "Прибирання офісів",
    en: "Office cleaning",
  },
  fensterreinigung: {
    de: "Fensterreinigung",
    ru: "Мытьё окон",
    uk: "Миття вікон",
    en: "Window cleaning",
  },
  glasfassadenreinigung: {
    de: "Glasfassadenreinigung",
    ru: "Мытьё стеклянных фасадов",
    uk: "Миття скляних фасадів",
    en: "Glass facade cleaning",
  },
  teppichreinigung: {
    de: "Teppichreinigung",
    ru: "Чистка ковров",
    uk: "Чищення килимів",
    en: "Carpet cleaning",
  },
  polsterreinigung: {
    de: "Polsterreinigung",
    ru: "Чистка мягкой мебели",
    uk: "Чищення мʼяких меблів",
    en: "Upholstery cleaning",
  },
  kuechenreinigung: {
    de: "Küchenreinigung, Fettentfernung",
    ru: "Уборка кухонь, удаление жира",
    uk: "Прибирання кухонь, видалення жиру",
    en: "Kitchen cleaning and degreasing",
  },
  industriereinigung: {
    de: "Industriereinigung",
    ru: "Промышленный клининг",
    uk: "Промисловий клінінг",
    en: "Industrial cleaning",
  },
  hochdruckreinigung: {
    de: "Hochdruckreinigung",
    ru: "Мойка под давлением",
    uk: "Мийка під тиском",
    en: "Pressure washing",
  },
  desinfektion: {
    de: "Desinfektion",
    ru: "Дезинфекция",
    uk: "Дезінфекція",
    en: "Disinfection",
  },
  schaedlingsbekaempfung: {
    de: "Schädlingsbekämpfung",
    ru: "Дезинсекция и дератизация",
    uk: "Дезінсекція та дератизація",
    en: "Pest control",
  },
  autoaufbereitung: {
    de: "Fahrzeugaufbereitung",
    ru: "Мойка и химчистка авто",
    uk: "Мийка та хімчистка авто",
    en: "Vehicle detailing",
  },

  // Pool, Sauna, Wasser
  poolreinigung: {
    de: "Poolreinigung",
    ru: "Чистка бассейнов",
    uk: "Чищення басейнів",
    en: "Pool cleaning",
  },
  poolwartung: {
    de: "Poolwartung und Wasserchemie",
    ru: "Обслуживание бассейнов, химия воды",
    uk: "Обслуговування басейнів, хімія води",
    en: "Pool maintenance and water chemistry",
  },
  saunapflege: {
    de: "Sauna und Wellnessbereich",
    ru: "Сауны и велнес-зоны",
    uk: "Сауни та велнес-зони",
    en: "Sauna and wellness areas",
  },
  teichpflege: {
    de: "Teich- und Brunnenpflege",
    ru: "Пруды и фонтаны",
    uk: "Ставки та фонтани",
    en: "Ponds and fountains",
  },
  rohrreinigung: {
    de: "Rohr- und Abflussreinigung",
    ru: "Прочистка труб и канализации",
    uk: "Прочищення труб і каналізації",
    en: "Pipe and drain clearing",
  },
  bautrocknung: {
    de: "Bautrocknung nach Wasserschaden",
    ru: "Сушка после залива",
    uk: "Сушіння після затоплення",
    en: "Drying after water damage",
  },

  // Garten und Außenanlagen
  rasenpflege: {
    de: "Rasenpflege",
    ru: "Уход за газоном",
    uk: "Догляд за газоном",
    en: "Lawn care",
  },
  heckenschnitt: {
    de: "Hecken- und Strauchschnitt",
    ru: "Стрижка кустов и живой изгороди",
    uk: "Стрижка кущів та живоплоту",
    en: "Hedge and shrub trimming",
  },
  baumpflege: {
    de: "Baumpflege und Kronenschnitt",
    ru: "Уход за деревьями, обрезка",
    uk: "Догляд за деревами, обрізка",
    en: "Tree care and pruning",
  },
  baumfaellung: {
    de: "Baumfällung",
    ru: "Валка деревьев",
    uk: "Валка дерев",
    en: "Tree felling",
  },
  bepflanzung: {
    de: "Bepflanzung und Beetpflege",
    ru: "Посадка и уход за клумбами",
    uk: "Садіння та догляд за клумбами",
    en: "Planting and bed care",
  },
  bewaesserung: {
    de: "Bewässerungsanlagen",
    ru: "Системы полива",
    uk: "Системи поливу",
    en: "Irrigation systems",
  },
  laubentfernung: {
    de: "Laubentfernung",
    ru: "Уборка листвы",
    uk: "Прибирання листя",
    en: "Leaf clearing",
  },
  winterdienst: {
    de: "Winterdienst, Schneeräumung",
    ru: "Зимняя служба, уборка снега",
    uk: "Зимова служба, прибирання снігу",
    en: "Winter service and snow clearing",
  },
  pflasterarbeiten: {
    de: "Pflaster- und Wegebau",
    ru: "Укладка брусчатки, дорожки",
    uk: "Укладання бруківки, доріжки",
    en: "Paving and pathways",
  },
  zaunbau: {
    de: "Zaun- und Torbau",
    ru: "Заборы и ворота",
    uk: "Паркани та ворота",
    en: "Fences and gates",
  },
  spielplatzpflege: {
    de: "Spielplatzpflege und -prüfung",
    ru: "Обслуживание детских площадок",
    uk: "Обслуговування дитячих майданчиків",
    en: "Playground upkeep and checks",
  },

  // Hausmeister und Kleinreparaturen
  hausmeisterdienst: {
    de: "Hausmeisterdienst",
    ru: "Работа хаусмайстера",
    uk: "Робота хаусмайстера",
    en: "Caretaking",
  },
  kleinreparaturen: {
    de: "Kleinreparaturen",
    ru: "Мелкий ремонт",
    uk: "Дрібний ремонт",
    en: "Small repairs",
  },
  moebelmontage: {
    de: "Möbelmontage",
    ru: "Сборка мебели",
    uk: "Збирання меблів",
    en: "Furniture assembly",
  },
  kuechenmontage: {
    de: "Küchenmontage",
    ru: "Монтаж кухонь",
    uk: "Монтаж кухонь",
    en: "Kitchen fitting",
  },
  tuerenundschloesser: {
    de: "Türen und Schlösser",
    ru: "Двери и замки",
    uk: "Двері та замки",
    en: "Doors and locks",
  },
  schliessanlagen: {
    de: "Schließanlagen",
    ru: "Системы запирания",
    uk: "Системи замикання",
    en: "Locking systems",
  },
  zaehlerablesung: {
    de: "Zählerablesung",
    ru: "Снятие показаний счётчиков",
    uk: "Зняття показань лічильників",
    en: "Meter reading",
  },
  muellmanagement: {
    de: "Müllplatzpflege und Tonnendienst",
    ru: "Мусорные площадки и вывоз баков",
    uk: "Смітники та вивіз баків",
    en: "Waste areas and bin service",
  },

  // Bau und Ausbau
  malerarbeiten: {
    de: "Malerarbeiten",
    ru: "Малярные работы",
    uk: "Малярні роботи",
    en: "Painting",
  },
  tapezieren: {
    de: "Tapezieren",
    ru: "Поклейка обоев",
    uk: "Поклейка шпалер",
    en: "Wallpapering",
  },
  trockenbau: {
    de: "Trockenbau",
    ru: "Гипсокартон",
    uk: "Гіпсокартон",
    en: "Drywall",
  },
  putzarbeiten: {
    de: "Putz- und Spachtelarbeiten",
    ru: "Штукатурка и шпатлёвка",
    uk: "Штукатурка та шпаклівка",
    en: "Plastering and filling",
  },
  fliesenlegen: {
    de: "Fliesenlegen",
    ru: "Укладка плитки",
    uk: "Укладання плитки",
    en: "Tiling",
  },
  bodenverlegung: {
    de: "Laminat, Vinyl, Teppichboden",
    ru: "Ламинат, винил, ковролин",
    uk: "Ламінат, вініл, ковролін",
    en: "Laminate, vinyl, carpet",
  },
  parkettarbeiten: {
    de: "Parkett und Schleifen",
    ru: "Паркет и шлифовка",
    uk: "Паркет і шліфування",
    en: "Parquet and sanding",
  },
  maurerarbeiten: {
    de: "Maurerarbeiten",
    ru: "Кладка",
    uk: "Мурування",
    en: "Bricklaying",
  },
  betonarbeiten: {
    de: "Betonarbeiten",
    ru: "Бетонные работы",
    uk: "Бетонні роботи",
    en: "Concrete work",
  },
  abbrucharbeiten: {
    de: "Abbruch und Demontage",
    ru: "Демонтаж",
    uk: "Демонтаж",
    en: "Demolition and stripping out",
  },
  daemmarbeiten: {
    de: "Dämmarbeiten",
    ru: "Утепление и изоляция",
    uk: "Утеплення та ізоляція",
    en: "Insulation",
  },
  geruestbau: {
    de: "Gerüstbau",
    ru: "Монтаж строительных лесов",
    uk: "Монтаж будівельних лісів",
    en: "Scaffolding",
  },
  dacharbeiten: {
    de: "Dacharbeiten",
    ru: "Кровельные работы",
    uk: "Покрівельні роботи",
    en: "Roofing",
  },
  fenstermontage: {
    de: "Fenster- und Türmontage",
    ru: "Монтаж окон и дверей",
    uk: "Монтаж вікон і дверей",
    en: "Window and door fitting",
  },

  // Holz, Metall, Glas
  tischlerarbeiten: {
    de: "Tischlerarbeiten",
    ru: "Столярные работы",
    uk: "Столярні роботи",
    en: "Joinery",
  },
  zimmererarbeiten: {
    de: "Zimmererarbeiten",
    ru: "Плотницкие работы",
    uk: "Теслярські роботи",
    en: "Carpentry",
  },
  metallbau: {
    de: "Metallbau",
    ru: "Металлоконструкции",
    uk: "Металоконструкції",
    en: "Metalwork",
  },
  schweissen: {
    de: "Schweißen",
    ru: "Сварка",
    uk: "Зварювання",
    en: "Welding",
  },
  schlosserarbeiten: {
    de: "Schlosserarbeiten",
    ru: "Слесарные работы",
    uk: "Слюсарні роботи",
    en: "Locksmithing and fitting",
  },
  glaserarbeiten: {
    de: "Glaserarbeiten",
    ru: "Стекольные работы",
    uk: "Скляні роботи",
    en: "Glazing",
  },

  // Sanitär, Heizung, Elektro
  sanitaerinstallation: {
    de: "Sanitärinstallation",
    ru: "Сантехника",
    uk: "Сантехніка",
    en: "Plumbing",
  },
  heizungstechnik: {
    de: "Heizungstechnik",
    ru: "Отопление",
    uk: "Опалення",
    en: "Heating systems",
  },
  lueftungstechnik: {
    de: "Lüftungstechnik",
    ru: "Вентиляция",
    uk: "Вентиляція",
    en: "Ventilation",
  },
  klimatechnik: {
    de: "Klimatechnik",
    ru: "Кондиционирование",
    uk: "Кондиціювання",
    en: "Air conditioning",
  },
  elektroinstallation: {
    de: "Elektroinstallation",
    ru: "Электромонтаж",
    uk: "Електромонтаж",
    en: "Electrical installation",
  },
  elektrokleinarbeiten: {
    de: "Kleine Elektroarbeiten",
    ru: "Мелкие электроработы",
    uk: "Дрібні електророботи",
    en: "Minor electrical work",
  },
  photovoltaik: {
    de: "Photovoltaik",
    ru: "Солнечные панели",
    uk: "Сонячні панелі",
    en: "Solar panels",
  },
  smarthome: {
    de: "Smart Home und Gebäudetechnik",
    ru: "Умный дом, автоматика здания",
    uk: "Розумний дім, автоматика будівлі",
    en: "Smart home and building tech",
  },
  brandschutztechnik: {
    de: "Brandschutztechnik",
    ru: "Противопожарные системы",
    uk: "Протипожежні системи",
    en: "Fire safety systems",
  },

  // Transport und Logistik
  umzugshilfe: {
    de: "Umzugshilfe",
    ru: "Помощь при переезде",
    uk: "Допомога при переїзді",
    en: "Removals help",
  },
  entruempelung: {
    de: "Entrümpelung",
    ru: "Расчистка и вывоз хлама",
    uk: "Розчищення та вивіз непотребу",
    en: "Clearance and disposal",
  },
  moebeltransport: {
    de: "Möbeltransport",
    ru: "Перевозка мебели",
    uk: "Перевезення меблів",
    en: "Furniture transport",
  },
  lkwfahren: {
    de: "LKW fahren",
    ru: "Вождение грузовика",
    uk: "Керування вантажівкою",
    en: "Truck driving",
  },
  lieferfahrten: {
    de: "Lieferfahrten",
    ru: "Доставка",
    uk: "Доставка",
    en: "Delivery driving",
  },
  staplerfahren: {
    de: "Gabelstapler fahren",
    ru: "Погрузчик",
    uk: "Навантажувач",
    en: "Forklift operation",
  },
  lagerarbeit: {
    de: "Lagerarbeit",
    ru: "Работа на складе",
    uk: "Робота на складі",
    en: "Warehouse work",
  },
  kommissionierung: {
    de: "Kommissionierung",
    ru: "Комплектация заказов",
    uk: "Комплектація замовлень",
    en: "Order picking",
  },
  beundentladen: {
    de: "Be- und Entladen",
    ru: "Погрузка и разгрузка",
    uk: "Завантаження та розвантаження",
    en: "Loading and unloading",
  },

  // Hotel und Gastronomie
  housekeeping: {
    de: "Housekeeping",
    ru: "Housekeeping",
    uk: "Housekeeping",
    en: "Housekeeping",
  },
  zimmerreinigung: {
    de: "Zimmerreinigung",
    ru: "Уборка номеров",
    uk: "Прибирання номерів",
    en: "Room cleaning",
  },
  waescherei: {
    de: "Wäscherei und Bügeln",
    ru: "Прачечная и глажка",
    uk: "Пральня та прасування",
    en: "Laundry and ironing",
  },
  kuechenhilfe: {
    de: "Küchenhilfe",
    ru: "Помощник на кухне",
    uk: "Помічник на кухні",
    en: "Kitchen assistant",
  },
  spuelkueche: {
    de: "Spülküche",
    ru: "Мойка посуды",
    uk: "Мийка посуду",
    en: "Dishwashing",
  },
  kochen: {
    de: "Kochen",
    ru: "Повар",
    uk: "Кухар",
    en: "Cooking",
  },
  servicekellner: {
    de: "Service im Gastraum",
    ru: "Обслуживание зала, официант",
    uk: "Обслуговування залу, офіціант",
    en: "Waiting and service",
  },
  barkeeper: {
    de: "Bar",
    ru: "Бармен",
    uk: "Бармен",
    en: "Bartending",
  },
  barista: {
    de: "Barista",
    ru: "Бариста",
    uk: "Баріста",
    en: "Barista",
  },
  fruehstuecksservice: {
    de: "Frühstücksservice",
    ru: "Завтраки",
    uk: "Сніданки",
    en: "Breakfast service",
  },
  bankettservice: {
    de: "Bankett und Veranstaltungen",
    ru: "Банкеты и мероприятия",
    uk: "Банкети та заходи",
    en: "Banquets and events",
  },

  // Betreuung und Haushalt
  seniorenbetreuung: {
    de: "Seniorenbetreuung",
    ru: "Уход за пожилыми",
    uk: "Догляд за літніми",
    en: "Care for older people",
  },
  pflegehilfe: {
    de: "Pflegehilfe",
    ru: "Помощник по уходу",
    uk: "Помічник з догляду",
    en: "Care assistance",
  },
  kinderbetreuung: {
    de: "Kinderbetreuung",
    ru: "Присмотр за детьми",
    uk: "Догляд за дітьми",
    en: "Childcare",
  },
  haushaltshilfe: {
    de: "Haushaltshilfe",
    ru: "Помощь по хозяйству",
    uk: "Допомога по господарству",
    en: "Household help",
  },
  einkaufshilfe: {
    de: "Einkaufshilfe",
    ru: "Помощь с покупками",
    uk: "Допомога з покупками",
    en: "Shopping help",
  },
  begleitdienst: {
    de: "Begleitdienst zu Terminen",
    ru: "Сопровождение на приёмы",
    uk: "Супровід на прийоми",
    en: "Accompanying to appointments",
  },
  tierbetreuung: {
    de: "Tierbetreuung",
    ru: "Присмотр за животными",
    uk: "Догляд за тваринами",
    en: "Pet care",
  },

  // Sicherheit und Empfang
  objektschutz: {
    de: "Objektschutz",
    ru: "Охрана объектов",
    uk: "Охорона обʼєктів",
    en: "Site security",
  },
  pfoertnerdienst: {
    de: "Pförtnerdienst",
    ru: "Вахтёр",
    uk: "Вахтер",
    en: "Gatekeeping",
  },
  empfangsdienst: {
    de: "Empfang",
    ru: "Ресепшн",
    uk: "Ресепшн",
    en: "Reception",
  },
  veranstaltungsordner: {
    de: "Veranstaltungsordner",
    ru: "Охрана мероприятий",
    uk: "Охорона заходів",
    en: "Event stewarding",
  },

  // Produktion und Hilfsarbeiten
  bauhelfer: {
    de: "Bauhelfer",
    ru: "Подсобник на стройке",
    uk: "Підсобник на будівництві",
    en: "Construction labourer",
  },
  montagehelfer: {
    de: "Montagehelfer",
    ru: "Помощник монтажника",
    uk: "Помічник монтажника",
    en: "Assembly helper",
  },
  produktionshelfer: {
    de: "Produktionshelfer",
    ru: "Рабочий на производстве",
    uk: "Робітник на виробництві",
    en: "Production worker",
  },
  maschinenbedienung: {
    de: "Maschinenbedienung",
    ru: "Работа на станке",
    uk: "Робота на станку",
    en: "Machine operation",
  },
  qualitaetskontrolle: {
    de: "Qualitätskontrolle",
    ru: "Контроль качества",
    uk: "Контроль якості",
    en: "Quality control",
  },
  verpackung: {
    de: "Verpackung",
    ru: "Упаковка",
    uk: "Упаковка",
    en: "Packing",
  },

  // Büro und Verwaltung
  buerotaetigkeit: {
    de: "Bürotätigkeit",
    ru: "Офисная работа",
    uk: "Офісна робота",
    en: "Office work",
  },
  buchhaltung: {
    de: "Buchhaltung",
    ru: "Бухгалтерия",
    uk: "Бухгалтерія",
    en: "Bookkeeping",
  },
  disposition: {
    de: "Disposition und Einsatzplanung",
    ru: "Диспетчеризация, планирование",
    uk: "Диспетчеризація, планування",
    en: "Scheduling and dispatch",
  },
  kundentelefonie: {
    de: "Kundentelefonie",
    ru: "Работа с клиентами по телефону",
    uk: "Робота з клієнтами телефоном",
    en: "Customer calls",
  },
  uebersetzen: {
    de: "Übersetzen und Dolmetschen",
    ru: "Перевод, устный перевод",
    uk: "Переклад, усний переклад",
    en: "Translation and interpreting",
  },
  itsupport: {
    de: "IT-Support",
    ru: "ИТ-поддержка",
    uk: "ІТ-підтримка",
    en: "IT support",
  },
};

/** Ist der Schlüssel im Katalog gültig, auch wenn er nicht mehr erhoben wird? */
export function isKnownAbility(value: string): value is Ability {
  return (
    (ABILITIES as readonly string[]).includes(value) || RETIRED_ABILITIES.includes(value)
  );
}

/** Gruppe, in der eine Fähigkeit steht. Für Anzeige und Auswertung. */
export function groupOf(ability: string): AbilityGroupId | undefined {
  return ABILITY_GROUPS.find((group) =>
    (group.abilities as readonly string[]).includes(ability),
  )?.id;
}
