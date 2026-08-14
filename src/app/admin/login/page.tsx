import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await currentUser()) redirect("/admin/kandidaten");

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[400px] flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Urban360 Verwaltung</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Zugang nur für berechtigte Personen. Jeder Zugriff auf Bewerberdaten wird protokolliert.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
