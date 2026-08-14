import { site } from "@/content/site.config";
import { SKILL_TAGS, type Skill } from "@/content/recruiting";

/**
 * Уведомление о новой анкете.
 *
 * ВАЖНО, НЕ ОСЛАБЛЯТЬ: в сообщении нет персональных данных. Ни имени, ни
 * телефона, ни e-mail, ни статуса пребывания. Только номер анкеты, город,
 * области работ и ссылка в админку.
 *
 * Причина: Telegram — сервис за пределами ЕС. У чата нет разграничения
 * доступа, нет срока хранения и нет договора об обработке. Писать туда имена
 * и телефоны, тем более статус пребывания, означало бы передачу персональных
 * данных в третью страну без правового основания. Ссылка ведёт в закрытую
 * паролем админку, где данные лежат и где доступ протоколируется.
 *
 * Тип Payload ниже намеренно не содержит полей с персональными данными:
 * утечка здесь не «маловероятна», а невозможна без правки кода.
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
      "[notify] Не задан TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID, уведомление пропущено.",
      { ref: payload.ref },
    );
    return;
  }

  // Только первые две цифры индекса: полный индекс в малонаселённой
  // местности сам по себе указывает на человека.
  const area = `${payload.postalCode.slice(0, 2)}xxx`;
  const areas = [...new Set(payload.skills.map((skill) => SKILL_TAGS[skill]))].join(", ");
  const url = `${site.url}/admin/kandidaten/${payload.candidateId}`;

  const text = [
    "Новая анкета",
    "",
    `Номер: ${payload.ref}`,
    `Город: ${payload.city} (${area})`,
    `Направления: ${areas || "не указаны"}`,
    `Радиус выезда: ${payload.radiusKm} км`,
    `Машина: ${payload.hasCar ? "есть" : "нет"}`,
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
          inline_keyboard: [[{ text: "Открыть в админке", url }]],
        },
      }),
    });

    if (!response.ok) {
      console.error("[notify] Telegram ответил кодом", response.status);
    }
  } catch (error) {
    // Неудачное уведомление не должно ронять приём анкеты: к этому моменту
    // запись уже надёжно лежит в базе.
    console.error("[notify] Не удалось отправить уведомление", error);
  }
}
