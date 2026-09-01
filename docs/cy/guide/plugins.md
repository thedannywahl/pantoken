# Ategion

Ategyn pantoken yn estyn y allbwn token neu CSS heb fforkio pecyn. Adeiladwch un gyda
`definePlugin` o `@pantoken/plugin-kit`, yna pasiwch ef i `buildTokens` neu `toCss`.

## Ysgrifennu ategyn

Rhowch i `definePlugin` y hooks rydych yn eu gweithredu. Mae'n dychwelyd ategyn arferol, wedi'i frandio gyda'r
capasiti a amcangyfrifwyd o'r hooks hynny. Gall ategyn estyn y IR (`tokens`, `icons`), yr allbwn CSS
(`css`), neu'r ddau.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Cofrestru sy'n ymwybodol o alluoedd

`buildTokens` a `toCss` yn rhedeg `checkPlugins` dros yr ategion a basiwch. Mae'n rhybuddio — byth yn taflu —
pan nad oes hook cyfatebol gan ategyn ar gyfer y cam y mae wedi'i gofrestru ynddo, felly ategyn sy'n unig-token a basiwyd
i `toCss` yw ei basio heibio gyda nodyn yn hytrach na ddim ei wneud yn ddienw.

## Cyfansoddi ategion

Adeiladu ar ben ategyn arall gyda `extendPlugin`, neu gyfuno cydymaith gyda `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Mae hooks ar yr un cam yn cyfansoddi: `tokens` yn rhedeg y sylfaen yna'r ychwanegiad, `css` yn uno'r ddwy
chyfraniad, a `icons` yn rhedeg y ddau.

## Dilysu allbwn eich ategyn

Rhedwch y gwiriadau drifft rhannol o `@pantoken/utils` dros allbwn eich ategyn eich hun yn ei brofion, fel y
methiant o achos sillafu neu enwi token yn newid yn methu'n gyflym ac yn lleol:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Y ategion wedi'u bundio

- `@pantoken/plugin-simple-icons` — brandio eiconau o simple-icons, wedi'u cofrestru fel tokenau eicon.
- `@pantoken/plugin-logos` — logoau cynnyrch Instructure fel SVGs, URI data, a thokenau delwedd `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — ategyn PostCSS (nid ategyn pantoken) sy'n tynnu
  eiddo arferol heb ei ddefnyddio o arddullfaen.

Ychydig o bethau a werthodd fel ategion yn awr yn cael eu llongio yn `@pantoken/components`, gan fod cymaint o gydrannau yn eu hangen allan o'r blwch: cysgodion codiad (`--instui-elevation-*`, yn `components.css`), y cylch amgylch-ffocws
(yn `base.css` — mae pob elfen y gellir ei ffocysu yn ei gael pan fo pantoken yn berchen ar y dudalen), a'r ffynonellau brand Instructure
(Atkinson Hyperlegible Next: mae `base.css` yn cymhwyso `--instui-font-family-base`; mae'r `@pantoken/components/fonts.css` dewisol yn llwytho'r `@font-face` woff2s).

Gweler yr [adroddiad API](/api/) ar gyfer allforion pob ategyn.
