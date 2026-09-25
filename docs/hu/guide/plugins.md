# Bővítmények

Egy pantoken bővítmény kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy egy csomagot forkolna. Egyet a `definePlugin` segítségével építesz a `@pantoken/plugin-kit`-ből, majd átadod a `buildTokens`-nek vagy a `toCss`-nek.

## Bővítmény írása

Add meg a `definePlugin`-nek a megvalósított hookokat. Ez visszaad egy normál bővítményt, amelyet a hookokból következtetett képességekkel címkéz. Egy bővítmény kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-kimenetet (`css`), vagy mindkettőt.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Képesség-tudatos regisztráció

A `buildTokens` és a `toCss` lefuttatja a `checkPlugins`-et a kapott bővítményeken. Figyelmeztet — sosem dob kivételt — amikor egy bővítménynek nincs megfelelő hookja abban a szakaszban, amelybe regisztrálták, így egy csak-token bővítmény, amelyet a `toCss`-hez adnak, egy megjegyzéssel lesz átlépve ahelyett, hogy csendben semmit sem tenne.

## Bővítmények komponálása

Építs egy másik bővítményre a `extendPlugin`-vel, vagy kombinálj társbővítményeket a `mergePlugin`-mal:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszú hookok komponálódnak: a `tokens` először a bázist, majd a kiegészítést futtatja, a `css` egyesíti a két hozzájárulást, és a `icons` mindkettőt lefuttatja.

## Ellenőrizd a bővítményed kimenetét

Futtasd a megosztott drift-ellenőrzéseket a `@pantoken/utils`-ről a bővítmény saját kimenetén a tesztjében, hogy egy elírás vagy átnevezett token gyorsan és helyben hibát okozzon:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A csomagolt bővítmények

- `@pantoken/plugin-simple-icons` — márkázott ikonok a simple-icons-ból, ikon tokenekként regisztrálva.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonok, `--instui-icon-*` kép-tokenekként regisztrálva.
- `@pantoken/plugin-logos` — Instructure terméklogók SVG-ként, data URI-ként és `--instui-logo-*` kép-tokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS plugin (nem pantoken bővítmény), amely eltávolítja a nem használt egyéni property-ket a stylesheetből.
- `@pantoken/plugin-custom-theme-colors` — egy oldal márkáját újracímkézi azzal, hogy egy attribútumot (`data-pantoken-color`) állít be egy a 13 paletta közül, vagy `custom`-t bármely márka-hexhez. Lásd [Téma színek](#theme-colors).

A Lucide Lab regiszter betölthető lazán, majd átadható a szinkron token-hooknak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Néhány dolog, ami korábban bővítmény volt, most a `@pantoken/components` alatt szállítódik, mivel sok komponensnek natívan szüksége van rájuk: emelési árnyékok (`--instui-elevation-*`, a `components.css`-ben), a fókusz-kontúr gyűrű (a `base.css`-ban — minden fókuszálható elem megkapja, amikor a pantoken birtokolja az oldalt), és az Instructure márkabetűk (Atkinson Hyperlegible Next: a `base.css` alkalmazza a `--instui-font-family-base`-t; az opt-in `@pantoken/components/fonts.css` tölti be a `@font-face` woff2 fájlokat).

## Téma színek

A `@pantoken/plugin-custom-theme-colors` egy `[data-pantoken-color="…"]` blokkot bocsát ki palettánként
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Minden blokk a márka alaprendszereket (`--instui-primitive-color-navy-*` és `-blue-*`) a kiválasztott palettára irányítja. Újra-származtatja az upstream által literál hex-re kisimított márka felületeket is, megtartva a beégetett alfa értéküket a `color-mix()`-n keresztül. A szemantikus státusz színek, az explicit kék kiemelések és az emelési árnyékok változatlanok maradnak. Próbáld ki a [mintalap-alapú témázó demóban](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Egyedi márkaszín

Állítsd be a `data-pantoken-color="custom"`-t bármely hex-ből történő újracímkézéshez, például a Theme Editorba beírt Canvas admin elsődleges színéhez. A pantoken ebből teljes 10–200-as `--instui-primitive-color-custom-*` skálát vezeti le:

1. **Referencia görbe.** Minden lépés célvilágossága az átlagos OKLCH világosság a 13 palettánál az adott lépésen, ahol a 0 fehérre és a 210 fekete-re van rögzítve. Így az egyedi skála elhelyezkedése megegyezik a szállított palettákéval.
2. **Horgony.** A bemenet arra a lépésre esik, amelynek célvilágossága a legközelebb áll a sajátjához, majd arra az pontos világosságra rögzül. A `#cccccc` a `custom-40`-re válik a `#c9c9c9`-nél: közel a bemenethez, de nem mindig azonos. A "legközelebbi" a görbe szerinti legközelebbi lépést jelenti, nem a legközelebbi meglévő paletta színt.
3. **Kitöltés.** Minden más lépés megtartja a bemenet árnyalatát. A telítettsége a paletták átlagos telítettségi görbéjét követi a horgonyhoz viszonyítva, és csak akkor csökken, ha a szín kívül esik az sRGB tartományon.

Csak a `#rgb` és a `#rrggbb` elfogadott; bármi más `TypeError`-t dob, így egy űrlapról érkező hex nem tud CSS-t injektálni.

Build időben bocsásd ki az egész szabályt a már deklarált levezetett primítívekkel:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

A futásidejű szín kiválasztásához anélkül, hogy a tokenkészletet szállítanád, előszámold a görbét és az átképzési szabályt build időben. Ezután a böngészőben használd a függőségmentes `/scale` entry-t, és állítsd be csak a 20 levezetett primitívet:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

A dokumentációs oldal témaválasztója, a Canvas témaszerkesztő és a fent említett demo mind így működik.

Lásd az [API referencia](/api/) minden bővítmény exportjára.
