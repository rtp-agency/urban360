# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Auslieferungsabbild.
#
# Drei Stufen, damit im laufenden Abbild weder Quelltext noch Build-Werkzeuge
# liegen. Das Ergebnis ist der standalone-Server von Next: er bringt nur die
# Abhaengigkeiten mit, die zur Laufzeit wirklich aufgerufen werden.
#
# Der Server laeuft neben einem fremden Produktivsystem auf derselben
# Maschine. Deshalb ist alles hier eng gefasst: eigener Benutzer ohne Rechte,
# kein Port nach aussen, keine Schreibrechte im Anwendungsverzeichnis.
# ---------------------------------------------------------------------------

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Der Build braucht keine Datenbank: die Verbindung entsteht erst beim ersten
# Zugriff (siehe src/db/index.ts), und keine der vorgerenderten Seiten fragt
# etwas ab. Die Verwaltung wird zur Laufzeit gerendert.
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# public und .next/static kopiert der standalone-Build nicht selbst mit.
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
