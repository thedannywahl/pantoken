# Első lépések

A pantoken átveszi az Instructure UI design tokenjeit és ikonjait, egyszer feloldja őket, és ezt az egyetlen
modellt számos platform csomagjává formálja: egyszerű stíluslapok, SCSS és Less, React, Vue és Svelte,
Tailwind és Panda, natív Swift és Kotlin, WordPress és Drupal, Figma és még sok más.

Telepítsd a feladatodhoz illő legkisebb csomagot. Mindent újraexportál az egységesített
`pantoken` csomag is, így kezdhetsz ott is, és később szűkíthetsz.

## A tokenmodell

A tokenek `--instui-<group>-<name>` elnevezésű egyéni CSS-tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` értékkel, ahol a világos és sötét mód eltér), `canvas` és `canvasHighContrast`.
Az ikonok a Lucide-ból és az Instructure egyedi glifáiból származtatott
`<image>` tokenek (`--instui-icon-<name>`).

## Webalkalmazás stílusozása

Telepítsd a stíluslapot, és importáld egyszer. Ez definiálja az összes `--instui-*` tulajdonságot, így közvetlenül
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

A webkomponens bármilyen keretrendszerben működik, portolás nélkül.

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
ikonra mint `mask-image` vagy `background-image` — nincs szükség ikononkénti importra.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — egyetlen ikon vs. teljes készlet

A `@pantoken/icons` két elnevezett exportot biztosít. Használd a `iconsByName` exportot egyetlen ikon lekéréséhez a teljes tömb
bejárása nélkül:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Használd a `icons` exportot, amikor a teljes készletre van szükséged (pl. egy választó felület készítéséhez):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Mindkét export a modul inicializálásakor betölti a teljes IR-t — ezen a szinten nincs ikononkénti
tree-shaking. A karcsú, csak CSS-alapú betöltéshez használd a [CDN-választót](/guide/cdn-picker) egy kombinált URL előállításához,
amely csak a szükséges ikonokat tartalmazza.

## Generálás natív platformra

A CLI a tokenforrást a célrepóba írja. A futtatón kívül nincs szükség egyéb telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Az összes célplatformhoz lásd: [a pantoken CLI](/guide/cli).

## VS Code szerkesztési tippek

A `@pantoken/pantoken` mostantól VS Code custom-data fájlokat is biztosít, így a downstream projektek
osztály- és token-kiegészítést kaphatnak HTML/CSS-ben anélkül, hogy pantoken-specifikus kiterjesztést kellene telepíteniük.

1. Telepítsd az egységesített csomagot:

```sh
npm i @pantoken/pantoken
```

1. Mutass rá a VS Code-ban a mellékelt custom-data JSON-ra a felhasználói munkaterületedről:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Töltsd újra a VS Code-ot (vagy futtasd a „Developer: Reload Window” parancsot) az új adatok érvénybe léptetéséhez.

Ez engedélyezi a javaslatokat a `instui-*` osztálytokenekhez (és a `-modifier` osztálytokenekhez), valamint a
`--instui-*` egyéni tulajdonságokhoz.

## Merre tovább

- [A csomagtérkép](/guide/packages) — melyik csomagot érdemes választani feladatonként.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ügynökeszközök és szabályok telepítése egy fogyasztói repóban.
- [Architektúra](/guide/architecture) — hogyan illeszkedik össze a tokenmodell, a mag és a kimenetek.
- [API referencia](/api/) — minden exportált szimbólum, a forráskódból generálva.
