# Bővítmények

Egy pantoken bővítmény kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy egy csomagot forkolni kellene. Egy bővítményt
`definePlugin` segítségével építesz a `@pantoken/plugin-kit` csomagból, majd átadod a `buildTokens` vagy `toCss` függvénynek.

## Bővítmény írása

Add meg a `definePlugin` számára az általad implementált hookokat. Egy normál bővítményt ad vissza, amelyet a
hookokból származtatott képességekkel jelöl meg. Egy bővítmény kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-
kimenetet (`css`), vagy mindkettőt.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Képességtudatos regisztráció

A `buildTokens` és `toCss` futtatja a `checkPlugins` függvényt az átadott bővítményeken. Figyelmeztet — soha nem dob kivételt —,
ha egy bővítménynek nincs megfelelő hookja a szakaszhoz, amelybe regisztrálva van, így egy csak tokent kezelő bővítmény, amelyet
a `toCss` függvénynek adnak át, egy megjegyzéssel kihagyásra kerül, ahelyett, hogy csendben semmit sem tenne.

## Bővítmények kompozíciója

Építs egy másik bővítményre a `extendPlugin` segítségével, vagy egyesíts azonos szintű bővítményeket a `mergePlugin` segítségével:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszban lévő hookok kompozícióba lépnek: a `tokens` előbb az alapot, majd a kiegészítést futtatja, a `css` egyesíti a két
hozzájárulást, a `icons` pedig mindkettőt futtatja.

## A bővítmény kimenetének validálása

Futtasd a `@pantoken/utils` csomagból származó közös drift-ellenőrzéseket a bővítményed saját kimenetén a tesztjében, hogy egy
elgépelés vagy egy átnevezett token gyorsan és helyben bukjon meg:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A csomagolt bővítmények

- `@pantoken/plugin-focus-outline` — egy fókuszgyűrű tokenkészlet és az azt alkalmazó szabályok.
- `@pantoken/plugin-simple-icons` — márkaikonok a simple-icons csomagból, ikontokenként regisztrálva.
- `@pantoken/plugin-font-families` — az Instructure betűtípusok (Atkinson Hyperlegible Next)
  `@font-face` szabályokként és font-family tokenekként.
- `@pantoken/plugin-logos` — Instructure termékembléma SVG-ként, data URI-ként és `--instui-logo-*`
  képtokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS bővítmény (nem pantoken bővítmény), amely eltávolítja a
  nem használt egyéni tulajdonságokat egy stíluslapról.

A bővítmények exportjaiért lásd az [API referenciát](/api/).
