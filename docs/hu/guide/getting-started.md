# Első lépések

A Pantoken az Instructure UI (https://instructure.design) design tokenjeit és ikonjait veszi, egyszer feloldja őket, és azt az egy
modellt sok platformra alakítja át: egyszerű stíluslapok, SCSS és Less, React és Vue és Svelte,
Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

Telepítsd a feladatodhoz legkisebb csomagot. Minden csomag újraexportálva megtalálható az egyesített
`pantoken` csomagban, így ott kezdhetsz és később szűkíthetsz.

## Indító projekt létrehozása

A leggyorsabb módja a pantoken kipróbálásának: scaffoldd egy indító projektet, amely már telepítve és bekötve van.

```sh
npx create-pantoken-app
```

Platformok: `components` (egyszerű HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lásd
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) az `--dir <path>` és a
programozott használat miatt.

AI kódoló ügynököt használsz? Nincs szükség telepítésre — irányítsd a készségre közvetlenül:

```prompt
Szerezd be a create.pantoken.app/SKILL.md fájlt, és kövesd azt a pantoken beállításához ebben a projektben.
```

Ha inkább véglegesen be akarod kötni a pantoken ügynök szabályait a repóba (AGENTS.md, szerkesztő szabályok, a készség helyi másolata), futtasd helyette az `npx @pantoken/ai init` parancsot.

## A token modell

A tokenek CSS egyéni tulajdonságok, melyek neve `--instui-<group>-<name>`, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma szállítva: `rebrand`
(az alapértelmezett, `light-dark()`-gal ahol a világos és sötét különbözik), `canvas` és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), melyek a Lucide-ból és az Instructure egyedi
glifjeiből származnak.

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

A webkomponens bármely keretrendszerben működik, átkonvertálás nélkül.

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

Az ikonok CSS egyéni tulajdonságok (`--instui-icon-<name>`). Töltsd be egyszer a stíluslapot, és hivatkozz bármelyik
ikonra `mask-image` vagy `background-image` formájában — nincs szükség ikononkénti importálásra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

`@pantoken/icons` két névleges exportot tesz elérhetővé. Használd az `iconsByName`-t, hogy egy ikont húzz be anélkül, hogy a teljes
tömböt végigjárnád:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd az `icons`-t, amikor az egész készletre van szükséged (pl. egy választó építéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a teljes IR-t tölti be a modul inicializálásakor — ezen a szinten nincs ikononkénti tree-shaking. Karcsú, csak CSS betöltéshez használd a [CDN pickert](/guide/cdn-picker), hogy csak a szükséges ikonokhoz generálj kombinált URL-t.

## Generálás natív platformra

A CLI token forrást ír a céltárba. Nincs szükség telepítésre a futtatón kívül:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd a [pantoken CLI-t](/guide/cli) minden cél eléréséhez.

## VS Code szerkesztési tippek

`@pantoken/pantoken` most VS Code custom-data fájlokat szállít, így a fogyasztó projektek osztály- és
tokenkitöltést kaphatnak HTML/CSS-ben anélkül, hogy pantoken-specifikus kiterjesztést telepítenének.

1. Telepítsd az egyesített csomagot:

```sh
npm i @pantoken/pantoken
```

1. Irányítsd a VS Code-ot a szállított custom-data JSON fájlra a fogyasztói munkaterületedből:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Töltsd újra a VS Code-ot (vagy futtasd a "Developer: Reload Window" parancsot) az új adatok alkalmazásához.

Ez javaslatokat engedélyez `instui-*` osztály tokenekhez (és `-modifier` osztály tokenekhez) valamint
`--instui-*` egyéni tulajdonságokhoz.

## Mi a következő lépés

- [A csomagtérkép](/guide/packages) — melyik csomagot melyik feladathoz érdemes választani.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — telepítsd az ügynök eszközöket és szabályokat a fogyasztói repóba.
- [Architektúra](/guide/architecture) — hogyan illeszkedik össze a tokenmodell, a core és a kimenetek rendszere.
- [API referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
