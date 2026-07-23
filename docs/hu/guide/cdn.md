# CDN és terjesztés

A pantoken minden csomagot közzétesz az npm-en, így a tokeneket, komponenseket és web-komponenseket
közvetlenül egy CDN-ről is behúzhatod — build lépés és bundler nélkül. Ez az oldal a CSS combine URL-t
(interaktív építővel) és a web-komponens beillesztéseket mutatja be.

## A token alap

Minden pantoken komponens `--instui-*` egyedi tulajdonságokat olvas be egy token lapból az oldalon. Két
változat érhető el:

- `@pantoken/css/style.lean.css` — az ajánlott CDN alap. Minden tokent tartalmaz a teljes ikonkészlet
  kivételével, így körülbelül 23 KB gzip-elve.
- `@pantoken/css/style.css` — a teljes lap, benne mind a ~1777 ikon glyph tokennel
  (`--instui-icon-*`). Körülbelül 140 KB gzip-elve. Ezt töltsd be, ha széles körben hivatkozol ikonokra a
  `var(--instui-icon-*)` segítségével.

Az elevation skála és a fókuszgyűrű változói mindkét lapban benne vannak, így az árnyékok és a
fókuszgyűrű már önmagában az alappal is működnek.

## Válaszd ki a komponenseket

A jsDelivr combine végpontja egyetlen kérésben húzza be a token alapot és csak a szükséges komponens
stíluslapokat. Jelöld be a kívánt komponenseket, és az építő megírja az URL-t:

<CdnPicker />

Minden komponensfájl kicsi — a legtöbb körülbelül 2 KB. Az ikonokat megjelenítő komponensek (`alert`,
`checkbox` és néhány másik) igénylik ezeket a glyph-eket, ezért az építő hozzáadja a
`@pantoken/components/component-icons.css` fájlt (körülbelül 0,5 KB gzip-elve — a komponenskészlet által
használt 11 ikon), amikor a karcsú lapot választod. A teljes lap már tartalmazza őket.

### Betöltési sorrend és betűtípusok

Először a token alapot töltsd be, majd az opcionális alap resetet, végül a komponensfájlokat. A fenti
combine URL már ilyen sorrendben rakja őket. A betűtípusok az egyetlen kivétel: a
`@pantoken/components/fonts.css` relatív útvonalon hivatkozik a betűfájlokra, így a combine nem tudja
átírni őket — töltsd be saját `<link>` elemként:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/fonts.css" />
```

### Minden egyszerre

Ha a teljes komponenskönyvtárat szeretnéd behúzni válogatás helyett, mutass a gyűjtőlapra (körülbelül
141 KB gzip-elve) a token lap mellett:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/style.css,npm/@pantoken/components/components.css"
/>
```

## Web-komponensek

A `@pantoken/web-components` keretrendszer-független `<instui-*>` egyedi elemeket regisztrál. Saját
CSS-üket beágyazzák, de a tokeneket továbbra is az oldalon lévő lapból olvassák, ezért egy token alapot is
tölts be.

### ES modulok (ajánlott)

Egy ESM CDN feloldja helyetted a csomag függőségeit. Ez minden elemet regisztrál:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használd a teljes token lapot (vagy a karcsú lapot a `component-icons.css`-szel), hogy az ikonokat
megjelenítő elemek, például az `<instui-alert>`, feloldják a glyph-jeiket.

Ha csak néhány elemet szeretnél regisztrálni — a beágyazott függőségeikkel együtt —, importáld a
`register` függvényt, és add meg az `only` opciót:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // A date-input és a calendar automatikusan bekerül.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasszikus script tag

Modulok nélküli beillesztéshez töltsd be az IIFE buildet. Ez beágyazza a függőségeit, betöltéskor minden
elemet automatikusan regisztrál, és egy `PantokenWebComponents` globális objektumot tesz elérhetővé:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Nagyobb, mint az ESM út — beágyazza a `@pantoken/components` és a `@pantoken/icons` csomagokat —, ezért
csak akkor nyúlj hozzá, ha nem tudsz modulokat használni.

## Verziók rögzítése

A fenti URL-ek a legfrissebb kiadásra mutatnak. Éles környezetben rögzíts egy fő (vagy pontos) verziót —
például `@pantoken/css@0` —, hogy egy frissítés soha ne érjen váratlanul. Az építő helyetted rögzíti az
aktuálisan közzétett verziót.

## Ami nincs itt

Nincs `?components=button,badge` lekérdezési paraméter: egyetlen nyilvános CDN sem állít össze bundle-t
lekérdezési paraméterekből. A combine URL a legközelebbi megfelelő, és az építő megírja helyetted.
