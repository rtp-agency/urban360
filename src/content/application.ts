import type {
  AppLocale,
  AvailabilityKind,
  LanguageCode,
  LanguageLevel,
  License,
  Permit,
  Shift,
  Skill,
} from "./recruiting";

/**
 * ÜBERSETZUNGEN DES BEWERBUNGSBOGENS
 *
 * Vier Sprachen, weil der Bogen per WhatsApp an Menschen geht, die häufig
 * kein Deutsch lesen. Ein Formular in einer fremden Sprache ist ein
 * abgebrochenes Formular.
 *
 * Übersetzt wird nur die Anzeige. Die gespeicherten Schlüssel bleiben
 * sprachneutral, siehe recruiting.ts.
 */

type T = Record<AppLocale, string>;

export const CONSENT_VERSION = "2026-08-05";

export const ui = {
  brand: {
    de: "Urban360 Work",
    ru: "Urban360 Work",
    uk: "Urban360 Work",
    en: "Urban360 Work",
  },
  pageTitle: {
    de: "Bewerbung",
    ru: "Анкета кандидата",
    uk: "Анкета кандидата",
    en: "Application",
  },
  intro: {
    de: "Fünf kurze Schritte, etwa drei Minuten. Danach melden wir uns, sobald ein passender Einsatz da ist.",
    ru: "Пять коротких шагов, примерно три минуты. Мы свяжемся, как только появится подходящая работа.",
    uk: "П’ять коротких кроків, приблизно три хвилини. Ми зв’яжемося, щойно з’явиться відповідна робота.",
    en: "Five short steps, about three minutes. We get in touch as soon as suitable work comes up.",
  },
  stepOf: { de: "Schritt", ru: "Шаг", uk: "Крок", en: "Step" },
  of: { de: "von", ru: "из", uk: "з", en: "of" },
  next: { de: "Weiter", ru: "Далее", uk: "Далі", en: "Next" },
  back: { de: "Zurück", ru: "Назад", uk: "Назад", en: "Back" },
  submit: { de: "Bewerbung absenden", ru: "Отправить анкету", uk: "Надіслати анкету", en: "Send application" },
  sending: { de: "Wird gesendet", ru: "Отправляем", uk: "Надсилаємо", en: "Sending" },
  optional: { de: "freiwillig", ru: "необязательно", uk: "необов’язково", en: "optional" },
  required: { de: "Pflichtfeld", ru: "обязательно", uk: "обов’язково", en: "required" },
  chooseMultiple: {
    de: "Mehrfachauswahl möglich",
    ru: "Можно выбрать несколько",
    uk: "Можна обрати кілька",
    en: "Choose as many as apply",
  },

  stepContact: { de: "Kontakt", ru: "Контакты", uk: "Контакти", en: "Contact" },
  stepLocation: { de: "Ort und Anfahrt", ru: "Город и поездки", uk: "Місто та поїздки", en: "Location and travel" },
  stepSkills: { de: "Sprachen und Fertigkeiten", ru: "Языки и навыки", uk: "Мови та навички", en: "Languages and skills" },
  stepAvailability: { de: "Verfügbarkeit", ru: "Занятость", uk: "Зайнятість", en: "Availability" },
  stepStatus: { de: "Status und Einwilligung", ru: "Статус и согласие", uk: "Статус і згода", en: "Status and consent" },

  firstName: { de: "Vorname", ru: "Имя", uk: "Ім’я", en: "First name" },
  lastName: { de: "Nachname", ru: "Фамилия", uk: "Прізвище", en: "Last name" },
  phone: { de: "Telefon", ru: "Телефон", uk: "Телефон", en: "Phone" },
  phoneHint: {
    de: "Am besten die Nummer, unter der Sie auch WhatsApp nutzen",
    ru: "Лучше тот номер, на котором у вас WhatsApp",
    uk: "Краще той номер, де у вас WhatsApp",
    en: "Ideally the number you use for WhatsApp",
  },
  whatsappSame: {
    de: "WhatsApp läuft über dieselbe Nummer",
    ru: "WhatsApp на этом же номере",
    uk: "WhatsApp на цьому ж номері",
    en: "WhatsApp uses the same number",
  },
  whatsapp: { de: "WhatsApp-Nummer", ru: "Номер WhatsApp", uk: "Номер WhatsApp", en: "WhatsApp number" },
  email: { de: "E-Mail", ru: "E-mail", uk: "E-mail", en: "Email" },

  city: { de: "Wohnort", ru: "Город", uk: "Місто", en: "Town or city" },
  postalCode: { de: "Postleitzahl", ru: "Индекс (PLZ)", uk: "Індекс (PLZ)", en: "Postcode" },
  radius: {
    de: "Wie weit fahren Sie zu einem Einsatz?",
    ru: "Как далеко готовы ездить на работу?",
    uk: "Як далеко готові їздити на роботу?",
    en: "How far will you travel for a job?",
  },
  hasCar: {
    de: "Ich habe ein eigenes Auto",
    ru: "У меня есть машина",
    uk: "У мене є автомобіль",
    en: "I have my own car",
  },
  licenses: { de: "Führerschein", ru: "Водительские права", uk: "Водійські права", en: "Driving licence" },

  languages: {
    de: "Welche Sprachen sprechen Sie?",
    ru: "Какими языками владеете?",
    uk: "Якими мовами володієте?",
    en: "Which languages do you speak?",
  },
  languageLevelHint: {
    de: "Sprache antippen, dann das Niveau wählen",
    ru: "Нажмите на язык, потом выберите уровень",
    uk: "Натисніть на мову, потім оберіть рівень",
    en: "Tap a language, then pick your level",
  },
  skills: {
    de: "Was können Sie übernehmen?",
    ru: "Какую работу можете выполнять?",
    uk: "Яку роботу можете виконувати?",
    en: "What work can you take on?",
  },
  experience: {
    de: "Erfahrung, kurz beschrieben",
    ru: "Опыт, кратко",
    uk: "Досвід, коротко",
    en: "Your experience, briefly",
  },
  experienceHint: {
    de: "Zum Beispiel: zwei Jahre Zimmerreinigung im Hotel, danach Büroreinigung",
    ru: "Например: два года уборка номеров в отеле, потом офисы",
    uk: "Наприклад: два роки прибирання номерів у готелі, потім офіси",
    en: "For example: two years cleaning hotel rooms, then offices",
  },

  availability: { de: "Umfang", ru: "Занятость", uk: "Зайнятість", en: "Type of work" },
  shifts: { de: "Tageszeit", ru: "Время суток", uk: "Час доби", en: "Time of day" },
  availableFrom: { de: "Verfügbar ab", ru: "Готов приступить с", uk: "Готовий почати з", en: "Available from" },
  hoursPerWeek: {
    de: "Gewünschte Stunden pro Woche",
    ru: "Желаемых часов в неделю",
    uk: "Бажаних годин на тиждень",
    en: "Preferred hours per week",
  },

  permits: {
    de: "Ihr Status in Deutschland",
    ru: "Ваш статус в Германии",
    uk: "Ваш статус у Німеччині",
    en: "Your status in Germany",
  },
  permitsHint: {
    de: "Die Angabe ist freiwillig und wirkt sich nicht auf die Bearbeitung aus. Sie hilft uns nur einzuschätzen, welche Einsätze ohne weitere Schritte möglich sind.",
    ru: "Отвечать необязательно, на рассмотрение анкеты это не влияет. Помогает понять, какие заказы доступны сразу.",
    uk: "Відповідати необов’язково, на розгляд анкети це не впливає. Допомагає зрозуміти, які замовлення доступні одразу.",
    en: "This is voluntary and does not affect how we handle your application. It only helps us see which jobs are possible right away.",
  },

  consent: {
    de: "Ich bin einverstanden, dass Urban360 meine Angaben speichert, um mich für passende Einsätze zu berücksichtigen. Ich kann das jederzeit widerrufen.",
    ru: "Согласен(на), что Urban360 сохранит мои данные, чтобы предлагать мне подходящую работу. Согласие можно отозвать в любой момент.",
    uk: "Погоджуюсь, що Urban360 збереже мої дані, щоб пропонувати мені відповідну роботу. Згоду можна відкликати будь-коли.",
    en: "I agree that Urban360 may store my details in order to consider me for suitable work. I can withdraw this at any time.",
  },
  consentRetention: {
    de: "Ohne Zusammenarbeit werden die Daten spätestens nach sechs Monaten gelöscht.",
    ru: "Если сотрудничество не начнётся, данные удаляются не позже чем через шесть месяцев.",
    uk: "Якщо співпраця не почнеться, дані видаляються не пізніше ніж через шість місяців.",
    en: "If no work relationship starts, the data is deleted after six months at the latest.",
  },
  privacyLink: {
    de: "Datenschutzerklärung",
    ru: "Политика обработки данных",
    uk: "Політика обробки даних",
    en: "Privacy policy",
  },

  successTitle: {
    de: "Danke, Ihre Bewerbung ist angekommen.",
    ru: "Спасибо! Ваша анкета принята.",
    uk: "Дякуємо! Вашу анкету прийнято.",
    en: "Thank you, your application has arrived.",
  },
  successBody: {
    de: "Wir melden uns, sobald ein passender Einsatz da ist. Bitte notieren Sie Ihre Nummer, bei Rückfragen geht es damit schneller.",
    ru: "Мы свяжемся, как только появится подходящая работа. Запишите свой номер — с ним быстрее решать вопросы.",
    uk: "Ми зв’яжемося, щойно з’явиться відповідна робота. Запишіть свій номер — із ним швидше вирішувати питання.",
    en: "We will be in touch as soon as suitable work comes up. Please note your number, it speeds up any follow up.",
  },
  yourRef: { de: "Ihre Nummer", ru: "Ваш номер", uk: "Ваш номер", en: "Your reference" },

  errRequired: { de: "Bitte ausfüllen", ru: "Заполните это поле", uk: "Заповніть це поле", en: "Please fill this in" },
  errEmail: { de: "E-Mail-Adresse prüfen", ru: "Проверьте адрес e-mail", uk: "Перевірте адресу e-mail", en: "Check the email address" },
  errPhone: {
    de: "Telefonnummer prüfen",
    ru: "Проверьте номер телефона",
    uk: "Перевірте номер телефону",
    en: "Check the phone number",
  },
  errPlz: {
    de: "Fünfstellige Postleitzahl angeben",
    ru: "Укажите пятизначный индекс",
    uk: "Вкажіть п’ятизначний індекс",
    en: "Enter a five digit postcode",
  },
  errSkills: {
    de: "Mindestens eine Tätigkeit wählen",
    ru: "Выберите хотя бы один вид работы",
    uk: "Оберіть хоча б один вид роботи",
    en: "Choose at least one type of work",
  },
  errConsent: {
    de: "Ohne Einwilligung können wir die Bewerbung nicht speichern",
    ru: "Без согласия мы не можем сохранить анкету",
    uk: "Без згоди ми не можемо зберегти анкету",
    en: "Without consent we cannot store the application",
  },
  errGeneric: {
    de: "Das hat nicht geklappt. Bitte noch einmal versuchen.",
    ru: "Не получилось. Попробуйте ещё раз.",
    uk: "Не вийшло. Спробуйте ще раз.",
    en: "That did not work. Please try again.",
  },
} satisfies Record<string, T>;

export const skillLabels: Record<Skill, T> = {
  reinigung: { de: "Reinigung", ru: "Уборка", uk: "Прибирання", en: "Cleaning" },
  grundreinigung: { de: "Grundreinigung", ru: "Генеральная уборка", uk: "Генеральне прибирання", en: "Deep cleaning" },
  endreinigung: { de: "Endreinigung", ru: "Уборка после ремонта", uk: "Прибирання після ремонту", en: "Post construction cleaning" },
  bueroreinigung: { de: "Büroreinigung", ru: "Уборка офисов", uk: "Прибирання офісів", en: "Office cleaning" },
  housekeeping: { de: "Hotel und Housekeeping", ru: "Отель, housekeeping", uk: "Готель, housekeeping", en: "Hotel and housekeeping" },
  gastronomie: { de: "Gastronomie", ru: "Общепит", uk: "Заклади харчування", en: "Hospitality" },
  kueche: { de: "Küche", ru: "Кухня", uk: "Кухня", en: "Kitchen" },
  service: { de: "Service", ru: "Обслуживание зала", uk: "Обслуговування залу", en: "Waiting and service" },
  lager: { de: "Lager", ru: "Склад", uk: "Склад", en: "Warehouse" },
  umzug: { de: "Umzug", ru: "Переезды", uk: "Переїзди", en: "Removals" },
  moebelmontage: { de: "Möbelmontage", ru: "Сборка мебели", uk: "Збирання меблів", en: "Furniture assembly" },
  gartenarbeit: { de: "Gartenarbeit", ru: "Работа в саду", uk: "Робота в саду", en: "Garden work" },
  handwerk: { de: "Handwerk", ru: "Мелкий ремонт", uk: "Дрібний ремонт", en: "Handyman work" },
  fensterreinigung: { de: "Fensterreinigung", ru: "Мытьё окон", uk: "Миття вікон", en: "Window cleaning" },
  sonderreinigung: { de: "Sonderreinigung", ru: "Специальная уборка", uk: "Спеціальне прибирання", en: "Specialist cleaning" },
  andere: { de: "Anderes", ru: "Другое", uk: "Інше", en: "Something else" },
};

export const languageLabels: Record<LanguageCode, T> = {
  de: { de: "Deutsch", ru: "Немецкий", uk: "Німецька", en: "German" },
  ru: { de: "Russisch", ru: "Русский", uk: "Російська", en: "Russian" },
  uk: { de: "Ukrainisch", ru: "Украинский", uk: "Українська", en: "Ukrainian" },
  en: { de: "Englisch", ru: "Английский", uk: "Англійська", en: "English" },
  andere: { de: "Andere", ru: "Другой", uk: "Інша", en: "Other" },
};

export const languageLevelLabels: Record<LanguageLevel, T> = {
  grund: { de: "Grundkenntnisse", ru: "Базовый", uk: "Базовий", en: "Basic" },
  gut: { de: "Gut", ru: "Хорошо", uk: "Добре", en: "Good" },
  flie: { de: "Fließend", ru: "Свободно", uk: "Вільно", en: "Fluent" },
};

export const availabilityLabels: Record<AvailabilityKind, T> = {
  vollzeit: { de: "Vollzeit", ru: "Полная занятость", uk: "Повна зайнятість", en: "Full time" },
  teilzeit: { de: "Teilzeit", ru: "Частичная занятость", uk: "Часткова зайнятість", en: "Part time" },
  minijob: { de: "Minijob", ru: "Мини-джоб", uk: "Міні-джоб", en: "Minijob" },
  einmalig: { de: "Einzelne Aufträge", ru: "Разовые заказы", uk: "Разові замовлення", en: "One off jobs" },
  wochenende: { de: "Wochenende", ru: "Выходные", uk: "Вихідні", en: "Weekends" },
};

export const shiftLabels: Record<Shift, T> = {
  morgens: { de: "Morgens", ru: "Утром", uk: "Вранці", en: "Mornings" },
  tagsueber: { de: "Tagsüber", ru: "Днём", uk: "Вдень", en: "Daytime" },
  abends: { de: "Abends", ru: "Вечером", uk: "Ввечері", en: "Evenings" },
  nachts: { de: "Nachts", ru: "Ночью", uk: "Вночі", en: "Nights" },
};

export const permitLabels: Record<Permit, T> = {
  eu: { de: "EU-Bürger", ru: "Гражданство ЕС", uk: "Громадянство ЄС", en: "EU citizen" },
  arbeitserlaubnis: { de: "Arbeitserlaubnis", ru: "Разрешение на работу", uk: "Дозвіл на роботу", en: "Work permit" },
  par24: { de: "§ 24 AufenthG", ru: "§ 24 (защита из Украины)", uk: "§ 24 (захист з України)", en: "§ 24 residence" },
  aufenthaltstitel: { de: "Aufenthaltstitel", ru: "Вид на жительство", uk: "Посвідка на проживання", en: "Residence title" },
  selbststaendig: { de: "Selbstständig", ru: "Самозанятый", uk: "Самозайнятий", en: "Self employed" },
  andere: { de: "Anderes", ru: "Другое", uk: "Інше", en: "Other" },
  unklar: { de: "Weiß ich nicht", ru: "Не знаю", uk: "Не знаю", en: "Not sure" },
};

export const licenseLabels: Record<License, T> = {
  b: { de: "Klasse B", ru: "Категория B", uk: "Категорія B", en: "Category B" },
  be: { de: "Klasse BE", ru: "Категория BE", uk: "Категорія BE", en: "Category BE" },
  c1: { de: "Klasse C1", ru: "Категория C1", uk: "Категорія C1", en: "Category C1" },
  c: { de: "Klasse C", ru: "Категория C", uk: "Категорія C", en: "Category C" },
  keine: { de: "Kein Führerschein", ru: "Нет прав", uk: "Немає прав", en: "No licence" },
};

/** Kurzform für den Sprachumschalter. */
export const localeNames: Record<AppLocale, string> = {
  de: "Deutsch",
  ru: "Русский",
  uk: "Українська",
  en: "English",
};

export function tr(entry: T, locale: AppLocale): string {
  return entry[locale] ?? entry.de;
}
