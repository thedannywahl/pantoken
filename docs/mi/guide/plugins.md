# Mono

Ka whanui te mono o pantoken i te putanga token, putanga CSS rānei me te kore e hanga i tētahi pākete hou. Ka hangaia tētahi mā `definePlugin` mai i `@pantoken/plugin-kit`, katahi ka tukuna ki `buildTokens` rānei `toCss`.

## Tuhia he mono

Homai ki `definePlugin` ngā hooks e whakauru ana koe. Ka whakahokia mai he mono noa, kua tohu āna āheinga i whakatau i ngā hooks rā. Ka taea e tētahi mono te whanui i te IR (`tokens`, `icons`), te putanga CSS (`css`), rānei ko ngā taipitopito e rua.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rēhitatanga e mōhio ana ki ngā āheinga

Ka whakahaere a `buildTokens` me `toCss` i a `checkPlugins` i runga i ngā mono ka tukuna e koe. Ka whakatūpato — kāore e whiua — mēnā kāore he hook e hāngai ana ki te wāhanga i rēhitatia ai te mono, nō reira ka whakararuraru te mono-token anake ka tukuna ki `toCss` mā te tuhipoka, kaua ko te noho mokowā.

## Whakakotahitia ngā mono

Hangaia he whakawhānui i runga i tētahi mono kē mā `extendPlugin`, kia whakakotahitia rānei ngā hoa mā `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Ka whakakotahi ngā hooks o te wāhanga kotahi: ka whakahaere tuatahi te `tokens` i te turanga ā muri ake i te tāpiritanga, ka whakamōhio te `css` i ngā koha e rua, ā ka whakahaere rānei te `icons` i ngā mea e rua.

## Whakamātauria ngā putanga o tō mono

Whakahaerehia ngā tirohanga drift tūturu mai i `@pantoken/utils` i runga i ngā putanga o tō mono i roto i ōna whakamātautau, kia tere te kitea me te rohe mēnā he hapa tuhi, he ingoa token kua hurihia rānei:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Ngā mono kua kapi

- `@pantoken/plugin-simple-icons` — tohu waitohu mai i simple-icons, kua rēhitatia hei ngā token ā-tahua.
- `@pantoken/plugin-logos` — ngā tohu hua Instructure hei SVG, URI raraunga, me ngā token whakaahua `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — he mono PostCSS (ehara i te mono pantoken) e tango ana i ngā rawa ritenga-kāore i whakamahia i roto i tētahi tauira taitara.

He kōrero poto nō ētahi mea i noho hei mono, ināianei ka kawea i roto i `@pantoken/components`, i te mea he maha ngā wāhanga e hiahiatia ana i ngā taiao kē: ngā ārai atarangi elevation (`--instui-elevation-*`, i roto i `components.css`), te mekameka ā-āhua focus-outline (i roto i `base.css` — ka whakawhiwhia ki ia mea ka taea te aro kaua rānei mēnā ko pantoken te kaitiaki o te whārangi), me ngā momotuhi waitohu o Instructure (Atkinson Hyperlegible Next: `base.css` e tono ana i `--instui-font-family-base`; ko te kōwhiringa ake `@pantoken/components/fonts.css` e uta ana i ngā woff2s o `@font-face`).

Tirohia te [tuhinga API](/api/) mō ngā kaweake o ia mono.
