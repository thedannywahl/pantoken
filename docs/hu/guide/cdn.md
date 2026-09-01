# CDN és terjesztés

pantoken minden csomagot közzétesz az npm-en, így a tokeneket, komponenseket és webkomponenseket közvetlenül
egy CDN-ről húzhatod — nincs build lépés, nincs bundler. Ez az oldal a CSS kombinált URL-jét (interaktív
készítővel) és a webkomponens beillesztéseket ismerteti.

## A token alapja

Minden pantoken komponens egy token lapról a lapra olvassa a `--instui-*` egyéni CSS változókat. Két
változat szállításra kerül:

- `@pantoken/css/dist/style.lean.css` — a javasolt CDN alap. Minden tokent tartalmaz kivéve a
  teljes ikonkészletet, így kb. 23 KB gzippelve.
- `@pantoken/css/dist/style.css` — a teljes lap, beleértve az összes ~1,777 ikon glif tokent
  (`--instui-icon-*`). Kb. 140 KB gzippelve. Töltsd be ezt, ha széles körben hivatkozol ikonokra a
  `var(--instui-icon-*)` segítségével.

Az elevációs skála és a fókuszgyűrű változók mindkét lapon megtalálhatók, így az árnyékok és a fókuszgyűrű
működnek, ha csak az alap betöltve van.

## Válaszd ki a komponenseket és ikonokat

Az [interaktív CDN választó](/guide/cdn-picker) jsDelivr combine URL-eket épít CSS-hez és snippeteket JavaScript csomagokhoz. Nyisd meg, jelöld be, amire szükséged van, és másold ki a generált kimenetet.

- **Components fül** — válassz egyes komponens stíluslapokat vagy a teljes `components.css` barrel-t. Add hozzá az alap resetet vagy a spacing/color utility-ket, ha szükséges.
- **JS fül** — másolj egy ESM import snippettet `@pantoken/interactions` számára.
- **Icons fül** — válassz egyedi ikonokat az InstUI készletből (~1,800 ikon) vagy a Simple Icons-ból (~3,300 márka glif). A választó külön combine URL-t ad az ikon CSS fájlokhoz, így csak a ténylegesen használt ikonokat töltheted be.
- **Web Components fül** — építs `@pantoken/web-components` snippeteket (ESM szelektív regisztráció vagy klasszikus script bootstrap).

Minden komponens fájl kicsi — a legtöbb kb. 2 KB. Egy ikonokat renderelő komponens (`alert`, `checkbox`,
és néhány más) igényli ezeket a glifeket, így a készítő hozzáad `@pantoken/components/dist/component-icons.css`-t (kb.
0.5 KB gzippelve — a komponenskészlet által használt 11 ikon) amikor a lean lapot választod. A teljes lap
már tartalmazza őket.

### Betöltési sorrend és betűtípusok

Először töltsd be a token alapot, majd az opcionális base resetet, aztán a komponens fájlokat, és végül a utility-ket — ezek felülíró utility-k, így csak akkor írnak felül egy komponens szabályt, ha a kaszkádban utána érkeznek. A fenti combine URL már rendezi őket helyetted. A betűtípusok az egyetlen kivétel:
`@pantoken/components/dist/fonts.css` relatív útvonalakkal hivatkozik betűfájlokra, így a combine nem tudja átírni
azokat — töltsd be külön mint `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Minden egyszerre

Jelöld be a választóban az **All components** opciót, hogy a barrelre váltson, vagy mutass rá magad (kb. 141 KB
gzippelve) a token lappal együtt:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Webkomponensek

`@pantoken/web-components` regisztrál keretfüggetlen `<instui-*>` egyéni elemeket. Beágyazzák saját
CSS-üket, de még mindig egy token lapról olvassák a tokeneket, tehát tölts be egy token alapot is.

### ES modulok (ajánlott)

Egy ESM CDN feloldja a csomag függőségeit helyetted. Ez minden elemet regisztrál:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használd a teljes token lapot (vagy a lean lapot plusz `component-icons.css`) hogy az ikonokat renderelő elemek, mint
`<instui-alert>`, feloldhassák a glifjeiket.

Ha csak néhány elemet szeretnél regisztrálni — és azok beágyazott függőségeit — importáld `register`-et és add át `only`-t:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasszikus script tag

Modulok nélküli beillesztéshez töltsd be az IIFE buildet. Ez beágyazza a függőségeit és automatikusan regisztrál minden
elemet betöltéskor, exponálva egy `PantokenWebComponents` globális objektumot:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Nagyobb, mint az ESM út — beágyazza a `@pantoken/components`-t és a `@pantoken/icons`-t — így csak akkor használd,
ha nem tudsz modulokat használni.

## Verzió rögzítése

A fenti URL-ek — és amiket a választó ír — a legfrissebb kiadást követik. Rögzíts egy major (vagy pontos)
verziót productionre — például `@pantoken/css@0` — hogy egy frissítés ne érjen váratlanul.
