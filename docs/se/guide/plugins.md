# Pluginat

Pantoken-plugin leat geavahit token- dahje CSS-juvleriid jápmán maidne go leat ii forkán paket'a. Don čájeha nu `definePlugin` dala `@pantoken/plugin-kit`, de geavahát das `buildTokens` dahje `toCss`.

## Buorrehus plugin

Geavahát `definePlugin` hookaid mii don čuovvut. Dat vuolggeálmmá plugin, mii lea bránndahttán capability-llat mii leat álgit vuosttaldat hálddažat. Plugin sáhttá geavahit IR (`tokens`, `icons`), CSS-juvleriid (`css`), dahje båda.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Capability-čujuhusregistrereapmi

`buildTokens` ja `toCss` roahppa `checkPlugins` pluginain mii don sidjat. Son varrá — ii álggahuvvo — gos plugin iid maŋŋebealde hook'a stagingis mii das registrerehii, nuvttá token-ain ođđa plugin mii leat sidjan `toCss` lea gávdnoheapmárkkin maŋimuš dahje čuohppat álgguheapmi.

## Komposea pluginat

Bargá eatnama pluginin boahtte ovtta `extendPlugin` dahje buoridit peerraheapmi `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Sami-stage hook'at compose'ra: `tokens` roahppá basá ja dahje addit, `css` bargga duoraga dahje máŋggašuheapmi, ja `icons` roahppá båda.

## Validere plugin-jes output

Rohket drift-check'sa mii leat `@pantoken/utils` pluginain ovddasvástádusis testas, nu go typo dahje tokena čájehallat fássá dahje gávdnoheapmi:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Bundler-pluginat

- `@pantoken/plugin-simple-icons` — brándaa ikonat leat simple-icons-binna, registrerejuvvo ikon-tokenain.
- `@pantoken/plugin-logos` — Instructure-produkt logosat SVG:s, data-URI:s ja `--instui-logo-*`
  image-tokenain.
- `@pantoken/plugin-prune-custom-props` — PostCSS-plugin (ii lea pantoken-plugin) mii čuodá hástalit custom-properties stilistii.

Muhtun birra mii oaidnigon pluginnaid dál leat sáhttán `@pantoken/components`: elevasuvnnan skávvot (`--instui-elevation-*`, `components.css`), fokus-outline-ringi (`base.css` — buot fokus-eahkesat geavahát das go pantoken leat govvidit sivvii), ja Instructure-bránda font'at (Atkinson Hyperlegible Next: `base.css` čájeha `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` lohkká `@font-face` woff2-siid).

Lávkát [API-referenssa](/api/) buot pluginna exporttain.
