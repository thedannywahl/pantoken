# Pluginar

Ein pantoken-plugin utvidar token- eller CSS-utdata utan å forke eit pakke. Du byggjer ein med `definePlugin` frå `@pantoken/plugin-kit`, og gir han deretter til `buildTokens` eller `toCss`.

## Lag ein plugin

Gje `definePlugin` dei hookane du implementerer. Han returnerer ein vanleg plugin, merka med evnene som blir slutte frå desse hookane. Ein plugin kan utvide IR-en (`tokens`, `icons`), CSS-utdataene (`css`), eller begge delar.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registrering med kjennskap til kapabilitetar

`buildTokens` og `toCss` køyrer `checkPlugins` over dei pluginane du sender inn. Det gir ein åtvaring — det kastar aldri — når ein plugin ikkje har ein matchande hook for steget han er registrert i, så ein token-only-plugin sendt til `toCss` blir hoppa over med ei merknad i staden for at han stille gjer ingenting.

## Set saman pluginar

Bygg vidare på ein annan plugin med `extendPlugin`, eller kombiner jevnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hookar i same steg kan komponere: `tokens` køyrer basisen og deretter tillegg, `css` slår saman dei to bidraga, og `icons` køyrer begge.

## Valider utdata frå pluginen

Kjør dei delte drift-sjekkane frå `@pantoken/utils` mot pluginen sine eigne utdata i testen, slik at ein skrivefeil eller eit omdøpt token feilar raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dei medfølgjande pluginane

- `@pantoken/plugin-simple-icons` — merkjeikon frå simple-icons, registrert som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikon, registrert som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogoar som SVG, data-URI-ar, og `--instui-logo-*` image-tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-plugin (ikkje ein pantoken-plugin) som fjerner ubrukte custom properties frå eit stylesheet.

Lucide Lab sitt register kan lastast late, og deretter sendast til den synkrone token-hooken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nokre få ting som tidlegare var pluginar blir no leverte i `@pantoken/components`, sidan så mange komponentar treng dei direkte: elevation-skuggar (`--instui-elevation-*`, i `components.css`), fokus-omriss-ringen (i `base.css` — alle fokusérbare får han når pantoken eig sida), og Instructure-skriftane (Atkinson Hyperlegible Next: `base.css` brukar `--instui-font-family-base`; den opt-in `@pantoken/components/fonts.css` lastar `@font-face` woff2-fila).

Sjå [API reference](/api/) for kvar plugins eksportar.
