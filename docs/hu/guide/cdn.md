# CDN és disztribúció

A pantoken minden csomagot közzétesz az npm-en, így tokeneket, komponenseket és webes komponenseket közvetlenül egy CDN-ből lehet letölteni – nincs build lépés, nincs bundler. Ez az oldal a CSS combine URL-t (interaktív szerkesztővel) és a webes komponens drop-in-eket ismerteti.

## A token alapja

Minden pantoken komponens a `--instui-*` egyéni tulajdonságokat olvassa az oldalon lévő token lapról. Két verzió érhető el:

- `@pantoken/css/style.lean.css` — az ajánlott CDN alapja. Minden tokent tartalmaz, kivéve a teljes ikon készletet, így körülbelül 23 KB tömörített.
- `@pantoken/css/style.css` — a teljes lap, az összes ~1 777 ikon karakterjel token-nel (`--instui-icon-*`). Körülbelül 140 KB tömörített. Töltsd be ezt, ha széles körben hivatkozol ikonokra a `var(--instui-icon-*)` segítségével.

Az elevation skála és a focus-ring változók mindkét lapban szerepelnek, így az árnyékok és a focus gyűrű csak az alapja betöltésével működnek.

## Válaszd ki a komponenseid

A jsDelivr's combine végpont lehúzza a token alapot, valamint csak az Ön szükséges komponens stíluslapokat egyetlen kérésben. Jelöld be a kívánt komponenseket, és az előállító írja az URL-t:

<CdnPicker />

Minden komponens fájl kicsi — legtöbbek körülbelül 2 KB. Az ikonokat megjelenítő komponens (`alert`, `checkbox` és néhány másik) szüksége van ezekre a karakterjegyekre, így az előállító hozzáadja a `@pantoken/components/component-icons.css`-t (körülbelül 0,5 KB tömörített – a komponens készlet által használt 11 ikon), amikor a lean lapot választod. A teljes lap már tartalmazza őket.

### Betöltési sorrend és betűtípusok

Töltsd be először a token alapot, majd az opcionális alapjáró visszaállítást, majd a komponens fájlokat. A fenti combine URL már rendez ezeket az Ön számára. A betűtípusok az egyik kivétel: a `@pantoken/components/fonts.css` relatív útvonalon keresztül mutat a betűfájlokra, így a combine nem írhatja át – töltsd be saját `<link>`-ként:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/fonts.css" />
```

### Mindent egyszerre

A teljes komponens könyvtár lehúzásához ahelyett, hogy egyenként válogatnál, mutass az elvegetálható (körülbelül 141 KB tömörített) mellett a token lappal:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/style.css,npm/@pantoken/components/components.css"
/>
```

## Webes komponensek

A `@pantoken/web-components` framework-agnosztikus `<instui-*>` egyéni elemeket regisztrál. Beépítik a saját CSS-t, de az oldalon lévő lapokból is olvassák a tokeneket, ezért töltsd be a token alapot is.

### ES modulok (ajánlott)

Az ESM CDN feloldja a csomag függőségeit az Ön számára. Ez regisztrálja az összes elemet:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használd a teljes token lapot (vagy a lean lapot plusz `component-icons.css`), hogy az ikonmegjelenítési elemek, mint a `<instui-alert>` feloldják a karakterjeleiket.

Ha csak néhány elemet szeretnél regisztrálni – és azok beágyazott függőségeit – importáld a `register`-t és add át a `only`-öt:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Egy klasszikus script tag

Egy modulos nélküli drop-in-hez töltsd be az IIFE buildét. Becsomagolja függőségeit és automatikusan regisztrálja az összes elemet betöltéskor, kitéve egy `PantokenWebComponents` globális:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ez nagyobb, mint az ESM útvonal — beágyazza a `@pantoken/components`-t és `@pantoken/icons`-t — ezért csak akkor érj rá, ha nem tudod használni a modulokat.

## Verziók rögzítése

A fenti URL-ek lebegnek a legújabb kiadásra. Rögzíts egy fő (vagy pontos) verziót az éles verzióhoz — például `@pantoken/css@0` — így egy frissítés soha nem lepd meg. A kiválasztó az aktuálisan közzétett verziót rögzíti az Ön számára.

## Mi nincs itt

Nincs `?components=button,badge` lekérdezési paraméter: egyetlen nyilvános CDN sem állít össze egy csomagot a lekérdezési paraméterekből. A combine URL a legközelebbi ekvivalens, és a kiválasztó írja az URL-t az Ön számára.
