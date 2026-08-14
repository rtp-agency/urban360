"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { t } from "@/content/admin";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: t.loginEmpty };
  }

  const user = await signIn(email, password);

  /* Одна и та же неконкретная ошибка в обоих случаях. Сообщение
     «неверный пароль» подтвердило бы, что такой e-mail существует. */
  if (!user) {
    return { error: t.loginFailed };
  }

  redirect("/admin/kandidaten");
}
