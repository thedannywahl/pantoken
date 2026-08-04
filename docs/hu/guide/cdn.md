# CDN és terjesztés

A pantoken minden csomagot közzétesz az npm-en, így a tokeneket, komponenseket és webkomponenseket közvetlenül
egy CDN-ről kérheted le — build lépés és bundler nélkül. Ez az oldal a CSS combine URL-t mutatja be (egy interaktív
építővel együtt), valamint a webkomponens-beépülőket.

## A tokenalap

Minden pantoken komponens `--instui-*` egyedi tulajdonságokat (custom properties) olvas be az oldalon található tokenlapról. Két
változat érhető el:

- `@pantoken/css/dist/style.lean.css` — az ajánlott CDN-alap. A teljes ikonkészlet kivételével minden tokent
  tartalmaz, így gzippelve körülbelül 23 KB.
- `@pantoken/css/dist/style.css` — a teljes lap, beleértve mind a ~1 777 ikon glif tokent
  (`--instui-icon-*`). Gzippelve körülbelül 140 KB. Akkor töltsd be ezt, ha széles körben hivatkozol ikonokra a következőkön keresztül:
  `var(--instui-icon-*)`.

A kiemelési skála (elevation scale) és a fókuszgyűrű változói mindkét lapban megtalálhatók, így az árnyékok és a fókuszgyűrű csak az alap betöltésével is működnek.

## Válaszd ki a komponenseket és ikonokat

Az [interaktív CDN-választó](/guide/cdn-picker) jsDelivr combine URL-eket épít mind a komponensekhez, mind az ikonokhoz. Nyisd meg, jelöld be, amire szükséged van, és másold ki a generált `<link>` vagy `@import` taget.

- **Components fül** — válassz egyedi komponens-stíluslapokat vagy a teljes `components.css` barrel-t. Add hozzá az alapértelmezett reset-et vagy a spacing/color segédosztályokat, ha szükséged van rájuk.
- **Icons fül** — válassz egyedi ikonokat az InstUI készletből (~1 800 ikon) vagy a Simple Icons készletből (~3 300 márka-glif). A választó egy külön combine URL-t generál az ikon CSS-fájlokhoz, így csak azokat az ikonokat töltheted be, amelyeket valóban használsz.

Minden komponensfájl kicsi — a legtöbb 2 KB körül van. Az ikonokat megjelenítő komponenseknek (`alert`, `checkbox`,
és néhány másnak) szükségük van ezekre a glifekre, ezért az építő hozzáadja a `@pantoken/components/dist/component-icons.css` fájlt (körülbelül
0,5 KB gzippelve — a komponenskészlet által használt 11 ikont), amikor a karcsúsított lapot választod. A teljes lap
már tartalmazza őket.

### Betöltési sorrend és betűtípusok

Először a tokenalapot töltsd be, majd az opcionális alap reset-et, ezt követően a komponensfájlokat, és a segédosztályokat
utoljára — ezek felülbíráló segédosztályok, így csak akkor bírálják felül egy komponens saját szabályát, ha a kaszkádban
mögötte helyezkednek el. A fenti combine URL már sorba rendezi őket helyetted. A betűtípusok képezik az egyetlen kivételt:
a `@pantoken/components/dist/fonts.css` relatív útvonallal mutat a betűtípusfájlokra, így a combine nem tudja átírni
őket — töltsd be külön `<link>` tagként:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Minden egyszerre

Jelöld be az **All components** lehetőséget a választóban a barrel-re való váltáshoz, vagy hivatkozz rá te magad (körülbelül 141 KB
gzippelve) a tokenlap mellett:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Webkomponensek

A `@pantoken/web-components` keretrendszer-független `<instui-*>` egyedi elemeket regisztrál. Beágyazzák a saját
CSS-üket, de a tokeneket továbbra is az oldalon található lapból olvassák be, ezért töltsd bet a tokenalapot is.

### ES modulok (ajánlott)

Egy ESM CDN feloldja a csomag függőségeit helyetted. Ez minden elemet regisztrál:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használd a teljes tokenlapot (vagy a karcsúsított lapot a `component-icons.css` fájllal kiegészítve), hogy az ikonokat megjelenítő elemek, mint például a
`<instui-alert>`, fel tudják oldani a glifjeiket.

Csak bizonyos elemek — és azok beágyazott függőségei — regisztrálásához importáld a `register` elemet, és add át a következőt: `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasszikus script tag

Klasszikus, modulok nélküli beépítéshez töltsd be az IIFE buildet. Ez becsomagolja a függőségeit, és betöltéskor automatikusan regisztrál minden
elemet, elérhetővé téve egy `PantokenWebComponents` globális objektumot:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ez nagyobb, mint az ESM útvonal — beágyazza a `@pantoken/components` és `@pantoken/icons` elemeket —, ezért csak akkor használd,
ha nem tudsz modulokat használni.

## Verziók rögzítése

A fenti URL-ek — és amelyeket a választó generál — a legfrissebb kiadást követik. Rögzíts egy fő- (vagy pontos)
verziót a produkciós környezetben — például: `@pantoken/css@0` —, hogy egy frissítés soha ne érjen meglepetésként.
