# Első lépések

A pantoken felveszi az Instructure UI design tokenjeit és ikonjait, egyszer feloldja őket, és ezt az egyetlen
modellt átformálja csomagokká számos platform számára: egyszerű stíluslapok, SCSS és Less, React és Vue és Svelte,
Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

A feladathoz legjobban illő legkisebb csomagot telepíted. Mindent újra exportál az egységesített
`pantoken` csomag is, így kezdhetsz ott is, és később szűkítheted a kört.

## A tokenmodell

A tokenek `--instui-<group>-<name>` néven futó egyéni CSS-tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` értékkel, ahol a világos és a sötét eltér), `canvas` és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból, valamint az Instructure egyedi
glifáiból származnak.

## Webes alkalmazás stílusozása

Telepítsd a stíluslapot, és importáld egyszer. Az összes `--instui-*` tulajdonságot definiálja, így közvetlenül
a saját CSS-edből hivatkozhatsz rájuk.

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

## Használj ikonokat bárhol

A webkomponens bármely keretrendszerben működik, portolás nélkül.

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

Az ikonok egyéni CSS-tulajdonságok (`--instui-icon-<name>`). Töltsd be a stíluslapot egyszer, és hivatkozz bármelyik
ikonra `mask-image`-ként vagy `background-image`-ként — nem szükséges ikononkénti importálás.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

A(z) `@pantoken/icons` két nevesített exportot tesz elérhetővé. Használd a(z) `iconsByName`-öt egyetlen ikon beemeléséhez anélkül, hogy a teljes tömbön végighaladnál:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd a(z) `icons`-ot, amikor a teljes készletre szükséged van (pl. egy választó építéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export betölti a teljes IR-t a modul inicializálásakor — ezen a szinten nincs ikononkénti tree-shaking. A karcsú, csak CSS-alapú betöltéshez használd a [CDN választót](/guide/cdn-picker), hogy generálj egy összevont URL-t csak a szükséges ikonokhoz.

## Generálás natív platformra

A CLI beírja a token forrását a célrepozitóriumba. A futtatóprogramon kívül nincs szükség más telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd [a pantoken CLI-t](/guide/cli) az összes célplatformért.

## Merre tovább

- [A csomagtérkép](/guide/packages) — melyik csomaghoz nyúlj a feladattól függően.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — agent assetek és szabályok telepítése a felhasználói repozitóriumban.
- [Architektúra](/guide/architecture) — hogyan kapcsolódik össze a tokenmodell, a mag (core) és a kimenetek.
- [API referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
