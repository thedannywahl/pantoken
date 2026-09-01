# Plugins

Ein pantoken-plugin utvidar token- eller CSS-utdata utan å forke ein pakke. Bygg ein med
`definePlugin` frå `@pantoken/plugin-kit`, og send han så til `buildTokens` eller `toCss`.

## Forfatt ein plugin

Gje `definePlugin` hookar du implementerer. Den returnerer ein vanleg plugin, merka med
dei kapabilitetane som blir avleia frå desse hookane. Ein plugin kan utvide IR (`tokens`, `icons`), CSS‑utdata
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

`buildTokens` og `toCss` køyrer `checkPlugins` over pluginane du sender inn. Det varslar — det kaster aldri —
når ein plugin ikkje har ein matchande hook for steget han er registrert i, så ein token‑berre plugin sendt
til `toCss` blir hoppa over med ei merknad i staden for å ikkje gjere noko lydlaust.

## Set saman pluginar

Bygg vidare på ein annan plugin med `extendPlugin`, eller kombiner jamstillte med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hookar i same steg kan komponere: `tokens` køyrer basis først og så tillegg, `css` slår saman dei to
bidraga, og `icons` køyrer begge.

## Valider utdataene frå pluginen din

Kjør dei delte drift‑sjekkane frå `@pantoken/utils` på pluginen sin eigen utdata i testen, slik at ein skrivefeil eller eit omnamna token feilar raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dei inkluderte pluginane

- `@pantoken/plugin-simple-icons` — merkjer ikon frå simple-icons, registrerte som icon‑tokenar.
- `@pantoken/plugin-logos` — Instructure‑produktlogoar som SVG, data‑URIar, og `--instui-logo-*`
  bilete‑tokenar.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS‑plugin (ikkje ein pantoken‑plugin) som fjerar
  ubrukelege custom properties frå eit stylesheet.

Eit par ting som tidlegare var pluginar kjem no i `@pantoken/components`, sidan så mange komponentar treng
dei ferdigpakka: elevasjons‑skuggar (`--instui-elevation-*`, i `components.css`), focus‑outline
ringen (i `base.css` — kvar fokusbar får han når pantoken eig sida), og Instructure‑merkefontane
(Atkinson Hyperlegible Next: `base.css` brukar `--instui-font-family-base`; den valfrie
`@pantoken/components/fonts.css` lastar `@font-face` woff2‑filene).

Sjå [API‑referansen](/api/) for eksportane til kvar plugin.
