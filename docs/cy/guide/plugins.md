# Plwgins

Mae plwg pantoken yn estyn allbwn token neu CSS heb forcio pecyn. Adeiladwch un gyda
`definePlugin` o `@pantoken/plugin-kit`, yna pasiwch ef i `buildTokens` neu `toCss`.

## Awdur plug-in

Rhowch i `definePlugin` yr hooks rydych chi'n eu gweithredu. Mae'n dychwelyd plug-in arferol, wedi'i frandio gyda'r
galluedd a amcangyfrifwyd o'r hooks hynny. Gall plug-in ehangu'r IR (`tokens`, `icons`), allbwn y CSS
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

## Cofrestru sy'n ymwybodol o allu

Mae `buildTokens` a `toCss` yn rhedeg `checkPlugins` dros y plug-ins rydych yn eu pasio. Mae'n rhybuddio — ni fydd byth yn taflu —
pan nad oes hook yn cyfateb i'r cam y'i cofrestrwyd ynddo, felly caiff plug-in sy'n token-yn-unig a gafodd ei basio i `toCss` ei hepgor gyda nodyn yn lle peidio â gwneud dim yn dawel.

## Cyfansoddi plug-ins

Adeiladwch ar ben plug-in arall gyda `extendPlugin`, neu gyfuniwch gymheiriaid gyda `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Mae hooks un-cam yn cyfansoddi: mae `tokens` yn rhedeg y sylfaen yna'r atodiad, mae `css` yn uno'r ddau
gyfraniad, ac mae `icons` yn rhedeg y ddau.

## Dilyswch allbwn eich plug-in

Rhedwch y gwiriadau drift rhannol o `@pantoken/utils` dros allbwn eich plug-in eich hun yn ei brofiad, fel y bydd
teipograffeg neu botyn token a ail-enwyd yn methu'n gyflym ac yn leol:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Y plug-ins bundled

- `@pantoken/plugin-simple-icons` — brand icons o simple-icons, cofrestredig fel tokenau eicon.
- `@pantoken/plugin-lucide-lab` — eiconau Lucide Lab, cofrestredig fel tokenau delwedd `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos cynnyrch Instructure fel SVGs, URIau data, a tokenau delwedd `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — plug-in PostCSS (nid plug-in pantoken) sy'n tynnu
  perchnogion wedi'u marcio fel arall heb eu defnyddio o daflen arddull.
- `@pantoken/plugin-custom-theme-colors` — ail-frandio tudalen trwy osod un priodoledd
  (`data-pantoken-color`) i un o 13 palet, neu i `custom` ar gyfer unrhyw hex brand. Gweler
  [Lliwiau Thema](#theme-colors).

Gellir llwytho cofrestriad Lucide Lab yn hwyr, yna ei basio i'r hook token sy'n sync:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Ychydig o bethau a oedd yn plug-ins yn y gorffennol sy'n cael eu cynnwys yn awr yn `@pantoken/components`, gan fod cymaint o gydrannau yn eu hangen allan o'r bocs: cysgodion codiad (`--instui-elevation-*`, yn `components.css`), y cylch amlinell ffocws (yn `base.css` — mae pob elfen y gellir ei ffocysu yn ei chael pan fo pantoken yn berchen ar y dudalen), a'r ffontiau brand Instructure (Atkinson Hyperlegible Next: mae `base.css` yn cymhwyso `--instui-font-family-base`; mae `@pantoken/components/fonts.css` dewisol yn llwytho'r woff2s `@font-face`).

## Lliwiau thema {#theme-colors}

Mae `@pantoken/plugin-custom-theme-colors` yn allbynnu un bloc `[data-pantoken-color="…"]` fesul palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Mae pob bloc yn pwyntio'r rhagluniau brand (`--instui-primitive-color-navy-*` a `-blue-*`)
at y palet a ddewiswyd. Mae hefyd yn ail-aflewyrchu'r arwynebau brand a gafodd eu llunio i hexau llythrennol gan yr upstream,
gan gadw eu alfa pobedig drwy `color-mix()`. Mae lliwiau statws semantaidd, accent glas eglur, a
cysgodion codiad yn aros yn eu lle. Rhowch gynnig arno yn y
[demo themio seiliedig ar swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Lliw brand wedi'i bersonoli

Gosodwch `data-pantoken-color="custom"` i ail-frandio o unrhyw hex, megis y lliw primary y mae gweinyddwr Canvas
yn ei deipio i mewn i Olynyddwr y Thema. Mae pantoken yn deillio graddfa gyflawn 10–200 `--instui-primitive-color-custom-*`
ohono:

1. **Crwba cyfeirnod.** Mae goleuedd targed pob cam yn gyfartaledd goleuedd OKLCH y 13
   palet ar y cam hwnnw, gyda 0 wedi'i sefydlu ar wyn a 210 ar ddu. Felly mae lleoliad y graddfa wedi'i bersonoli
   yn cyfateb i leoliad y paletau a anfonwyd.
2. **Anchâr.** Mae'r mewnbwn yn disgyn ar y cam y mae goleuedd targed y cam hwnnw yn agosaf at ei un ei hun, yna'n plygu i
   'r union oleuedd hwnnw. Mae `#cccccc` yn dod yn `custom-40` ar `#c9c9c9`: yn agos at y mewnbwn, ond nid
   bob tro'n union yr un peth. Mae "agosaf" yn golygu'r cam agosaf ar y crwba, nid y lliw palet presennol agosaf.
3. **Llenwi.** Mae pob cam arall yn cadw cwmpas y mewnbwn. Mae ei atgyrffiad yn dilyn crwba cyffredin y paletau o ran yr ankâr, ac mae'n cael ei leihau yn unig pan fydd lliw y tu allan i sRGB.

Dim ond `#rgb` a `#rrggbb` sy'n cael eu derbyn; mae popeth arall yn taflu `TypeError`, felly ni all hex o ffurflen fewnbynnu fewnosod CSS.

Amser adeiladu, allbynwch y rheol gyfan gyda'r rhagluniau deilliedig eisoes wedi'u datgan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

I ddewis y lliw ar amser rhedeg heb longio'r set token, rhag-enwogwch y crwba a'r rheol ail-lunio wrth adeg adeiladu. Yna defnyddio'r mewnbwn dibyniaeth-amhrwm `/scale` yn y porwr, a gosod dim ond y 20
rhaglun derive:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Mae dewiswr thema safle'r ddogfen, olynydd thema Canvas, a'r demo uchod i gyd yn gweithio fel hyn.

Gweler yr [Cyfeirlyfr API](/api/) ar gyfer allforion pob plug-in.
