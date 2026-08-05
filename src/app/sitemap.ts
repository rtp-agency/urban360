import type { MetadataRoute } from "next";
import { LOCALES, site } from "@/content/site.config";

const paths = ["", "leistungen", "ueber-uns", "kontakt", "impressum", "datenschutz", "agb"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path ? `/${path}` : ""}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
