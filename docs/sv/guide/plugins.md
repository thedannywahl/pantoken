# Plugins

Ett pantoken-plugin utökar token- eller CSS-utdata utan att skapa en fork av ett paket. Du bygger ett med
`definePlugin` från `@pantoken/plugin-kit`, och skickar det sedan till `buildTokens` eller `toCss`.

## Skapa ett plugin

Ge `definePlugin` de hookar du implementerar. Det returnerar ett normalt plugin, märkt med de
möjligheter som härleds från dessa hookar. Ett plugin kan utöka IR (`tokens`, `icons`), CSS-utdata (`css`), eller båda.

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

`buildTokens` och `toCss` kör `checkPlugins` över de plugins du skickar. Det varnar — det kastar aldrig —
när ett plugin saknar en matchande hook för det skede det registrerats i, så ett token-endast-plugin som skickas
till `toCss` hoppas över med en anteckning istället för att tyst inte göra någonting.

## Komponera plugins

Bygg ovanpå ett annat plugin med `extendPlugin`, eller kombinera jämnåriga med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hookar i samma skede kan komponeras: `tokens` kör basen och sedan tillägget, `css` slår samman de två
bidragen, och `icons` kör båda.

## Validera ditt plugins utdata

Kör de delade driftkontrollerna från `@pantoken/utils` över ditt plugins egna utdata i dess test, så att ett
stavfel eller en omdöpt token felar snabbt och lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundlade pluginsen

- `@pantoken/plugin-simple-icons` — varumärkesikoner från simple-icons, registrerade som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrerade som `--instui-icon-*` bild-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogotyper som SVG, data-URI:er och `--instui-logo-*`
  bild-tokens.
- `@pantoken/plugin-prune-custom-props` — ett PostCSS-plugin (inte ett pantoken-plugin) som tar bort
  oanvända custom properties från ett stylesheet.

Lucide Labs register kan laddas lateint, och sedan skickas till den synkrona token-hooken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Några saker som tidigare var plugins levereras nu i `@pantoken/components`, eftersom så många komponenter behöver
dem direkt: elevationsskuggor (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — varje fokuserbar får den när pantoken äger sidan), och Instructure-varumärkets
typsnitt (Atkinson Hyperlegible Next: `base.css` tillämpar `--instui-font-family-base`; den opt-in
`@pantoken/components/fonts.css` laddar `@font-face` woff2-filer).

Se [API-referensen](/api/) för varje plugins exports.
