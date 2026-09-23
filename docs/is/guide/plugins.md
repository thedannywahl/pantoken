# Viðbætur (Plugins)

Pantoken viðbót (plugin) framlengir token- eða CSS-útgang án þess að forka pakka. Búið er til eina með `definePlugin` frá `@pantoken/plugin-kit`, og síðan send hana til `buildTokens` eða `toCss`.

## Skrifa viðbót

Gefðu `definePlugin` þau hooks sem þú innleiðir. Hún skilar venjulegri viðbót, merkt með þeim hæfileikum sem dregnir eru af þessum hooks. Viðbót getur framlengt IR-ið (`tokens`, `icons`), CSS-útganginn (`css`), eða bæði.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Skráning með hæfileikavitund

`buildTokens` og `toCss` keyra `checkPlugins` yfir viðbætur sem þú sendir inn. Hún gefur viðvörun — hún kastar aldrei — þegar viðbót hefur enga samsvarandi hook fyrir þann stig þar sem hún er skráð, svo token-aðeins viðbót sem send er til `toCss` er sleppt með skýringartekstu frekar en að gera ekkert þögult.

## Samsetja viðbætur

Byggðu ofan á aðra viðbót með `extendPlugin`, eða sameina jafningja með `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks á sama stigi samsetjast: `tokens` keyrir grunninn og síðan viðbótina, `css` sameinar tvær framlagningar, og `icons` keyrir báða.

## Staðfesta útgang viðbótarinnar

Keyrðu sameiginlegar drift-prófanir frá `@pantoken/utils` yfir útgang viðbótarinnar í prófi hennar, svo stafsetningarvilla eða endurnefndur token detekti og bregðist hratt og staðbundið:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Innbyggðu viðbæturnar

- `@pantoken/plugin-simple-icons` — merkjagjöf (branding) fyrir tákn úr simple-icons, skráð sem icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab tákn, skráð sem `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure vörumerkjamerki sem SVG, data-URI og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — PostCSS-viðbót (ekki pantoken-viðbót) sem fjarlægir
  ónotaðar sérsniðnar eigindir úr stílblaði.

Lucide Lab skrásetningin má hlaða línulega (lazily), og síðan senda til samstillts token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nokkur atriði sem áður voru viðbætur eru nú send í `@pantoken/components`, þar sem svo margir hlutar þurfa þau tilbúin: hæðarskuggar (elevation) (`--instui-elevation-*`, í `components.css`), focus-outline hringurinn (í `base.css` — hver sem er sem tekur við fókus fær hann þegar pantoken á síðuna), og Instructure vörumerkjafontarnir (Atkinson Hyperlegible Next: `base.css` beitir `--instui-font-family-base`; valfrjálsa `@pantoken/components/fonts.css` hleður `@font-face` woff2-skrám).

Sjáðu [API tilvísunina](/api/) fyrir útflutning hvers plugins.
