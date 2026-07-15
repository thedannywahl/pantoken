# Bővítmények

Egy pantoken bővítmény kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy le kellene forkolni egy csomagot. A `definePlugin` segítségével készítheted el a `@pantoken/plugin-kit` csomagból, majd átadhatod a `buildTokens` vagy `toCss` függvénynek.

## Bővítmény készítése

Add át a `definePlugin` függvénynek az általad megvalósított hookokat. Egy normál bővítményt ad vissza, amelyet az adott hookokból kikövetkeztetett képességekkel jelöl meg. Egy bővítmény kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-kimenetet (`css`), vagy mindkettőt.

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

A `buildTokens` és a `toCss` lefuttatja a `checkPlugins` függvényt az átadott bővítményeken. Figyelmeztet — soha nem dob kivételt —, ha egy bővítménynek nincs megfelelő hookja a szakaszhoz, amelyben regisztrálva van, tehát egy csak tokent kezelő bővítmény, amelyet a `toCss` függvénynek adnak át, egy megjegyzéssel kihagyásra kerül ahelyett, hogy csendben semmit sem tenne.

## Bővítmények összeállítása

Építs egy másik bővítményre a `extendPlugin` segítségével, vagy kombinálj társ bővítményeket a `mergePlugin` függvénnyel:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszban lévő hookok összeállnak: a `tokens` először az alapot futtatja, majd a kiegészítést, a `css` összefésüli a két hozzájárulást, és a `icons` mindkettőt futtatja.

## A bővítmény kimenetének validálása

Futtasd a `@pantoken/utils` közös eltéréseket ellenőrző vizsgálatait a bővítményed saját kimenetén a tesztjében, hogy egy elgépelés vagy egy átnevezett token gyorsan és helyben hibázzon:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A mellékelt bővítmények

- `@pantoken/plugin-simple-icons` — márkaikonok a simple-icons csomagból, ikon tokenként regisztrálva.
- `@pantoken/plugin-logos` — Instructure termékek logói SVG-ként, data URI-ként, és `--instui-logo-*` képtokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS bővítmény (nem pantoken bővítmény), amely eltávolítja a nem használt egyedi tulajdonságokat egy stíluslapról.

Néhány dolog, ami korábban bővítmény volt, most a `@pantoken/components` csomagban érkezik, mivel sok komponensnek szüksége van rájuk alapból: az elevációs árnyékok (`--instui-elevation-*`, a `components.css` csomagban), a fókusz körvonal gyűrű (a `base.css` csomagban — minden fókuszálható elem megkapja, ha a pantoken birtokolja az oldalt), és az Instructure márka betűtípusai (Atkinson Hyperlegible Next: a `base.css` alkalmazza a `--instui-font-family-base` tulajdonságot; az opcionális `@pantoken/components/fonts.css` betölti a `@font-face` woff2 fájlokat).

Lásd az [API referenciát](/api/) az egyes bővítmények exportjaihoz.
