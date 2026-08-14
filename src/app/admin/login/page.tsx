import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { t } from "@/content/admin";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await currentUser()) redirect("/admin/kandidaten");

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[400px] flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.loginTitle}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.loginLead}</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
