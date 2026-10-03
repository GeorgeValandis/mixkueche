# Mixküche

Begleit-App zum Thermomix TM6 ohne Cookidoo-Abo: eigene Rezepte Schritt für Schritt, mit TM6-Einstellungen (Zeit · Temperatur · Stufe), Portionsrechner und Timer. Statische PWA auf GitHub Pages, installierbar über Safari → Teilen → „Zum Home-Bildschirm“.

- Rezepte: `recipes.json` (Array, Schema siehe `lahmacun`; Schritte nutzen `{zutatId}` im Text, `tm: {time (Sek.), temp, speed, reverse, mode: "dough"}`, `oven`, `timer`, `tip`)
- Fotos: nur CC0/gemeinfrei (z. B. Wikimedia Commons) unter `img/`, Quelle in `imageCredit`
- Nach Änderungen an App-Dateien `CACHE` in `sw.js` hochzählen
