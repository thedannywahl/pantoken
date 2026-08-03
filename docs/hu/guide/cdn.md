# CDN és terjesztés

A pantoken minden csomagot közzétesz az npm-en, így a tokeneket, komponenseket és webkomponenseket közvetlenül
egy CDN-ről érheti el — build lépés és bundler nélkül. Ez az oldal a CSS combine URL-t (egy interaktív
készítővel együtt), valamint a beilleszthető webkomponenseket ismerteti.

## A token alaprendszer

Minden pantoken komponens `--instui-*` egyedi tulajdonságokat olvas be az oldalon található token lapról. Két
változat érhető el:

- `@pantoken/css/dist/style.lean.css` — az ajánlott CDN alaprendszer. A teljes ikonkészlet kivételével minden tokent
  tartalmaz, így gzippelve körülbelül 23 KB.
- `@pantoken/css/dist/style.css` — a teljes lap, beleértve mind a ~1 777 ikon glifa tokent
  (`--instui-icon-*`). Gzippelve körülbelül 140 KB. Töltse be ezt, ha széles körben hivatkozik ikonokra a
  `var(--instui-icon-*)` használatával.

A kiemelési skála és a fókuszgyűrű változói mindkét lapban megtalálhatók, így az árnyékok és a fókuszgyűrű működnek
kizárólag az alaprendszer betöltésével is.

## Válassza ki a komponenseket és az ikonokat

Az [interaktív CDN választó](/guide/cdn-picker) jsDelivr combine URL-eket épít a komponensekhez és az ikonokhoz egyaránt. Nyissa meg, jelölje be, amire szüksége van, és másolja ki a generált `<link>` vagy `@import` taget.

- **Components fül** — válassza ki az egyes komponensek stíluslapjait vagy a teljes `components.css` barrel-t. Adja hozzá az alapértelmezett resetet vagy a térköz-/színsegédosztályokat, ha szüksége van rájuk.
- **Icons fül** — válassza ki az egyes ikonokat az InstUI készletből (~1 800 ikon) vagy a Simple Icons készletből (~3 300 márka glifa). A választó egy külön combine URL-t ad ki az ikon CSS-fájlokhoz, így csak azokat az ikonokat töltheti be, amelyeket valóban használ.

Minden komponensfájl kicsi — a legtöbb 2 KB körül van. Az ikonokat megjelenítő komponenseknek (`alert`, `checkbox`,
és még néhány másnak) szükségük van ezekre a glifákra, így az építő hozzáadja a következőt: `@pantoken/components/dist/component-icons.css` (körülbelül
0,5 KB gzippelve — az a 11 ikon, amelyet a komponenskészlet használ), amikor a karcsúsított lapot választja. A teljes lap
már tartalmazza őket.

### Betöltési sorrend és betűtípusok

Először a token alaprendszert töltse be, majd az opcionális alap resetet, végül a komponensfájlokat. A fenti
combine URL már a megfelelő sorrendbe állítja őket. A betűtípusok jelentik az egyetlen kivételt: a `@pantoken/components/dist/fonts.css` relatív
útvonallal hivatkozik a betűtípusfájlokra, így a combine nem tudja átírni őket — töltse be külön `<link>` tagként:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Minden egyszerre

Jelölje be az **All components** opciót a választóban, hogy a barrel-re váltson, vagy hivatkozzon rá közvetlenül (körülbelül 141 KB
gzippelve) a token lap mellett:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Webkomponensek

A `@pantoken/web-components` keretrendszer-független `<instui-*>` egyedi elemeket regisztrál. Ezek beágyazzák a saját
CSS-üket, de továbbra is beolvassák a tokeneket az oldalon található lapról, ezért töltsön be egy token alaprendszert is.

### ES modulok (ajánlott)

Egy ESM CDN feloldja a csomag függőségeit Ön helyett. Ez minden elemet regisztrál:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használja a teljes token lapot (vagy a karcsúsított lapot a `component-icons.css` hozzáadásával), hogy az ikonokat megjelenítő elemek, mint például a
`<instui-alert>`, fel tudják oldani a glifáikat.

Csak bizonyos elemek — és azok beágyazott függőségei — regisztrálásához importálja a következőt: `register`, és adja át a következőt: `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Hagyományos script tag

A modulok nélküli beillesztéshez töltse be az IIFE buildet. Ez csomagolja a függőségeit, és betöltéskor automatikusan regisztrál minden
elemet, elérhetővé téve egy `PantokenWebComponents` globális változót:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ez nagyobb, mint az ESM útvonal — beágyazza a következőt: `@pantoken/components` és `@pantoken/icons` —, így csak akkor
használja, ha nem tud modulokat használni.

## Verziók rögzítése

A fenti URL-ek — és amelyeket a választó generál — a legfrissebb kiadást követik. Rögzítsen egy főverziót (vagy pontos verziót)
a termelési (production) környezethez — például `@pantoken/css@0` —, hogy a frissítések ne okozzanak meglepetést.

## Mi az, ami nem található itt

Nincs `?components=button,badge` lekérdezési paraméter (query parameter): egyetlen nyilvános CDN sem állít össze csomagot lekérdezési paraméterekből.
A combine URL a legközelebbi megfelelője, és a választó megírja ezt Ön helyett.
