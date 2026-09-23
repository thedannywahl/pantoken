# Plugins

En pantoken-plugin utvider token- eller CSS-utdata uten å forgreine en pakke. Du bygger en med
`definePlugin` fra `@pantoken/plugin-kit`, og sender den så til `buildTokens` eller `toCss`.

## Lage en plugin

Gi `definePlugin` krokene du implementerer. Den returnerer en vanlig plugin, merket med
kapabilitetene som avledes fra disse krokene. En plugin kan utvide IR-en (`tokens`, `icons`), CSS-utdataene
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

`buildTokens` og `toCss` kjører `checkPlugins` over pluginene du sender inn. Den gir en advarsel — den kaster aldri —
når en plugin ikke har en matchende krok for fasen den er registrert i, så en token-only plugin sendt
til `toCss` blir hoppet over med en merknad i stedet for å stille gjøre ingenting.

## Komponere plugins

Bygg videre på toppen av en annen plugin med `extendPlugin`, eller kombiner jevnaldrende med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kroker i samme fase komponeres: `tokens` kjører basisen og deretter tillegg, `css` slår sammen de to
bidragene, og `icons` kjører begge.

## Valider pluginens utdata

Kjør de delte drift-sjekkene fra `@pantoken/utils` over pluginens egne utdata i dens test, slik at en
typo eller et omdøpt token feiler raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundlete pluginene

- `@pantoken/plugin-simple-icons` — merke ikoner fra simple-icons, registrert som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrert som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVG-er, data-URIer, og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin) som fjerner
  ubrukt custom properties fra et stylesheet.

Lucide Labs register kan lastes lazy, og så sendes til den synkrone token-kroken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Noe som tidligere var plugins leveres nå i `@pantoken/components`, siden så mange komponenter trenger
dem direkte: elevation-skugger (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — alle fokusbare får den når pantoken eier siden), og Instructure-brand
fontene (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den valgfrie
`@pantoken/components/fonts.css` laster `@font-face` woff2-filene).

Se [API-referansen](/api/) for hver plugins eksport.
