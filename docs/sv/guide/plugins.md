# Tillägg

Ett pantoken-tillägg utökar token- eller CSS-utdata utan att forka ett paket. Du bygger ett med
`definePlugin` från `@pantoken/plugin-kit`, och skickar det sedan till `buildTokens` eller `toCss`.

## Skapa ett tillägg

Ge `definePlugin` de hooks du implementerar. Det returnerar ett vanligt tillägg, märkt med de
kapaciteter som härleds från dessa hooks. Ett tillägg kan utöka IR (`tokens`, `icons`), CSS-utdata
(`css`), eller båda.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapacitetsmedveten registrering

`buildTokens` och `toCss` kör `checkPlugins` över de tillägg du skickar. Det varnar — det kastar aldrig —
när ett tillägg saknar en matchande hook för det steg det registrerats i, så ett token-endast-tillägg som skickas
till `toCss` hoppas över med en notis istället för att tyst göra ingenting.

## Komponera tillägg

Bygg ovanpå ett annat tillägg med `extendPlugin`, eller kombinera jämlikar med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks på samma steg komponeras: `tokens` kör basen och sedan tillägget, `css` slår ihop de två
bidragen, och `icons` kör båda.

## Validera ditt tilläggs utdata

Kör de delade drift-kontrollerna från `@pantoken/utils` över ditt tilläggs egna utdata i dess test, så att en
typografisk fel eller ett omdöpt token misslyckas snabbt och lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundlade tilläggen

- `@pantoken/plugin-simple-icons` — märker ikoner från simple-icons som icon-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogotyper som SVG, data-URI:er och `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (inte ett pantoken-tillägg) som tar bort
  oanvända custom properties från ett stylesheet.

Några saker som tidigare var tillägg ingår nu i `@pantoken/components`, eftersom så många komponenter behöver
dem direkt: elevation-skuggor (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — varje fokuserbar får den när pantoken äger sidan), och Instructure-varumärkes
typsnitt (Atkinson Hyperlegible Next: `base.css` tillämpar `--instui-font-family-base`; det opt-in
`@pantoken/components/fonts.css` laddar `@font-face` woff2-filerna).

Se [API reference](/api/) för varje tilläggs exports.
