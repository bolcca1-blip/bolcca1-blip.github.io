DOMÁCÍ PANEL V6 – PWA / HTTPS

Tato verze je připravena pro GitHub Pages a instalaci jako PWA.

Co je nové:
- HTTPS/PWA struktura
- manifest.json + 192/512px ikony
- samostatný režim aplikace bez content:// adresního řádku
- service worker s cache aplikace
- tlačítko Instalovat aplikaci (pokud jej prohlížeč podporuje)
- YouTube iframe má HTTPS origin a referrer policy
- YouTube URL obsahuje origin aktuálního webu
- GitHub Pages workflow je součástí .github/workflows/pages.yml
- zachované rádio, recepty, kreslení, počasí, poznámky, úkoly a ostatní dashboard funkce

Doporučený GitHub repozitář:
bolcca1-blip.github.io

Po nasazení bude adresa:
https://bolcca1-blip.github.io/

DŮLEŽITÉ:
YouTube API klíč nastavte v Google Cloud Console pouze pro YouTube Data API v3
a po nasazení jej omezte HTTP referrerem:
https://bolcca1-blip.github.io/*
