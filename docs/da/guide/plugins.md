# Plugins

Et pantoken-plugin udvider token- eller CSS-outputtet uden at forgrene et package. Du bygger et med
`definePlugin` fra `@pantoken/plugin-kit`, og giver det derefter til `buildTokens` eller `toCss`.

## Opret et plugin

Giv `definePlugin` de hooks, du implementerer. Den returnerer et normalt plugin, mærket med de
kapabiliteter, der udledes fra disse hooks. Et plugin kan udvide IR'en (`tokens`, `icons`), CSS-
outputtet (`css`), eller begge dele.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapabilitets-bevidst registrering

`buildTokens` og `toCss` kører `checkPlugins` over de plugins, du passerer. Den advarer — den kaster aldrig —
når et plugin ikke har et matchende hook for den fase, det er registreret i, så et kun-token-plugin givet til
`toCss` bliver sprunget over med en note i stedet for at gøre ingenting uden varsel.

## Komponer plugins

Byg oven på et andet plugin med `extendPlugin`, eller kombiner jævnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks i samme fase komponereres: `tokens` kører først base og derefter tilføjelsen, `css` merger de to
bidrag, og `icons` kører begge.

## Validér dit plugins output

Kør de delte drift-checks fra `@pantoken/utils` over dit plugins eget output i dets test, så en
tastefejl eller et omdøbt token fejler hurtigt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundtede plugins

- `@pantoken/plugin-simple-icons` — brand-ikoner fra simple-icons, registreret som icon-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogoer som SVG'er, data-URI'er og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke et pantoken-plugin), der fjerner
  ubrugte custom properties fra et stylesheet.

Et par ting, som tidligere var plugins, leveres nu i `@pantoken/components`, da så mange komponenter behøver
dem ud af boksen: elevation-skuggere (`--instui-elevation-*`, i `components.css`), fokus-outline-
ringen (i `base.css` — alle fokuserbare får den, når pantoken ejer siden), og Instructure-brandets
fonte (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; det valgfrie
`@pantoken/components/fonts.css` loader `@font-face` woff2-filerne).

Se [API reference](/api/) for hvert plugins exports.
