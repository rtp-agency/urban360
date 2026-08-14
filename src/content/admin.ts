import type { Level, Status } from "./recruiting";

/**
 * ТЕКСТЫ АДМИНКИ
 *
 * Интерфейс на русском: им пользуется владелец фирмы и координаторы, а не
 * заказчики. Анкета кандидата при этом остаётся четырёхъязычной — её читают
 * совсем другие люди, см. src/content/application.ts.
 *
 * Значения статусов и тегов в базе остаются латиницей и не переводятся:
 * это ключи, от которых зависят фильтры и подбор. Переводится только показ.
 */

export const STATUS_LABEL: Record<Status, string> = {
  neu: "Новый",
  geprueft: "Проверен",
  verfuegbar: "Свободен",
  beschaeftigt: "На заказе",
  inaktiv: "Неактивен",
};

export const LEVEL_LABEL: Record<Level, string> = {
  einsteiger: "Начинающий",
  erfahren: "Опытный",
  profi: "Профи",
};

export const t = {
  // Шапка и вход
  brand: "Urban360",
  brandSuffix: "База персонала",
  navCandidates: "Кандидаты",
  navOrder: "Подбор под заказ",
  signOut: "Выйти",

  loginTitle: "Urban360 — вход",
  loginLead:
    "Доступ только для сотрудников. Каждое обращение к данным кандидатов записывается в журнал.",
  loginEmail: "E-mail",
  loginPassword: "Пароль",
  loginSubmit: "Войти",
  loginPending: "Проверяем",
  loginFailed: "Не удалось войти.",
  loginEmpty: "Введите e-mail и пароль.",

  // Список
  listTitle: "Кандидаты",
  listShown: (shown: number, total: number) => `показано ${shown} из ${total}`,
  searchPlaceholder: "Имя, телефон, номер анкеты или город",
  searchSubmit: "Найти",
  filterAll: "Все",
  filterCar: "С машиной",
  emptyTitle: "Никого не нашлось.",
  emptyFirst: "Как только по ссылке заполнят первую анкету, она появится здесь.",
  emptyFiltered: "Попробуйте снять фильтры или очистить поиск.",
  upTo: (km: number) => `до ${km} км`,
  hasCar: "машина",

  // Карточка
  backToList: "Назад к списку",
  anonymized:
    "Данные этого кандидата обезличены по требованию и персональной информации больше не содержат.",
  sectionForm: "Что указал кандидат",
  sectionEdit: "Обработка",
  sectionTags: "Теги",
  noValue: "не указано",

  fPhone: "Телефон",
  fWhatsapp: "WhatsApp",
  fWhatsappSame: "тот же номер",
  fEmail: "E-mail",
  fCity: "Город",
  fRadius: "Радиус выезда",
  fCar: "Машина",
  fCarYes: "есть",
  fCarNo: "нет",
  fLicense: "Права",
  fLanguages: "Языки",
  fSkills: "Виды работ",
  fExperience: "Опыт",
  fScope: "Занятость",
  fShift: "Время суток",
  fFrom: "Готов с",
  fFromNow: "сразу",
  fHours: "Часов в неделю",
  fPermit: "Статус в Германии",
  fFilled: "Анкета заполнена",
  fLanguageOfForm: "язык",
  fConsent: "Согласие",
  fConsentVersion: "версия",
  fRetention: "Хранение",

  eStatus: "Статус",
  eLevel: "Уровень",
  eLevelNone: "не оценён",
  eRate: "Ставка, евро в час",
  eNote: "Внутренняя заметка",
  eSave: "Сохранить",

  tagsEmpty: "Тегов пока нет.",
  tagNew: "Новый тег",
  tagAdd: "Добавить",
  tagRemoveHint: "Удалить",

  deleteTitle: "Удалить по требованию",
  deleteLead:
    "Безвозвратно стирает все персональные данные. Применяется, когда человек требует удаления по статье 17 GDPR.",
  deleteButton: "Обезличить данные",

  // Подбор
  orderTitle: "Подбор под заказ",
  orderLead: (w: Record<string, number>) =>
    `Заполните параметры заказа — список отсортируется по совпадению. Процент складывается из видов работ (${w.skills}), расстояния (${w.distance}), времени суток (${w.availability}), языка (${w.language}) и машины (${w.car}).`,
  orderPlz: "Индекс места работы",
  orderCity: "Город",
  orderDate: "Дата",
  orderCount: "Сколько человек",
  orderSkills: "Виды работ",
  orderShifts: "Время суток",
  orderNeedsCar: "Нужна машина",
  orderNeedsGerman: "Нужен немецкий",
  orderSubmit: "Найти подходящих",
  orderFound: (n: number) => `${n} ${plural(n, "подходящий", "подходящих", "подходящих")}`,
  orderShort: (need: number, got: number) => `Нужно ${need}, нашлось ${got}.`,
  orderEmpty:
    "Никто не проходит по жёстким условиям. Ослабьте радиус, дату или требование машины.",
  matchTitle: "Совпадение",

  // Причины оценки
  rSkills: (covered: number, total: number) => `Виды работ ${covered} из ${total}`,
  rSkillsAny: "Виды работ не заданы",
  rDistanceUnknown: "Расстояние неизвестно",
  rDistanceOut: (km: number) => `${km} км, дальше радиуса`,
  rDistance: (km: number) => `${km} км`,
  rShiftOk: (covered: number, total: number) => `Время подходит (${covered} из ${total})`,
  rShiftNo: "Время не подходит",
  rShiftAny: "Время не задано",
  rGerman: (level: string) => `Немецкий: ${level}`,
  rGermanNo: "Немецкий не указан",
  rLangAny: "Язык не требуется",
  rCarYes: "Своя машина",
  rCarNo: "Без машины",

  // Жёсткие отсевы
  bBusy: "на заказе",
  bInactive: "недоступен",
  bNoCar: "нет машины",
  bFrom: (date: string) => `свободен только с ${date}`,

  // Сроки хранения
  retentionDue: "подлежит удалению",
  retentionDays: (days: number) => `удаление через ${days} ${plural(days, "день", "дня", "дней")}`,
  retentionDate: (date: string) => `удаление ${date}`,
} as const;

/** Русские числительные: 1 день, 2 дня, 5 дней. */
export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
