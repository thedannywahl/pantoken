# Plugins

En pantoken-plugin utvider token- eller CSS-utdata uten å forke en pakke. Du bygger en med
`definePlugin` fra `@pantoken/plugin-kit`, og sender den deretter til `buildTokens` eller `toCss`.

## Lag en plugin

Gi `definePlugin` krokene (hooks) du implementerer. Den returnerer en vanlig plugin, merket med
kapabilitetene som utledes fra disse krokene. En plugin kan utvide IR-en (`tokens`, `icons`), CSS-utdataene
(`css`), eller begge deler.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapabilitetsbevisst registrering

`buildTokens` og `toCss` kjører `checkPlugins` over pluginene du sender inn. Den advarer — kaster aldri —
når en plugin ikke har en matchende krok for stadiet den er registrert i, så en kun-token-plugin sendt
til `toCss` blir hoppet over med en merknad i stedet for å stilletiende ikke gjøre noe.

## Komponer plugins

Bygg videre på en annen plugin med `extendPlugin`, eller kombiner jevnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kroker for samme stadium komponeres: `tokens` kjører først basisen og så tillegg, `css` slår sammen de to
bidragene, og `icons` kjører begge.

## Valider pluginens utdata

Kjør de delte drift-sjekkene fra `@pantoken/utils` mot pluginens egne utdata i testen, slik at en
feilskriving eller et omdøpt token feiler raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De medfølgende pluginene

- `@pantoken/plugin-simple-icons` — merker ikoner fra simple-icons som ikon-tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVG-er, data-URIer, og `--instui-logo-*`
  bilde-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin) som fjerner
  ubrukt custom properties fra et stilark.

Noe som tidligere var plugins, ligger nå i `@pantoken/components`, siden så mange komponenter trenger
dem fra boksen: elevasjonsskygger (`--instui-elevation-*`, i `components.css`), fokus-omristringen
ringen (i `base.css` — alle fokuserbare får den når pantoken eier siden), og Instructure-merke
fontene (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den valgfrie
`@pantoken/components/fonts.css` laster `@font-face` woff2-ene).

Se [API-referansen](/api/) for hver plugins eksport.
