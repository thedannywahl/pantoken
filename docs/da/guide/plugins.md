# Plugins

En pantoken-plugin udvider token- eller CSS-output uden at oprette en separat pakke. Den bygges med
`definePlugin` fra `@pantoken/plugin-kit`, og sendes derefter til `buildTokens` eller `toCss`.

## Opret en plugin

Giv `definePlugin` de hooks, du implementerer. Den returnerer en normal plugin, mærket med de
kapabiliteter, der udledes fra disse hooks. En plugin kan udvide IR'en (`tokens`, `icons`), CSS-outputtet (`css`), eller begge dele.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapabilitetsbevidst registrering

`buildTokens` og `toCss` kører `checkPlugins` over de plugins, du afleverer. Den advarer — den kaster aldrig —
når en plugin ikke har et matchende hook til det stadie, den er registreret i, så en kun-token-plugin sendt
til `toCss` bliver sprunget over med en note i stedet for at lade den ingenting gøre uden at sige noget.

## Komponer plugins

Byg ovenpå en anden plugin med `extendPlugin`, eller kombiner jævnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks på samme stadie kan komponeres: `tokens` kører base'en og så tilføjelsen, `css` fletter de to
bidrag, og `icons` kører begge.

## Valider din plugins output

Kør de delte driftchecks fra `@pantoken/utils` over din plugins eget output i dens test, så en
tastefejl eller et omdøbt token fejler hurtigt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De medfølgende plugins

- `@pantoken/plugin-simple-icons` — brandikoner fra simple-icons, registreret som icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registreret som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVG'er, data-URI'er og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin), som fjerner
  ubrugte custom properties fra et stylesheet.

Lucide Labs register kan indlæses ladt, og derefter sendes til den synkrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nogle få ting, der plejede at være plugins, leveres nu i `@pantoken/components`, da så mange komponenter har
brug for dem som standard: elevation-skuggere (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — alle fokusérbare får den, når pantoken ejer siden), og Instructure brand-
skrifttyperne (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den valgfrie
`@pantoken/components/fonts.css` indlæser `@font-face` woff2'erne).

Se [API-reference](/api/) for hver plugins eksporter.
