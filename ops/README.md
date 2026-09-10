# Betrieb auf dem eigenen Server

Zielmaschine: `opc@92.5.41.118`, Oracle Linux 9, ARM, Region `eu-frankfurt-1`.

**Auf der Maschine laeuft bereits ein fremdes Produktivsystem** (`chystyi.site`,
Docker-Stack `threadsauto`, Caddy auf 80/443). Alles hier ist so gebaut, dass
es daneben liegt und nichts davon anfasst: eigener Compose-Stack, eigene
Datenbank, eigenes Volume, Veroeffentlichung nur auf `127.0.0.1`.

## Aufbau

```
Caddy :80/:443  ──>  127.0.0.1:3000   urban360-web-1   (Next, standalone)
                                            │
                                      127.0.0.1:5432   urban360-db-1   (Postgres 16)
```

Geheimnisse stehen in `/home/opc/urban360/.env` (Rechte 600) und nie im
Repository. Erzeugt wurden sie auf dem Server mit `openssl rand`.

## Erstmaliges Aufsetzen

```bash
rsync -az --delete --exclude node_modules --exclude .next --exclude .git \
  --exclude '.env*' ./ opc@92.5.41.118:/home/opc/urban360/

ssh opc@92.5.41.118 'cd /home/opc/urban360 && docker compose up -d --build'
```

Schema einspielen. Die Datenbank ist nach aussen zu, deshalb ueber einen
Tunnel:

```bash
PW=$(ssh opc@92.5.41.118 'grep ^POSTGRES_PASSWORD= /home/opc/urban360/.env | cut -d= -f2-')
ssh -f -N -L 55432:127.0.0.1:5432 opc@92.5.41.118
DATABASE_URL="postgres://urban360:$PW@127.0.0.1:55432/urban360" npx drizzle-kit push
```

Verwaltungszugang anlegen: derselbe Tunnel, dann `npm run admin:create`.

## Neue Fassung ausliefern

```bash
rsync -az --delete --exclude node_modules --exclude .next --exclude .git \
  --exclude '.env*' ./ opc@92.5.41.118:/home/opc/urban360/
ssh opc@92.5.41.118 'cd /home/opc/urban360 && docker compose up -d --build'
```

Schemaaenderungen laufen nicht automatisch mit. Wer `src/db/schema.ts`
anfasst, spielt sie ueber den Tunnel getrennt ein.

## Caddy anschliessen

`ops/Caddyfile.urban360` an `/etc/caddy/Caddyfile` anhaengen, pruefen, neu
laden. Erst sinnvoll, wenn der Name auf diese Maschine zeigt: sonst versucht
Caddy vergeblich, ein Zertifikat zu holen.

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak-$(date +%F)

# Protokollverzeichnis. Beide Zeilen sind noetig, nicht nur die erste.
sudo mkdir -p /var/log/caddy && sudo chown caddy:caddy /var/log/caddy
sudo semanage fcontext -a -t httpd_log_t "/var/log/caddy(/.*)?"
sudo restorecon -Rv /var/log/caddy

sudo sh -c 'cat /home/opc/urban360/ops/Caddyfile.urban360 >> /etc/caddy/Caddyfile'
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
sudo systemctl reload caddy
curl -sI https://chystyi.site | head -1   # Nachbar muss unveraendert antworten
```

### Warum der SELinux-Schritt notwendig ist

Oracle Linux faehrt SELinux im Modus enforcing, und der Caddy-Prozess laeuft
in der Domaene `httpd_t`. Diese Domaene darf ausschliesslich in Dateien vom
Typ `httpd_log_t` schreiben. Ein frisch angelegtes `/var/log/caddy` bekommt
aber `var_log_t`, und Caddy scheitert dann beim Neuladen mit einem
schlichten `permission denied`, obwohl Eigentuemer und Rechte richtig
aussehen.

Zwei Stolperfallen dabei:

- `sudo -u caddy touch ...` schlaegt NICHT fehl und beweist deshalb nichts:
  eine Shell laeuft in `unconfined_t`, nicht in `httpd_t`.
- `caddy validate` unter sudo legt die Protokolldatei als `root` an. Danach
  gehoert sie root und Caddy kommt auch mit richtigem Kontext nicht mehr
  hinein. Dann `sudo chown caddy:caddy /var/log/caddy/urban360.log`.

`semanage` statt `chcon`, weil `chcon` beim naechsten Relabel des Dateisystems
verloren geht.

### Wenn das Neuladen scheitert

`systemctl reload caddy` laedt die neue Fassung ueber die Verwaltungs-API.
Wird sie abgelehnt, laeuft der alte Stand einfach weiter: der Nachbar auf
derselben Maschine geht dabei nicht mit unter. Ursache steht im Klartext in
`journalctl -u caddy --since '5 min ago'`.

## Was automatisch laeuft

| Einheit | Zeit | Zweck |
|---|---|---|
| `urban360-backup.timer` | taeglich 02:30 | `pg_dump` nach `/home/opc/backups/urban360`, 14 Tage |
| `urban360-purge.timer` | taeglich 03:00 | `/api/cron/purge`, Aufbewahrungsfristen aus `docs/04` |

Beide mit `Persistent=true`: ein wegen Neustart ausgefallener Lauf wird
nachgeholt. Eine uebersprungene Loeschfrist waere sonst dauerhaft
ueberschritten.

Nachsehen:

```bash
systemctl list-timers 'urban360-*'
journalctl -u urban360-purge.service -n 20
ls -lh /home/opc/backups/urban360
```

## Sicherung zuruecklegen

```bash
gunzip -c /home/opc/backups/urban360/urban360-JJJJ-MM-TT-HHMM.sql.gz \
  | docker exec -i urban360-db-1 psql -U urban360 -d urban360
```

Die Sicherungen sind mit `--clean --if-exists` erzeugt, die Datei allein
genuegt also.

## Vor dem Livegang pruefen

- `legal.hostingProvider` in `src/content/site.config.ts` steht noch auf
  `TODO`. Solange dort ein Platzhalter steht, bleibt die Seite auf
  `noindex` (siehe `src/app/robots.ts`), und §5 DDG ist nicht erfuellt.
- Ein Auftragsverarbeitungsvertrag mit dem Betreiber der Maschine gehoert
  unterschrieben in die Ablage, bevor echte Bewerbungen eingehen.
