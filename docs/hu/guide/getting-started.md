# Első lépések

A Pantoken az [Instructure UI](https://instructure.design) design tokenjeit és ikonait veszi, egyszer feloldja őket, és azt az egy modellt több platformra alakítja át: egyszerű stíluslapok, SCSS és Less, React és Vue és Svelte, Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

Telepítsd a feladathoz legkisebb csomagot. Minden egyben újraexportálva elérhető az egységes `pantoken` csomagon keresztül, így ott is kezdhetsz, és később szűkíthetsz.

## Indító projekt létrehozása

A leggyorsabb mód a pantoken kipróbálására: állíts elő egy indító projektet, amely már telepítve és bekötve tartalmazza.

```sh
npx create-pantoken-app
```

Platformok: `components` (egyszerű HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lásd a [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) csomagot `--dir <path>` és programozott használat esetén.

Használsz AI kódoló ügynököt? Nincs szükség telepítésre — irányítsd közvetlenül a skillre:

```prompt
Szerezd be a create.pantoken.app/SKILL.md fájlt, és kövesd annak útmutatóját a pantoken beállításához ebben a projektben.
```

Ha inkább véglegesen bekötnéd a pantoken ügynök-szabályait a repóba (AGENTS.md, szerkesztő szabályok, a skill helyi másolata), futtasd a `npx @pantoken/ai init` parancsot helyette.

## A token modell

A tokenek CSS egyéni tulajdonságok, melyek nevei `--instui-<group>-<name>`, például `--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma van: `rebrand` (az alapértelmezett, ahol a világos és sötét különbözik `light-dark()`), `canvas` és `canvasHighContrast`. Az ikonok `<image>` tokenek (`--instui-icon-<name>`), melyeket a Lucide és az Instructure egyedi glifjei alapján származtatunk.

## Webalkalmazás stílusozása

Telepítsd a stíluslapot és importáld egyszer. Meghatároz minden `--instui-*` tulajdonságot, így közvetlenül a saját CSS-edből hivatkozhatsz rájuk.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Ikonok használata bárhol

A webkomponens bármelyik keretrendszerben működik, portolás nélkül.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tokenek

Az ikonok CSS egyéni tulajdonságok (`--instui-icon-<name>`). Töltsd be a stíluslapot egyszer, és hivatkozz bármelyik ikonra `mask-image` vagy `background-image` formában — nincs szükség ikononkénti importálásra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egy ikon vs. teljes készlet

`@pantoken/icons` két név szerinti exportot tesz elérhetővé. Használd a `iconsByName`-t, hogy egy ikont húzz be anélkül, hogy az egész tömböt végignéznéd:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd a `icons`-t, amikor a teljes készletre van szükséged (pl. egy kiválasztó építéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a teljes IR-t tölti be modul inicializációkor — ezen a szinten nincs ikononkénti tree-shaking. A karcsú, csak-CSS betöltéshez használd a [CDN kiválasztót](/guide/cdn-picker), amely kombinált URL-t generál csak a szükséges ikonokhoz.

## Generálás natív platformra

A CLI token forrást ír egy cél repóba. A futtatón kívül nincs szükség telepítésre:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd a [pantoken CLI-t](/guide/cli) minden cél eléréséhez.

## VS Code szerkesztési tippek

`@pantoken/pantoken` most VS Code custom-data fájlokat szállít, így a downstream projektek osztály- és token-kiegészítést kaphatnak HTML/CSS-ben anélkül, hogy pantoken-specifikus kiterjesztést telepítenének.

1. Telepítsd az egységes csomagot:

```sh
npm i @pantoken/pantoken
```

1. Irányítsd a VS Code-ot a szállított custom-data JSON fájlra a fogyasztó munkaterületedből:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Töltsd újra a VS Code-ot (vagy futtasd a "Developer: Reload Window" parancsot), hogy alkalmazd az új adatokat.

Ez engedélyezi a javaslatokat `instui-*` osztály-tokenekhez (és `-modifier` osztály-tokenekhez), valamint `--instui-*` egyéni tulajdonságokhoz.

## Hová tovább

- [A csomagtérkép](/api/) — melyik csomag mely feladathoz ajánlott.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — telepítsd az ügynök erőforrásait és szabályait egy fogyasztói repóba.
- [Architektúra](/guide/architecture) — hogyan illeszkedik össze a token modell, a core és a kimenetek rendszere.
- [API referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
