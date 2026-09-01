# Első lépések

A pantoken átalakítja az Instructure UI design tokenjeit és ikonait: egyszer feloldja őket, majd azt az egy modellt több platformra bontja — egyszerű stíluslapok, SCSS és Less, React és Vue és Svelte, Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még több célpont számára.

Telepítsd azt a legkisebb csomagot, amely megfelel a feladatodnak. Minden emellett újra-exportálva van az egységes `pantoken` csomagon keresztül, így ott kezdhetsz, és később szűkíthetsz.

## Kezdő projekt létrehozása

A leggyorsabb mód a pantoken kipróbálására: scaffoldd egy kezdő projektet, amely már telepítve és bekötve van.

```sh
npx create-pantoken-app react
```

Platformok: `components` (egyszerű HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lásd a [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) csomagot `--dir <path>` és programozott használat esetén.

Használni szeretnél egy AI kódoló ügynököt? Nincs szükség telepítésre — mutasd meg neki közvetlenül a skillt:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Ugyanez működik a Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI és Amazon Q Developer CLI esetén is — cseréld le `claude`-t `gemini`-re, `agent`-re, `codex`-re, `copilot -p`-ra vagy `q chat`-re. Ha inkább véglegesen be akarod kötni a pantoken ügynök-szabályait a tárba (AGENTS.md, editor szabályok, a skill helyi másolata), futtasd helyette a `npx @pantoken/ai init`-t.

## A token modell

A tokenek CSS egyéni tulajdonságok névvel (`--instui-<group>-<name>`), például `--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma jár együtt: `rebrand` (alapértelmezett, ahol a világos és sötét különbözik: `light-dark()`), `canvas` és `canvasHighContrast`. Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból és az Instructure egyedi glyfjából származnak.

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

Az ikonok CSS egyéni tulajdonságok (`--instui-icon-<name>`). Töltsd be egyszer a stíluslapot, és hivatkozz bármely ikonra `mask-image` vagy `background-image` formában — nincs szükség ikononkénti importálásra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egy ikon vs. az egész készlet

`@pantoken/icons` két névvel exportált elemet tesz elérhetővé. Használd a `iconsByName`-t, hogy egyetlen ikont húzz be a teljes tömb bejárása nélkül:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd a `icons`-et, amikor az egész készletre van szükséged (például egy kiválasztó felépítéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a teljes IR-t betölti modul inicializációkor — ezen a szinten nincs ikononkénti tree-shaking. Karcsú, csak CSS betöltéshez használd a [CDN pickert](/guide/cdn-picker), hogy csak a szükséges ikonokhoz generálj összevont URL-t.

## Generálás natív platformra

A CLI token forrást ír egy célrepo-ba. A futtatón kívül nincs szükség telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd a [pantoken CLI-t](/guide/cli) minden célpontért.

## VS Code szerkesztési tippek

A `@pantoken/pantoken` most VS Code custom-data fájlokat szállít, így a fogyasztói projektek osztály- és token-kiegészítést kaphatnak HTML/CSS-ben anélkül, hogy pantoken-specifikus kiegészítőt telepítenének.

1. Telepítsd az egységes csomagot:

```sh
npm i @pantoken/pantoken
```

1. Mutasd meg a VS Code-nak a szállított custom-data JSON-t a fogyasztói munkaterületedből:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Indítsd újra a VS Code-ot (vagy futtasd a "Developer: Reload Window" parancsot) a új adatok alkalmazásához.

Ez engedélyezi a `instui-*` osztály-tokenek (és `-modifier` osztály-tokenek) valamint a `--instui-*` egyéni tulajdonságok javaslatait.

## Hová tovább

- [A csomagtérkép](/guide/packages) — melyik csomagot érdemes kézbe venni feladattól függően.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — telepítsd az ügynök-erőforrásokat és szabályokat egy fogyasztói repo-ba.
- [Architektúra](/guide/architecture) — hogyan illeszkedik a token modell, a core és a kimenetek rendszere.
- [API referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
