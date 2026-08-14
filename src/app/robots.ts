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

/**
 * Verwaltung und Bewerbungsbogen gehören nie in den Index. Der Bogen wird
 * gezielt per WhatsApp verteilt und nimmt personenbezogene Daten entgegen,
 * die Verwaltung zeigt sie an.
 */
const PRIVATE_PATHS = ["/admin", "/job", "/bewerbung", "/api"];

export default function robots(): MetadataRoute.Robots {
  if (isDraft) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
