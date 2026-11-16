# pi-alpha.org: demo migrace na GitHub Pages

Náhled, jak bude pi-alpha.org vypadat na GitHub Pages s mobilní vrstvou. **Není to ostrý web**,
originál je na https://pi-alpha.org/. Stránky mají `noindex`, vyhledávače je neindexují.

- `site/` jsou stránky z pi-alpha.org převedené na UTF-8 a s příponou `.html`; podepsané originály
  zůstávají beze změny v `site/raw/`.
- Obrázky, videa a PDF se načítají z úložiště Cloudflare R2 (`data/assets-map.json`).
- Mobilní vrstva (`shared/mobile.css`) se přidává až při buildu, `site/` ji neobsahuje.
  Na počítači zůstává vzhled stejný jako originál.

Známá omezení dema: videa na `/Sc26/Video/` (adresy skládá JavaScript) a dynamické části
(diskuse, `/Hash`, mapy `/Ecmwf`) v demu nefungují. V ostré migraci je řeší
plán v repu Sunny.

Build: `scripts/build_site.sh _site` (proměnné repa `DOMAIN`, `MOBILE`, `PREVIEW`).
