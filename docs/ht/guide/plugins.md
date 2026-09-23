# Plugin

Yon plugin pantoken elaji pwodiksyon token oswa CSS san li pa kreye yon fork pakè a. Ou bati youn ak
`definePlugin` soti nan `@pantoken/plugin-kit`, epi pase li bay `buildTokens` oswa `toCss`.

## Ekri yon plugin

Bay `definePlugin` hook ou implemante yo. Li retounen yon plugin nòmal, make ak
kapasite yo dedwi soti nan hook sa yo. Yon plugin ka elaji IR la (`tokens`, `icons`), pwodiksyon CSS la
(`css`), oswa toulede.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Enskripsyon sans-kapasite

`buildTokens` ak `toCss` kouri `checkPlugins` sou plugins ou pase yo. Li avèti — li pa janm jete —
lè yon plugin pa gen okenn hook ki koresponn ak etap li enskri a, konsa yon plugin ki sèlman pou token pase
bay `toCss` va sote ak yon nòt olye li fè anyen san son.

## Konpoze plugins

Bati sou yon lòt plugin ak `extendPlugin`, oswa konbine kòlèg ak `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook ki nan menm etap konpoze: `tokens` kouri baz la epi apre sa adisyon an, `css` mare de
kontribisyon yo, epi `icons` kouri toulede.

## Valide pwodiksyon plugin ou a

Kouri chèk drift pataje yo soti nan `@pantoken/utils` sou pwodiksyon plugin ou a nan tès li a, konsa yon
tipò oswa yon token ki chanje non ap echwe rapidman e lokalman:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin yo pake ansanm

- `@pantoken/plugin-simple-icons` — make ikon soti nan simple-icons, enskri kòm token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, enskri kòm token imaj `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo pwodwi Instructure kòm SVG, URI done, ak token imaj `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — yon plugin PostCSS (pa yon plugin pantoken) ki retire
  pwopriyete koutim ki pa itilize nan yon fichye stil.

Rejistrè Lucide Lab la ka chaje apati, epi apre sa pase bay hook token sinchrone a:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kèk bagay ki te anvan plugin kounye a anbake nan `@pantoken/components`, paske anpil konpozan bezwen
yo soti nan bwat la: lonbraj elevation (`--instui-elevation-*`, nan `components.css`), bag ring outline pou fokus
(nan `base.css` — chak eleman fokisabl resevwa li lè pantoken posede paj la), ak polis mak
Instructure yo (Atkinson Hyperlegible Next: `base.css` aplike `--instui-font-family-base`; opsyon `@pantoken/components/fonts.css` chaje
woff2 `@font-face` yo).

Gade [referans API a](/api/) pou ekspòtasyon chak plugin.
