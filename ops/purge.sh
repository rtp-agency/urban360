#!/bin/bash
# Taeglicher Loeschlauf nach den Aufbewahrungsfristen aus docs/04.
#
# Auf Vercel hat das der Eintrag in vercel.json erledigt. Auf einem eigenen
# Server bedeutet dieselbe Datei nichts, und ein stillschweigend nicht
# laufender Lauf heisst: Bewerberdaten liegen laenger als zugesagt. Das ist
# kein Schoenheitsfehler, sondern ein Verstoss gegen die eigene
# Datenschutzerklaerung.
set -euo pipefail

ENV_FILE=/home/opc/urban360/.env
CRON_SECRET=$(grep '^CRON_SECRET=' "$ENV_FILE" | cut -d= -f2-)

if [ -z "$CRON_SECRET" ]; then
  echo "CRON_SECRET fehlt in $ENV_FILE" >&2
  exit 1
fi

# Gegen 127.0.0.1 und nicht gegen die oeffentliche Adresse: der Lauf soll
# auch dann funktionieren, wenn der Name noch nicht zeigt oder Caddy neu
# startet.
RESPONSE=$(curl -fsS --max-time 120 \
  -H "Authorization: Bearer $CRON_SECRET" \
  http://127.0.0.1:3000/api/cron/purge)

echo "Loeschlauf: $RESPONSE"
