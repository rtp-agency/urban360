# Datenbestände

## postal-codes.json

8298 deutsche Postleitzahlen mit Ortsnamen und Mittelpunktkoordinate.

Wird von `npm run db:seed` in die Tabelle `postal_codes` eingespielt und dient
zwei Zwecken: der Entfernung zwischen Wohnort und Einsatzort bei der Auswahl,
und dem Ortsschlagwort eines Kandidaten.

Bewusst als Datei im Projekt und nicht über einen Geodienst. Sonst ginge bei
jeder Auswahl die Adresse eines Bewerbers an einen Dritten, und aus einer
internen Rechenoperation würde eine Datenübermittlung, die in der
Datenschutzerklärung stehen müsste.

### Herkunft und Lizenz

Zusammengesetzt aus zwei Quellen:

- Koordinaten: [WZB Social Science Center, plz_geocoord](https://github.com/WZBSocialScienceCenter/plz_geocoord) (Apache 2.0)
- Ortsnamen: [GeoNames Postal Codes](https://download.geonames.org/export/zip/), lizenziert unter
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — bei Weitergabe der Daten ist
  GeoNames als Quelle zu nennen

Bei fünf Postleitzahlen ist kein Ortsname hinterlegt; die Entfernungsrechnung
funktioniert dort trotzdem, nur das automatische Ortsschlagwort entfällt.

### Aktualisieren

Neue Postleitzahlen kommen selten dazu. Wenn nötig, beide Quellen erneut laden,
nach Postleitzahl zusammenführen und die Datei ersetzen, danach `npm run db:seed`
erneut ausführen. Bestehende Einträge werden dabei nicht überschrieben.
