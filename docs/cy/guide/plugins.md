# Plwyfau

Mae plwg pantoken yn estyn y token neu allbwn CSS heb forcio pecyn. Adeiladair un gyda
`definePlugin` o `@pantoken/plugin-kit`, yna pasiwch ef i `buildTokens` neu `toCss`.

## Awturwch blwg

Rhowch i `definePlugin` y clystyrau (hooks) rydych chi’n eu gweithredu. Mae’n dychwelyd plwg arferol, wedi’i frandio gyda’r
galluoedd a ganfuwyd o’r clystyrau hynny. Gall plwg estyn y IR (`tokens`, `icons`), allbwn y CSS
(`css`), neu’r ddau.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Cofrestru sy’n ymwybodol o alluoedd

Mae `buildTokens` a `toCss` yn rhedeg `checkPlugins` dros y phlwygiau rydych chi’n eu pasio. Mae’n rhybuddio — ni wnaiff byth daro —
pan nad oes clustyn cyd-fynd gyda’r cam y mae plwg wedi’i gofrestru ynddo, felly caiff plwg sy’n ymwneud â thoken yn unig a gafodd ei basio
i `toCss` ei hepgor gyda nodyn yn hytrach na pheidio wneud dim yn dawel.

## Cyfuno phlwygiau

Adeiladwch ar ben plwg arall gyda `extendPlugin`, neu gyfuniwch gymrodyr gyda `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Mae clystyrau ar yr un cam yn cyfuno: mae `tokens` yn rhedeg y sail yna ychwanegiad, mae `css` yn uno’r ddwy
chyfraniad, ac mae `icons` yn rhedeg y ddau.

## Dilyswch allbwn eich plwg

Rhedwch y gwiriadau drift rhannol o `@pantoken/utils` dros allbwn eich plwg eich hun yn ei brof, fel y bydd
camdeip neu enwi token yn methu’n gyflym ac yn lleol:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Yr plwgiau wedi’u pecynnu

- `@pantoken/plugin-simple-icons` — brand eiconau o simple-icons, wedi’u cofrestru fel tokenau eicon.
- `@pantoken/plugin-lucide-lab` — eiconau Lucide Lab, wedi’u cofrestru fel tokenau delwedd `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos cynnyrch Instructure fel SVGs, URI data, a thokenau delwedd `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — plwg PostCSS (nid plwg pantoken) sy’n tynnu
  eiddo arfer wedi’u difetha o sheet steilio.

Gellir llwytho’r gofrestr Lucide Lab yn hwyr, yna ei basio i’r clustyn token synchronic:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Ychydig o bethau a fu’n blwgion erbyn hyn yn dod yn rhan o `@pantoken/components`, gan fod cymaint o gydrannau yn eu angen allan o’r bocs: cysgodion codiad (`--instui-elevation-*`, yn `components.css`), y rîng llinell-canol ffocws
(mewn `base.css` — mae pob elfen y gellir ei ffocuso yn ei gael pan fo pantoken yn berchen ar y dudalen), a’r ffontiau brand Instructure
(Atkinson Hyperlegible Next: mae `base.css` yn cymhwyso `--instui-font-family-base`; mae’r `@pantoken/components/fonts.css` dewisol yn llwytho’r woff2s `@font-face`).

Gweler y [cyfeirlyfr API](/api/) am allfeydd pob plwg.
