# Bővítmények

Egy pantoken plugin kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy egy csomagot fork-olna. Egyet az `definePlugin` segítségével építesz az `@pantoken/plugin-kit`-ből, majd átadod az `buildTokens`-nek vagy az `toCss`-nak.

## Plugin szerzője

Add meg az `definePlugin`-nek azokat a hookokat, amelyeket megvalósítasz. Visszaad egy normál plugint, amely a megadott hookokból következtetett képességekkel van címkézve. Egy plugin kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-kimenetet (`css`), vagy mindkettőt.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Képesség-érzékeny regisztráció

Az `buildTokens` és az `toCss` az `checkPlugins`-et futtatja végig az általad átadott pluginokon. Figyelmeztet — sosem dob kivételt —, ha egy pluginnak nincs megfelelő hookja abban a szakaszban, amelyre regisztrálták, így egy csak-token plugin, amelyet az `toCss`-hez adsz, megjegyzéssel kerül kihagyásra ahelyett, hogy csendben nem csinálna semmit.

## Pluginok összefűzése

Egy másik plugin tetejére építhetsz az `extendPlugin` segítségével, vagy társakat kombinálhatsz az `mergePlugin`-mal:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszban lévő hookok komponálódnak: az `tokens` először a bázist, majd a kiegészítést futtatja, az `css` egyesíti a két hozzájárulást, és az `icons` mindkettőt futtatja.

## Validáld a pluginod kimenetét

Futtasd a megosztott drift-ellenőrzéseket az `@pantoken/utils`-ből a pluginod saját kimenetén a tesztjében, hogy egy elírás vagy átnevezett token gyorsan és helyileg hibára fusson:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A csomagolt pluginok

- `@pantoken/plugin-simple-icons` — márkázott ikonok a simple-icons-ból, ikon tokenekként regisztrálva.
- `@pantoken/plugin-logos` — Instructure terméklogók SVG-ként, adat-URI-ként és `--instui-logo-*` képtokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS plugin (nem pantoken plugin), amely eltávolítja a használaton kívüli egyéni tulajdonságokat egy stíluslapból.

Néhány dolog, ami korábban plugin volt, most az `@pantoken/components` részeként érkezik, mivel sok komponensnek alapból szüksége van rájuk: emelési árnyékok (`--instui-elevation-*`, az `components.css`-ben), a fókusz-kontúr gyűrűje (az `base.css`-ben — minden fókuszolható elem megkapja, amikor a pantoken kezeli az oldalt), és az Instructure márkabetűtípusok (Atkinson Hyperlegible Next: az `base.css` alkalmazza az `--instui-font-family-base`-et; az opcionális `@pantoken/components/fonts.css` tölti be az `@font-face` woff2 fájlokat).

Lásd az [API referencia](/api/) minden plugin exportjához.
