# Bővítmények

A pantoken bővítmény kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy egy csomagot forkolna. Egyet az `definePlugin` segítségével készítesz az `@pantoken/plugin-kit`-ból, majd átadod az `buildTokens`-nek vagy az `toCss`-nak.

## Bővítmény készítése

Add meg az `definePlugin`-nek azokat a hook-okat, amelyeket megvalósítasz. Visszaad egy normál bővítményt, amely a hook-okból következtetett képességekkel van felcímkézve. Egy bővítmény kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-kimenetet (`css`), vagy mindkettőt.

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

Az `buildTokens` és az `toCss` lefuttatja az `checkPlugins`-t a megadott bővítményeken. Figyelmeztet — soha nem dob kivételt — ha egy bővítménynek nincs megfelelő hook-ja abban a szakaszban, amelyben regisztrálták, így egy csak-token bővítményt, amelyet az `toCss`-nek adnak át, megjegyzéssel átugor, ahelyett hogy csendben semmit sem tenne.

## Bővítmények összekomponálása

Építs egy másik bővítményre az `extendPlugin`-vel, vagy kombinálj kortársakat az `mergePlugin`-mal:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszú hook-ok komponálódnak: az `tokens` lefuttatja először az alapot, majd a kiegészítést, az `css` egyesíti a két hozzájárulást, és az `icons` mindkettőt futtatja.

## Ellenőrizd a bővítményed kimenetét

Futtasd a megosztott drift ellenőrzéseket az `@pantoken/utils`-től a bővítményed saját kimenetén a tesztjében, hogy egy elírás vagy átnevezett token gyorsan és helyben hibát okozzon:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A beépített bővítmények

- `@pantoken/plugin-simple-icons` — ikonok márkajelzése a simple-icons-ból, ikon tokenekként regisztrálva.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonok, `--instui-icon-*` kép tokenekként regisztrálva.
- `@pantoken/plugin-logos` — Instructure terméklogók SVG-ként, adat-URI-ként és `--instui-logo-*`
  kép tokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS plugin (nem pantoken bővítmény), amely eltávolítja
  a nem használt egyéni tulajdonságokat egy stíluslapból.

A Lucide Lab regisztere betölthető lusta módon, majd átadható a szinkron token hook-nak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Néhány dolog, amely korábban bővítmény volt, most az `@pantoken/components`-ban található, mivel sok komponensnek alapból szüksége van rájuk: emelési árnyékok (`--instui-elevation-*`, az `components.css`-ban), a fókusz-körvonal gyűrű (az `base.css`-ben — minden fókuszálható elem megkapja, amikor a pantoken birtokolja az oldalt), és az Instructure márka betűtípusai (Atkinson Hyperlegible Next: az `base.css` alkalmazza az `--instui-font-family-base`-t; az opcionális `@pantoken/components/fonts.css` tölti be az `@font-face` woff2 fájlokat).

Lásd az [API referenciát](/api/) minden bővítmény exportjához.
