import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Urban360 — база персонала",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Админка лежит вне языкового сегмента сайта и поэтому приносит html и body
 * сама. Язык интерфейса русский: с базой работают владелец и координаторы.
 * Анкета кандидата при этом остаётся четырёхъязычной — её читают другие люди.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
