import type { MetadataRoute } from "next";
import { contact, legal, site } from "@/content/site.config";

/**
 * Solange die Pflichtangaben Platzhalter enthalten, wird die Seite auf
 * noindex gestellt.
 *
 * Grund: eine öffentlich indexierte Seite mit unvollständigem Impressum ist
 * nach § 5 DDG angreifbar, und einmal indexierte Platzhalter stehen noch
 * Wochen später im Suchergebnis. Der Schalter verschwindet von selbst,
 * sobald in site.config.ts kein TODO mehr steht.
 */
const placeholders = [
  site.url,
  contact.street,
  contact.city,
  contact.email,
  contact.phone,
  legal.legalName,
  legal.hostingProvider,
];

export const isDraft = placeholders.some((value) => value.includes("TODO"));

export default function robots(): MetadataRoute.Robots {
  if (isDraft) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
