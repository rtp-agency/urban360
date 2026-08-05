import type { ReactNode } from "react";
import "./globals.css";

/**
 * Durchreichendes Wurzel-Layout. html und body stehen in
 * app/[locale]/layout.tsx, weil das lang-Attribut die Sprache der
 * jeweiligen Route tragen muss. Ein festes lang="de" über allen Routen
 * wäre für Screenreader falsch, sobald die englische Fassung aufgerufen wird.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
