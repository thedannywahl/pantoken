# Viðbætur

Pantoken-viðbót útvíkkar token- eða CSS-úttak án þess að afrita pakkann. Þú býrð eina með `definePlugin` frá `@pantoken/plugin-kit`, og sendir hana síðan til `buildTokens` eða `toCss`.

## Skrifa viðbót

Gefðu `definePlugin` þær hook-aðgerðir sem þú útfærir. Hún skilar venjulegri viðbót, merkt með þeim hæfileikum sem dregnir eru af þeim hook-um. Viðbót getur útvíkkað IR-ið (`tokens`, `icons`), CSS-úttakið (`css`), eða bæði.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Skráning með eiginleikavitund

`buildTokens` og `toCss` keyra `checkPlugins` yfir þær viðbætur sem þú sendir inn. Hún gefur viðvörun — hún kastar aldri undantekningu — þegar viðbót hefur engan samsvarandi hook fyrir þann stig sem hún er skráð í, svo token-only viðbót sem send er til `toCss` er sleppt með athugasemd frekar en að gera ekkert þegjandi.

## Setja saman viðbætur

Byggðu ofan á aðra viðbót með `extendPlugin`, eða sameina jafningja með `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook-ar á sama stigi samsetjast: `tokens` keyrir grunninn og síðan viðbótina, `css` sameinar tvær framlagningar, og `icons` keyrir báða.

## Staðfesta úttak viðbótarinnar

Keyrðu sameiginlegar "drift" athuganir frá `@pantoken/utils` yfir eigið úttak viðbótarinnar í prófunum hennar, svo stafsetningarvilla eða endurnefnd token bilar hratt og staðbundið:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Innbyggðar viðbætur

- `@pantoken/plugin-simple-icons` — merkir tákn frá simple-icons sem icon tokens.
- `@pantoken/plugin-logos` — Instructure vöruheildir sem SVG, data URI og `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — PostCSS-viðbót (ekki pantoken-viðbót) sem fjarlægir
  ónotaðar custom properties úr stílblaði.

Nokkur atriði sem áður voru viðbætur fylgja nú `@pantoken/components`, þar sem margar íhlutir þurfa þau strax úr kassanum: hæðarskuggar (`--instui-elevation-*`, í `components.css`), fokus-útlínuhringurinn (í `base.css` — hver sem er með fókus fær hann þegar pantoken á síðuna), og Instructure vörumerkjafontarnir (Atkinson Hyperlegible Next: `base.css` beitir `--instui-font-family-base`; valkvætt `@pantoken/components/fonts.css` hleður `@font-face` woff2-skrám).

Sjá [API heimildina](/api/) fyrir útflutning hvers viðbótar.
