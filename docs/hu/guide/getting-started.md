# Első lépések

A pantoken átveszi az Instructure UI designtokenjeit és ikonjait, egyszer feloldja őket, és ezt az egyetlen
modellt számos platformhoz készült csomagokká formálja: egyszerű stíluslapok, SCSS és Less, React, Vue és Svelte,
Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

A feladatodhoz legjobban illeszkedő, legkisebb csomagot telepíted. Az egységesített
`pantoken` csomag mindent újraexportál, így kezdhetsz ott is, és később leszűkítheted.

## Kezdőprojekt létrehozása

A leggyorsabb módja a pantoken kipróbálásának: egy olyan kezdőprojekt generálása, amelybe már telepítve és bekötve érkezik.

```sh
npx create-pantoken-app react
```

Platformok: `components` (egyszerű HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Lásd:
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) a(z) `--dir <path>` és
programozott használathoz. AI kódoló ágenst használsz? A(z) `npx @pantoken/ai init` ágens-szabályokat és egy olyan
`/scaffold-pantoken` skillt telepít, amely ugyanezt teszi közvetlenül a szerkesztődből.

## A tokenmodell

A tokenek `--instui-<group>-<name>` nevű egyéni CSS-tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` értékekkel, ahol a világos és a sötét eltér), `canvas` és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból és az Instructure egyedi
glifáiból származnak.

## Webalkalmazás stílusozása

Telepítsd a stíluslapot, és importáld egyszer. Ez definiál minden egyes `--instui-*` tulajdonságot, így közvetlenül
hivatkozhatsz rájuk a saját CSS-edből.

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

### CSS-tokenek

Az ikonok egyéni CSS-tulajdonságok (`--instui-icon-<name>`). Töltsd be a stíluslapot egyszer, és hivatkozz bármelyik
ikonra mint `mask-image` vagy `background-image` — nincs szükség ikononkénti importálásra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

A(z) `@pantoken/icons` két nevesített exportot biztosít. Használd a(z) `iconsByName` exportot egyetlen ikon lekéréséhez a teljes tömb
bejárása nélkül:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd a(z) `icons` exportot, amikor a teljes készletre szükséged van (pl. egy választó építéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export betölti a teljes IR-t a modul inicializálásakor — ezen a szinten nincs ikononkénti
tree-shaking. A karcsú, csak CSS-alapú betöltéshez használd a [CDN-választót](/guide/cdn-picker), hogy létrehozz egy combine URL-t
kizárólag a szükséges ikonokhoz.

## Generálás natív platformra

A CLI beírja a token forráskódját a célrepóba. A futtatón kívül nincs szükség más telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lásd [a pantoken CLI-t](/guide/cli) az összes célplatformhoz.

## VS Code szerkesztési tippek

A(z) `@pantoken/pantoken` mostantól tartalmazza a VS Code custom-data fájljait, így a felhasználó projektek osztály- és
token-kiegészítést kaphatnak HTML/CSS-ben anélkül, hogy külön pantoken-specifikus kiterjesztést kellene telepíteniük.

1. Telepítsd az egységesített csomagot:

```sh
npm i @pantoken/pantoken
```

1. Irányítsd a VS Code-ot a mellékelt custom-data JSON-ra a munkaterületedről:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Töltsd újra a VS Code-ot (vagy futtasd a "Developer: Reload Window" parancsot) az új adatok alkalmazásához.

Ez engedélyezi a javaslatokat a(z) `instui-*` osztálytokenekhez (és a(z) `-modifier` osztálytokenekhez), valamint
a(z) `--instui-*` egyéni tulajdonságokhoz.

## Merre tovább

- [A csomagtérkép](/guide/packages) — melyik csomagot válaszd, feladat szerint.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ágenseszközök és szabályok telepítése a fogadó repóban.
- [Architektúra](/guide/architecture) — hogyan illeszkedik össze a tokenmodell, a mag (core) és a kimenetek.
- [API-referencia](/api/) — minden exportált szimbólum, a forrásból generálva.
