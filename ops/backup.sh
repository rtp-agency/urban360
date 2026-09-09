#!/bin/bash
# Naechtliche Sicherung der Bewerberdatenbank.
#
# Mit dem Wegzug von Supabase ist die Sicherung unsere Aufgabe geworden. Ohne
# diesen Lauf haengt der gesamte Bestand an einem einzigen Docker-Volume.
#
# Aufbewahrung: 14 Tage. Laenger waere bei Bewerberdaten schwer zu
# begruenden, kuerzer faengt einen Ausfall ueber ein langes Wochenende nicht
# mehr auf.
set -euo pipefail

DIR=/home/opc/backups/urban360
KEEP_DAYS=14
STAMP=$(date +%F-%H%M)

mkdir -p "$DIR"
chmod 700 "$DIR"

# --clean --if-exists, damit die Datei allein zum Zuruecklegen genuegt.
docker exec urban360-db-1 pg_dump -U urban360 -d urban360 --clean --if-exists \
  | gzip -9 > "$DIR/urban360-$STAMP.sql.gz"

chmod 600 "$DIR/urban360-$STAMP.sql.gz"

# Eine leere Sicherung ist schlimmer als keine: sie verdraengt eine gute.
SIZE=$(stat -c%s "$DIR/urban360-$STAMP.sql.gz")
if [ "$SIZE" -lt 1000 ]; then
  echo "Sicherung ist nur $SIZE Bytes gross, das kann nicht stimmen." >&2
  exit 1
fi

find "$DIR" -name 'urban360-*.sql.gz' -mtime +$KEEP_DAYS -delete
echo "Sicherung abgelegt: $DIR/urban360-$STAMP.sql.gz ($SIZE Bytes)"
