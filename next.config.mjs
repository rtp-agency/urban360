/**
 * Nur in der Entwicklung: Next bindet dort React Refresh ein, und dessen
 * Laufzeit wertet Code mit eval() aus. Ohne 'unsafe-eval' bricht die
 * Hydration ab, und damit ist im Entwicklungsserver JEDE Client-Komponente
 * tot: das Mobilmenü, das Kontaktformular und der Bewerbungsbogen reagieren
 * dann auf keinen Klick, ohne dass eine Fehlermeldung sichtbar wird.
 *
 * Der Auslieferungs-Build benutzt kein eval. Die Richtlinie in Produktion
 * bleibt deshalb unverändert streng, und das ist die einzige, die je
 * ausgeliefert wird.
 */
const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Alle Assets liegen lokal. Es gibt bewusst keine remotePatterns:
  // jede externe Bildquelle wäre ein Drittland-/Drittanbieter-Request
  // und würde die einwilligungsfreie Architektur der Seite brechen.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), interest-cohort=()" },
          {
            // Erzwingt, dass die Seite keine externen Ressourcen nachladen kann.
            // Wer hier etwas lockern will, prüft vorher die Datenschutzerklärung.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' data:",
              "style-src 'self' 'unsafe-inline'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
