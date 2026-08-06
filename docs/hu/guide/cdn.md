# CDN & terjesztés

A pantoken minden csomagot közzétesz az npm-en, így a tokeneket, komponenseket és webkomponenseket közvetlenül
egy CDN-ről érheti el — építési lépés és bundler nélkül. Ez az oldal bemutatja a CSS combine URL-t (egy interaktív
építővel), valamint a webkomponens beépülőket.

## A tokenalap

Minden pantoken komponens `--instui-*` egyedi tulajdonságokat olvas be az oldalon lévő tokenlapból. Két
változat érhető el:

- `@pantoken/css/dist/style.lean.css` — az ajánlott CDN alap. A teljes ikonkészlet kivételével minden
  tokent tartalmaz, így gzippelve körülbelül 23 KB.
- `@pantoken/css/dist/style.css` — a teljes lap, beleértve mind a ~1 777 ikon glif tokent
  (`--instui-icon-*`). Gzippelve körülbelül 140 KB. Akkor töltse be ezt, ha széles körben hivatkozik ikonokra a
  `var(--instui-icon-*)` segítségével.

Az emelési skála (elevation scale) és a fókuszgyűrű (focus-ring) változói mindkét lapban megtalálhatók, így az árnyékok és a fókuszgyűrű már
csak az alap betöltésével is működnek.

## Válassza ki a komponenseket és az ikonokat

Az [interaktív CDN-választó](/guide/cdn-picker) jsDelivr combine URL-eket épít a CSS-hez és kódrészleteket a JavaScript csomagokhoz. Nyissa meg, jelölje be, mire van szüksége, és másolja ki a generált kimenetet.

- **Components fül** — választhat egyedi komponens stíluslapokat vagy a teljes `components.css` barrel-t. Szükség esetén hozzáadhatja az alapértelmezett reset-et vagy a térköz/szín segédosztályokat (utilities).
- **JS fül** — másolja ki az ESM import kódrészletet a `@pantoken/interactions` csomaghoz.
- **Icons fül** — válasszon egyedi ikonokat az InstUI készletből (~1 800 ikon) vagy a Simple Icons készletből (~3 300 márkaglif). A választó külön combine URL-t ad ki az ikonok CSS-fájljaihoz, így csak azokat az ikonokat töltheti be, amelyeket valóban használ.
- **Web Components fül** — hozzon létre `@pantoken/web-components` kódrészleteket (ESM szelektív regisztráció vagy klasszikus szkript bootstrap).

Minden komponensfájl kicsi — a legtöbb körülbelül 2 KB. Az ikonokat megjelenítő komponenseknek (`alert`, `checkbox`,
és néhány egyéb) szükségük van ezekre a glifekre, ezért az építő hozzáadja a `@pantoken/components/dist/component-icons.css` fájlt (körülbelül
0,5 KB gzippelve — a komponenskészlet által használt 11 ikont), amikor a karcsúsított (lean) lapot választja. A teljes lap
már tartalmazza ezeket.

### Betöltési sorrend és betűtípusok

Először a tokenalapot töltse be, majd az opcionális alap reset-et, ezt követően a komponensfájlokat, és a segédosztályokat
(utilities) utoljára — ezek felülbíráló segédosztályok, így csak akkor bírálják felül egy komponens saját szabályát, ha
a kaszkádban utána következnek. A fenti combine URL már sorba rendezi ezeket Ön helyett. A betűtípusok képezik az egyetlen kivételt:
a `@pantoken/components/dist/fonts.css` relatív útvonallal mutat a betűtípusfájlokra, így a combine nem tudja azokat
átírni — töltse be önálló `<link>` elemként:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Minden egyszerre

Jelölje be az **All components** lehetőséget a választóban a barrel-re való váltáshoz, vagy hivatkozzon rá közvetlenül (körülbelül 141 KB
gzippelve) a tokenlap mellett:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Webkomponensek

A `@pantoken/web-components` keretrendszer-független `<instui-*>` egyedi elemeket regisztrál. Ezek beágyazzák a saját
CSS-üket, de a tokeneket továbbra is az oldalon lévő lapból olvassák be, így töltsön be egy tokenalapot is.

### ES modulok (ajánlott)

Egy ESM CDN feloldja a csomag függőségeit Ön helyett. Ez minden elemet regisztrál:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használja a teljes tokenlapot (vagy a karcsúsított lapot és a `component-icons.css` fájlt), hogy az ikonokat megjelenítő elemek, mint a
`<instui-alert>`, fel tudják oldani a glifjeiket.

Ha csak bizonyos elemeket — és azok beágyazott függőségeit — szeretné regisztrálni, importálja a `register` modult, és adja át a `only` paramétert:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasszikus script címke

Ha modulok nélküli beépülőre van szüksége, töltse be az IIFE buildet. Ez becsomagolja a függőségeit, és betöltéskor automatikusan regisztrál minden
elemet, elérhetővé téve egy `PantokenWebComponents` globális változót:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ez nagyobb, mint az ESM útvonal — beágyazza a `@pantoken/components` és `@pantoken/icons` elemeket —, ezért csak akkor
használja, ha nem tud modulokat használni.

## Verziók rögzítése

A fenti URL-ek — és a választó által generáltak — a legfrissebb kiadást követik. Éles környezetben rögzítsen egy főverziót (vagy pontos
verziót) — például `@pantoken/css@0` —, hogy egy frissítés ne okozzon meglepetést.
