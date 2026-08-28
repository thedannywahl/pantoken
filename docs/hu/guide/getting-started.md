# Első lépések

A pantoken fogja az Instructure UI dizájntokenjeit és ikonjait, egyszer feloldja őket, majd ezt az
egyetlen modellt sok platformra szabott csomagokká formálja: egyszerű stíluslapok, SCSS és Less, React,
Vue és Svelte, Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma, és még sok más.

Azt a legkisebb csomagot telepíted, amelyik illik a feladatodhoz. Mindent újraexportál az egységes
`pantoken` csomag is, így indulhatsz onnan, és később szűkítheted a kört.

## Kezdőprojekt létrehozása

A leggyorsabb módja a pantoken kipróbálásának: hozz létre egy kezdőprojektet, amelybe már telepítve és
bekötve van.

```sh
npx create-pantoken-app react
```

Platformok: `components` (egyszerű HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lásd a
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) oldalt a `--dir <path>` kapcsolóhoz és a
programozott használathoz.

AI kódolóügynököt használsz? Nem kell telepíteni semmit — irányítsd rá közvetlenül a képességre:

```sh
claude "Fetch https://pantoken.iywahl.com/create-pantoken-app.md and follow it to set up pantoken in this project."
```

Ugyanígy működik a Gemini CLI, a Cursor CLI, az OpenAI Codex CLI, a GitHub Copilot CLI és az Amazon Q
Developer CLI esetén — cseréld a `claude` értéket erre: `gemini`, `agent`, `codex`, `copilot -p` vagy `q chat`. Ha inkább
véglegesen bekötnéd a pantoken ügynökszabályait a repóba (AGENTS.md, szerkesztőszabályok, e képesség
helyi másolata), akkor a `npx @pantoken/ai init` parancsot futtasd.

## A tokenmodell

A tokenek `--instui-<group>-<name>` nevű CSS egyéni tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` értékkel ott, ahol a világos és a sötét eltér), `canvas`, és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból és az Instructure egyedi
glifáiból származnak.

## Webalkalmazás stílusozása

Telepítsd a stíluslapot, és importáld egyszer. Minden `--instui-*` tulajdonságot definiál, így közvetlenül
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

## Ikonok használata bárhol

A webkomponens minden keretrendszerben működik, átültetés nélkül.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokenek

Az ikonok CSS egyéni tulajdonságok (`--instui-icon-<name>`). Töltsd be egyszer a stíluslapot, és hivatkozz bármelyik
ikonra `mask-image` vagy `background-image` formában — nem kell ikononkénti import.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

A `@pantoken/icons` két megnevezett exportot tesz elérhetővé. A `iconsByName` használatával egyetlen ikont húzhatsz elő
anélkül, hogy végigjárnád a teljes tömböt:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

A `icons` akkor jó, ha a teljes készletre szükséged van (például választó felület építéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a teljes IR-t betölti a modul inicializálásakor — ezen a szinten nincs ikononkénti
tree-shaking. Karcsú, csak CSS-alapú betöltéshez használd a [CDN-választót](/guide/cdn-picker), és
generálj kombinált URL-t csak azokhoz az ikonokhoz, amelyekre szükséged van.

## Generálás natív platformra

A CLI tokenforrást ír a célrepóba. A futtatón kívül semmit nem kell telepíteni:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Az összes célplatformot lásd [a pantoken CLI](/guide/cli) oldalán.

## VS Code szerkesztési súgók

A `@pantoken/pantoken` mostantól VS Code custom-data fájlokat is szállít, így a felhasználó projektek osztály- és
tokenkiegészítést kapnak HTML-ben és CSS-ben anélkül, hogy pantoken-specifikus bővítményt telepítenének.

1. Telepítsd az egységes csomagot:

```sh
npm i @pantoken/pantoken
```

1. Irányítsd a VS Code-ot a szállított custom-data JSON-ra a saját munkaterületedről:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Töltsd újra a VS Code-ot (vagy futtasd a "Developer: Reload Window" parancsot) az új adatok érvényesítéséhez.

Ez bekapcsolja a javaslatokat a `instui-*` osztálytokenekhez (és a `-modifier` osztálytokenekhez), valamint a
`--instui-*` egyéni tulajdonságokhoz.

## Hogyan tovább

- [A csomagtérkép](/guide/packages) — melyik csomaghoz nyúlj, feladat szerint.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ügynökeszközök és -szabályok telepítése a felhasználó repóba.
- [Architektúra](/guide/architecture) — hogyan illeszkedik egymáshoz a tokenmodell, a mag és a kimenetek.
- [API-referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
