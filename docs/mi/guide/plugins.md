# Mōhanga

He whānui ake te mono pantoken (plugin) i ngā tohu (tokens) rānei i te putanga CSS me te kore whakakapinga (fork) i tētahi kete. Ka hangaia tētahi mā `definePlugin` nō `@pantoken/plugin-kit`, ā, ka tukuna ki `buildTokens` rānei `toCss`.

## Tuhia he mono

Homai ki `definePlugin` ngā pūtau (hooks) ka mahia e koe. Ka hoki mai he mono noa, ā, kua tohu i ngā āheatanga i kitea i aua pūtau. Ka taea e tētahi mono te whakawhānui i te IR (`tokens`, `icons`), te putanga CSS (`css`), rānei ngā rāua tahi.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rehitatanga mō te mōhiotanga āheatanga

Ka whakahaerea e `buildTokens` me `toCss` te `checkPlugins` i runga i ngā mono ka tukuna e koe. Ka whakatūpato — kāore rawa e whakatārewa (throw) — mēnā kāore he pūtau e hāngai ana ki te taahinga (stage) i rehitatia ai, nā reira ka kauwhakāritia tētahi mono-takirua-tokens (token-only plugin) ka tukuna ki `toCss` me tētahi whakamārama hei utu mō te kore mahi ā-roro (silently doing nothing).

## Whakakotahitia ngā mono

Hangaia i runga i tētahi mono kē mā `extendPlugin`, kia hono rānei ngā hoa mā `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Ka whakakotahitia ngā pūtau o taua taahinga: ka whakahaere tuatahi te pūtake, katahi ka te tāpiritanga mā `tokens`, ka whakakotahi ngā koha e rua mā `css`, ā, ka whakahaere rāua e rua mā `icons`.

## Whakamana i te putanga o tō mono

Mahia ngā tirohanga drift e wātea ana i `@pantoken/utils` ki runga i te putanga o tō mono i roto i āna whakamātautau, kia tere tonu te hinga o tētahi hapa tuhituhi rānei te ingoa token kua huri:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Ngā mono kua piri wātea

- `@pantoken/plugin-simple-icons` — tohu ā-mata (brand icons) mai i simple-icons, kua rehitatia hei tohu icon.
- `@pantoken/plugin-lucide-lab` — tohu Lucide Lab, kua rehitatia hei `--instui-icon-*` tohu ā-whakaahua (image tokens).
- `@pantoken/plugin-logos` — tohu hua Instructure hei SVG, URI raraunga, me ngā `--instui-logo-*`
  tohu ā-whakaahua.
- `@pantoken/plugin-prune-custom-props` — he mono PostCSS (ehara i te mono pantoken) e tango ana i ngā rawa kore whakamahia o ngā rawa ritenga (custom properties) i tētahi takai kāri (stylesheet).

Ka taea te uta whakaroa (lazy) i te rēhita o Lucide Lab, ā, ka tukuna ki te pūtau token sync:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

He rārangi kōrero: kua tāpirihia ki `@pantoken/components` ētahi mea i mua i noho hei mono, nō te mea e hia rau ngā wāhanga e hiahiatia ana ēnei mai i te tīmatanga: ngā ātaahua ānau pikinga (elevation shadows) (`--instui-elevation-*`, kei roto i `components.css`), te porotaka arotahi (focus-outline) (kei roto i `base.css` — ka whiwhi ia mea ka taea te aro katoa ina rangatiratia e pantoken te whārangi), me ngā momotuhi ā-takakau Instructure (Atkinson Hyperlegible Next: `base.css` tāpaea `--instui-font-family-base`; ko te kōwhiringa `@pantoken/components/fonts.css` ka uta i ngā woff2 `@font-face`).

Tirohia te [tohutoro API](/api/) mō ngā kaweake (exports) o ia mono.
