"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const user = await signIn(email, password);

  /* Bewusst eine einzige, unspezifische Meldung. Ein "Passwort falsch"
     würde bestätigen, dass die Adresse existiert. */
  if (!user) {
    return { error: "Anmeldung fehlgeschlagen." };
  }

  redirect("/admin/kandidaten");
}
