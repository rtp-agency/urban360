import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Urban360 Verwaltung",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Die Verwaltung liegt außerhalb des Sprachsegments und bringt daher html
 * und body selbst mit. Sprache ist Deutsch: Status- und Schlagwortbegriffe
 * sind ohnehin deutsch, und disponiert wird gegenüber deutschen Auftraggebern.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#fbfbfd" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
