# Plugin yo

Yon plugin pantoken elaji pwodiksyon token oswa CSS san poukisa pou kreye yon pake. Ou bati youn ak
`definePlugin` soti nan `@pantoken/plugin-kit`, epi pase li bay `buildTokens` oswa `toCss`.

## Ekri yon plugin

Bay `definePlugin` hook ou enplemante yo. Li retounen yon plugin nòmal, make ak
kapasite yo dedwi soti nan hook sa yo. Yon plugin ka elaji IR la (`tokens`, `icons`), pwodiksyon CSS la
(`css`), oswa toude.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Enskripsyon ki konsyan de kapasite

`buildTokens` ak `toCss` kouri `checkPlugins` sou plugin ou pase yo. Li avèti — li pa janm jete —
lè yon plugin pa gen okenn hook ki matche ak etap kote li anrejistre a, kidonk yon plugin sèlman-pou-token pase
bay `toCss` swa sote li ak yon nòt olye ke li fè anyen an silans.

## Konpoze plugin

Bati sou tèt yon lòt plugin ak `extendPlugin`, oswa konbine parèy ak `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook menm-etap konpoze: `tokens` kouri baz la apre sa adisyon an, `css` melanje de
kontribisyon yo, epi `icons` kouri toude.

## Valide pwodiksyon plugin ou a

Kouri chèk drift pataje yo soti nan `@pantoken/utils` sou pwodiksyon pwòp plugin ou nan tès li, konsa yon
typo oswa yon token ki rebaptize echwe rapidman epi lokalman:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin yo ki anbale yo

- `@pantoken/plugin-simple-icons` — make ikon ki soti nan simple-icons, anrejistre kòm token ikon.
- `@pantoken/plugin-logos` — logo pwodwi Instructure kòm SVG, URI done, ak `--instui-logo-*`
  token imaj.
- `@pantoken/plugin-prune-custom-props` — yon plugin PostCSS (pa yon plugin pantoken) ki retire
  pwopriyete koutim ki pa itilize nan yon fichye stil.

Gen kèk bagay ki te konn plugin kounye a ki voye ansanm nan `@pantoken/components`, paske anpil konpozan bezwen
yo depi nan bwat la: lonbraj elevation (`--instui-elevation-*`, nan `components.css`), bag
focus-outline la (nan `base.css` — chak eleman ki ka resevwa fokus resevwa li lè pantoken posede paj la), ak polis
brand Instructure yo (Atkinson Hyperlegible Next: `base.css` aplike `--instui-font-family-base`; opsyon `@pantoken/components/fonts.css` chaje `@font-face` woff2s yo).

Gade [referans API a](/api/) pou ekspòtasyon chak plugin.
