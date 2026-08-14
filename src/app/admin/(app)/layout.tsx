import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { t } from "@/content/admin";
import { signOutAction } from "./actions";

/**
 * Защита админки. Проверка стоит здесь, а не только в middleware:
 * middleware видит лишь наличие cookie, а действительна ли сессия —
 * знает только база.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/admin/login");

  const nav = [
    { href: "/admin/kandidaten", label: t.navCandidates },
    { href: "/admin/auftrag", label: t.navOrder },
  ];

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
          <Link href="/admin/kandidaten" className="text-[15px] font-semibold tracking-tight text-ink">
            {t.brand}
            <span className="ml-1.5 font-normal text-muted">{t.brandSuffix}</span>
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
                {t.signOut}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-8">{children}</main>
    </div>
  );
}
