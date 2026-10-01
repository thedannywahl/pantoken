# Cysylltwyr

Mae ategyn pantoken yn estyn allbwn token neu CSS heb forcio pecyn. Adeiladwch un gyda
`definePlugin` o `@pantoken/plugin-kit`, yna pasiwch ef i `buildTokens` neu `toCss`.

## Awdur ategyn

Rhowch i `definePlugin` y hogiau rydych chi'n eu gweithredu. Mae'n dychwelyd ategyn arferol, wedi'i frandio gyda'r
galluogion a amcangyfrifwyd o'r hogiau hynny. Gall ategyn estyn y IR (`tokens`, `icons`), allbwn y CSS
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

Mae `buildTokens` a `toCss` yn rhedeg `checkPlugins` dros yr ategion a basiwch. Mae'n rhybuddio — byth yn taflu —
pan nad oes hogyn cyfatebol i'r cam mae ategyn wedi'i gofrestru ynddo, felly bydd ategyn sy'n unig-i-token a basiwyd
i `toCss` yn cael ei hepgor gyda nodyn yn hytrach na pheidio wneud dim yn dawel.

## Cyfuno ategion

Adeiladwch ar ben ategyn arall gyda `extendPlugin`, neu gyfuniwch gyd-rymau gyda `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Mae hogiau yn yr un cam yn cyfuno: mae `tokens` yn rhedeg y sylfaen yna'r ychwanegiad, mae `css` yn uno'r ddwy
chyfraniad, ac mae `icons` yn rhedeg y ddau.

## Dilyswch allbwn eich ategyn

Rhedwch y gwirio trwyddedau rhannol o `@pantoken/utils` dros allbwn eich ategyn eich hun yn ei brawf, fel y
methuwch neu newidwyd enw token yn methu ar unwaith ac yn lleol:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Yr ategion wedi'u bundlu

- `@pantoken/plugin-simple-icons` — brandio eiconau o simple-icons, wedi'u cofrestru fel tokenau eicon.
- `@pantoken/plugin-lucide-lab` — eiconau Lucide Lab, wedi'u cofrestru fel tokenau delwedd `--instui-icon-*`.
- `@pantoken/plugin-logos` — logoau cynnyrch Instructure fel SVGs, Data URIs, a tokenau delwedd `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — ategyn PostCSS (nid ategyn pantoken) sy'n tynnu
  eiddo arferiad heb ei ddefnyddio o stylesheet.
- `@pantoken/plugin-custom-theme-colors` — ailfrandio tudalen trwy osod un priodoledd
  (`data-pantoken-color`) i un o 13 palette, neu i `custom` ar gyfer unrhyw hex brand. Gweler
  [Lliwiau Themâu](#theme-colors).
- `@pantoken/plugin-custom-components` — rheolyddion wedi'u cefnogi gan token gan gynnwys SegmentedControl
  a SkeletonLoader.

### Rheoli Rhannau

Defnyddiwch reoli rhannau ar gyfer dau i bum golygfa neu hidlydd cysylltiedig. Mae pob opsiwn yn radio brodorol wedi'i labelu mewn un grŵp enedigol; nodwch un wedi'i ddewis yn gychwynnol. Defnyddiwch dabiau neu ddewislen ostwng os na fydd yr opsiynau'n fitio'n gyfforddus, a defnyddiwch grwpiau botwm ar gyfer gweithredoedd yn hytrach na dewisiadau. Y ffordd `-size-md` yw'r diofyn, gyda `-size-sm` a `-size-lg` ar gyfer cyd-destunau mwy tynn a mwy amlwg.

Mewngludwch `@pantoken/plugin-custom-components/segmented-control.css` ar gyfer y rheolydd a'i botymau gorlifo.
Defnyddiwch ddosbarth `-icon-*` ar label segment pan fydd angen glyph ar y segment; mae'r cymorth rhyngweithio
yn hyrwyddo dosbarth `-icon-*` o'i fewnbwn brodorol i beintydd label.
Rhowch y fieldset enw disgrifiadol `aria-label` neu legend weladwy. Mae'r cymorth yn cadw'r
hysbysiad radio brodorol, yn ychwanegu llywio byrddorau, ac yn datgelu'n ddewisol un segment wedi'i dorri fesul pwyliog
llys-chwith. Defnyddiwch reolaethau dechrau/diwedd rhesymegol a labeli botwm hygyrch ym mhob cyfeiriad:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Mewngludwch `@pantoken/interactions/segmented-control.iife.js` ar gyfer cofrestru pan fo'r DOM yn barod, neu galwch
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` o `@pantoken/interactions`
a galwch `cleanup()` wrth ei dynnu. Mae'r CSS a'r dewisiadau radio brodorol yn gweithio heb JS; mae saethau gorlifo angen y rhanwedd. Mae'r eitem a ddewisir yn defnyddio cysyniad dwy-haen o gysgod dyluniad o'r lliwiau drop-shadow semantig; mae'n gysgod eitem-aktif gwahaniaethol yn hytrach na chyfansawdd `--instui-elevation-*` sydd eisoes. Mae botymau gorlifo yn defnyddio tocynnau cydran elevation3 uwch-lawr
drwy `--pantoken-segmented-overflow-shadow`.

### Llwytho Skeleton

Mae'r is-gyfeiriad `skeleton-loader.css` yn arddylunu un siâp Text, Avatar, neu Image addurnol. Mae Text yn derbyn
`-size-xxs` trwy `-size-xxl`; mae Avatar a Image yn feinclip. Mae pob `.skeleton-row` dewisol yn ychwanegu un llinell testun heb newid y maint. Mae'r sglein CSS yn stopio ar ôl tair swep 1.5 eiliad ac yn aros yn sefydlog pan fo'r defnyddiwr yn dewis symudedd lleihau. Mae'n gweithio cyn i JavaScript lwytho.

Rhowch siâpau lle bydd cynnwys dibynnol ar chwiliad yn ymddangos, nid dros lywio, hidlyddion, penawdau, neu reolaethau sy'n hysbys i'r gweinydd. Nid rhifydd cynnydd yw skeleton nac yw'n cyflwr prysur gweithred. Cadwch gynnwys presennol yn weladwy yn ystod diweddariadau cefndir; defnyddiwch spinner neu gyflwr prysur botwm ar gyfer gweithredoedd.

Perchnogion y cymhwysiad rhiant sy'n berchen ar marc-up llwytho, llwythwyd, gwag, ac gwall. Darparwch un rhan statws wag
fesul tudalen a rhybudd gwag ar wahân yn y HTML gweinydd, y ddau **YSTOD YN ALLAN** o'r rhan gynnwys prysur:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Galwch y rhanwedd lefel-rhiant pan fydd statws y cais yn newid. Mae'n diweddaru `aria-busy` a'r ddwy
hysbysiad sy'n bodoli eisoes, ond byth yn disodli cynnwys nac yn symud ffocws:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Os defnyddir pecyn rhyngweithio pob cydran yn hytrach na'r mewnforio uniongyrchol, dosbarthwch
ddigwyddiad `pantoken:skeleton-state` ar yr elfen `[data-skeleton-region]` gyda
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Oediwch cyn _dangos_ delfrydau 200–500ms ar gyfer ceisiadau cyflym; mae'r rhanwedd yn oedi hysbysiad llwytho yn annibynnol 400ms. Ar lwythi tudalen ddigyfaint, gadewch y ffocws lle mae e. Symudwch ffocws i ganlyniad newydd lwytho yn unig pan ofynnwyd i'r defnyddiwr ei gais. Mae'r nod statws yn hysbysu canlyniadau a chyflwrau gwag; mae'r nod rhybudd yn hysbysu methiannau. Peidiwch â chombinu `aria-busy`, `role="status"`, a
`role="alert"` ar un elfen.

Gellir llwytho registri Lucide Lab yn hwyr, yna pasio iddo i'r hogyn token sync:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Ychydig o bethau a gynt oedd yn ategion sy'n awr yn dod yn `@pantoken/components`, gan fod cymaint o gydrannau angen
eu trochi allan o'r blwch: cysgodau codiad (`--instui-elevation-*`, yn `components.css`), y cadwyn amlinelliad ffocws
(mewn `base.css` — mae pob elfen ffocws yn ei gael pan fo pantoken yn berchen ar y dudalen), a'r ffontiau brand
Instructure (Atkinson Hyperlegible Next: mae `base.css` yn cymhwyso `--instui-font-family-base`; mae'r
`@pantoken/components/fonts.css` dewisol yn llwytho'r woff2s `@font-face`).

## Lliwiau Themâu {#theme-colors}

Mae `@pantoken/plugin-custom-theme-colors` yn allyrru bloc `[data-pantoken-color="…"]` fesul palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Mae pob bloc yn pwyntio'r primitifau brand (`--instui-primitive-color-navy-*` a `-blue-*`)
at y palette a ddewiswyd. Hefyd mae'n ail-dderbyn y arwynebau brand a oedd i fyny'r ffynhonnell wedi'u gwastatáu i hex llythrennol,
gan gadw eu alffa wedi'u pobi trwy `color-mix()`. Mae lliwiau statws semantig, accentydd glas esboniadol, a
cysgodau codiad yn aros yn eu lle. Rhowch gynnig arni yn y
[demo themu seilec-wacl](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Lliw brand custom

Gosodwch `data-pantoken-color="custom"` i ail-frandio o unrhyw hex, megis y lliw cynradd y bydd gweinydd Canvas yn ei deipio yn Olygydd Themâu. Mae pantoken yn deillio graddfa `--instui-primitive-color-custom-*` gyflawn 10–200 oddi arno:

1. **Cromlin cyfeirnod.** Mae golau targed pob cam yn gyfartaledd golau OKLCH o'r 13
   palet ar y cam hwnnw, gyda 0 wedi'i sefydlogi ar wyn a 210 ar ddu. Felly mae gofod y graddfa custom yn cyfateb i'r rhai a anfonwyd.
2. **Anchr.** Mae'r mewnbwn yn plymio ar y cam sydd â golau targed agosaf i'w un ei hun, yna'n sgleinio i'r union olau hwnnw. Mae `#cccccc` yn mynd yn `custom-40` ar `#c9c9c9`: agos at y mewnbwn, ond nid bob amser yn yn union yr un peth. "Agosaf" yn golygu cam nesaf ar y cromlin, nid y lliw palet presennol agosaf.
3. **Llenwad.** Mae pob cam arall yn cadw disgleirdeb y mewnbwn. Mae'r dirlawnder yn dilyn cromlin cyfartalog y paletau yn gymharol i'r ancr, ac mae'n cael ei leihau dim ond lle mae lliw yn syrthio y tu allan i sRGB.

Dim ond `#rgb` a `#rrggbb` a dderbynnir; unrhyw beth arall yn taflu `TypeError`, felly ni all hex o ffurflen chwalu CSS.

Ar adeg adeiladu, allyrrwch y rheol gyfan gyda'r primitifau deilliedig eisoes wedi'u datgan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

I ddewis y lliw ar amser rhedeg heb anfon y set token, rhag-chyfrifwch y cromlin a'r rheol ail-gynllunio ar adeg adeiladu. Yna defnyddiwch yr enghraifft di-ddibyniaeth `/scale` yn y porwr, a gosodwch ond y 20
primitif deilliedig:

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

Mae dewiswr thema safle'r ddogfen, golygydd thema Canvas, a'r demo uchod i gyd yn gweithio fel hyn.

Gweler y [Cyfeirlyfr API](/api/) am allbynnau pob ategyn.
