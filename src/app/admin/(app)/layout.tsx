import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { signOutAction } from "./actions";

/**
 * Schutzschild der Verwaltung. Die Prüfung sitzt hier und nicht nur in der
 * Middleware: die Middleware kennt nur das Vorhandensein eines Cookies, ob
 * die Sitzung noch gültig ist, weiß allein die Datenbank.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/admin/login");

  const nav = [
    { href: "/admin/kandidaten", label: "Kandidaten" },
    { href: "/admin/auftrag", label: "Auswahl für Auftrag" },
  ];

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
          <Link href="/admin/kandidaten" className="text-[15px] font-semibold tracking-tight text-ink">
            Urban360
            <span className="ml-1.5 font-normal text-muted">Verwaltung</span>
          </Link>

          <nav className="flex items-center gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-[13px] text-muted sm:inline">{user.name}</span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-[13px] text-muted underline underline-offset-2 transition-colors hover:text-ink"
              >
                Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-8">{children}</main>
    </div>
  );
}
