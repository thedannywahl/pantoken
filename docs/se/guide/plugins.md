# Pluginat

Pantoken-plugin čuojá tokena dahje CSS-dávdnat ođđa paketii leat don leat maid bargat. Daddá don `definePlugin` ja `@pantoken/plugin-kit`, gos borjehahttá `buildTokens` dahje `toCss`.

## Geavahit plugin

Láhpa `definePlugin` hookat mii don implementejeaddji. Son boađehahttá normaalta plugin, brandahta capacidades mii leat deduvvan dahje hookaid. Plugin sáhttá ovddidit IR (`tokens`, `icons`), CSS-dávdnat (`css`), dahje vuosttas.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Máhttunvuohta-bargu registrerejuvvan

`buildTokens` ja `toCss` vuođđá `checkPlugins` pluginain maid don daddá. Son vai skávva — das ii vuoigat riŋgat — go plugin eat leat bargguid hook vuoigŋain registrerejuvvon steagasiin, nu ahte token-ovttas plugin mii daddá `toCss` leat skuorrat mii hástalusa buot ii leat deaŧalaš.

## Komposiht pluginat

Barggat ráhkis eará plugin lohkat `extendPlugin`, dahje čađa peerain `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Sama steaža hookat compose: `tokens` ráhkad báse ja ovtta, `css` mearrá duhkke kontribuššonat, ja `icons` ráhkad buot.

## Válddát plugin dearvvašdávdna

Vuođđá geavahuvvon drift-checkaid `@pantoken/utils` plugin-iid dearvvašdávdnain testas, nu galggašii typoj dahje borramuš token vel leat ožžon:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Buolldaš pluginat

- `@pantoken/plugin-simple-icons` — brand-ikonat dahje simple-icons, registrerejuvvon ikontokenna.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonat, registrerejuvvon `--instui-icon-*` image-tokenna.
- `@pantoken/plugin-logos` — Instructure-produktlogoat SVG:s, data-URI:dat ja `--instui-logo-*`
  image-tokenna.
- `@pantoken/plugin-prune-custom-props` — PostCSS-plugin (ii leat pantoken-plugin) mii borrá
  ii-geavahit custom-propertie:t stylesheeta:s.

Lucide Lab registrer sáhttá leat lueddejuvvon lazihkkal, maid daddá synchronoššeahttun token-hooki:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muorrát mii leat oaidná pluginain dan guhkkin dál háliidit `@pantoken/components`, go muitalusat dahje komponentat háliidaid dárbbas: elevation-shadowat (`--instui-elevation-*`, `components.css`), fokus-outline ring ( `base.css` — buot fokusmáhttit fertet soadá go pantoken ovddidii sáddet báiki), ja Instructure brand-fonddat (Atkinson Hyperlegible Next: `base.css` čuovvo `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` luedda `@font-face` woff2:s).

Oahpásat [API-referenssa](/api/) buot plugin-exportain.
