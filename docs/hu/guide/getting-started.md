# Első lépések

A pantoken átveszi az Instructure UI designtokenjeit és ikonjait, egyszer feloldja őket, majd átalakítja azt az egyetlen
modellt csomagokká számos platform számára: egyszerű stíluslapok, SCSS és Less, React és Vue és Svelte,
Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

A feladathoz illeszkedő legkisebb csomagot telepíti. Mindent újra exportál az egységesített
`pantoken` csomag is, így elkezdheti ott, és később szűkítheti a kört.

## A tokenmodell

A tokenek `--instui-<group>-<name>` nevű egyéni CSS-tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` opcióval, ahol a világos és a sötét eltér), `canvas` és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból és az Instructure egyedi
glifáiból származnak.

## Webalkalmazás stílusozása

Telepítse a stíluslapot, és importálja egyszer. Ez definiál minden `--instui-*` tulajdonságot, így közvetlenül
a saját CSS-éből hivatkozhat rájuk.

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

## Használjon ikonokat bárhol

A webes komponens bármilyen keretrendszerben működik, portolás nélkül.

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

Az ikonok egyéni CSS-tulajdonságok (`--instui-icon-<name>`). Töltse be a stíluslapot egyszer, és hivatkozzon bármelyik
ikonra mint `mask-image` vagy `background-image` — nincs szükség ikononkénti importálásra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

A(z) `@pantoken/icons` két nevesített exportot tesz elérhetővé. Használja a(z) `iconsByName` exportot egyetlen ikon beemeléséhez anélkül, hogy végigmenne a teljes tömbön:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használja a(z) `icons` exportot, ha a teljes készletre szüksége van (pl. egy választó megépítéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a teljes IR-t betölti a modul inicializálásakor — ezen a szinten nincs ikononkénti
tree-shaking. A karcsú, csak CSS-alapú betöltéshez használja a [CDN-választót](/guide/cdn-picker), hogy létrehozzon egy combine URL-t
csak a szükséges ikonokhoz.

## Generálás natív platformra

A CLI beírja a tokenforrást egy célrepozitóriumba. A futtatókon kívül nincs szükség telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd [a pantoken CLI-t](/guide/cli) minden célplatform esetén.

## Merre tovább?

- [A csomagtérkép](/guide/packages) — melyik csomaghoz nyúljon, feladattól függően.
- [Architektúra](/guide/architecture) — hogyan illeszkedik egymáshoz a tokenmodell, a mag és a kimenetek.
- [API-referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
