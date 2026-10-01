# Plugins

Pantoken-plugin dovddabuvvut token- dahje CSS-šaddat go galgá leat maŋimuš pakta ovdal. Dásvuođas leat ealáhus `definePlugin` dávjá `@pantoken/plugin-kit`, de geavahaid `buildTokens` dahje `toCss`.

## Ruvvot plugin

Give `definePlugin` hookkat mii dutnje. Son boađeha normála plugin, brändtuvvon čujuhusas dahje capability-birra mii leat vuoigŋat hookkain. Plugin sáhtá extends IR (`tokens`, `icons`), CSS-šaddat (`css`), dahje boahtteáiggis ruovttut.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Capability-birra registrerejuvvon

`buildTokens` ja `toCss` čuovvut `checkPlugins` čađa plugins mii don geavahat. Sii gávdno — ii leat mainna áiggáda —
go plugin johtá ii buorre hook mii stagaáššii, nu ahte token-dansse plugin mii leat árvvojuvvon `toCss` leat ohppat seappot muhto háliida juo movttaš.

## Komponere pluginat

Báhppeahttan eará pluginin otná `extendPlugin`, dahje čalmmuheapmi peers -ráddjiid `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Sama-áššis hookkat komponere: `tokens` geavahá almmolaš ja deaddit, `css` bođá dat ruovttut, ja `icons` geavahá guokte.

## Validere pluginas output

Geavaheapmi maid leat shareddat drift-checksat `@pantoken/utils` pluginas otná output testta, nu go typo dahje tokenin namma válddá fast ja lokaala:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Bundlede pluginat

- `@pantoken/plugin-simple-icons` — brand-ikonat simple-icons-máŋga, registrerejit ikontokenain.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonat, registrerejit `--instui-icon-*` image-tokenain.
- `@pantoken/plugin-logos` — Instructure-produkta logoat sániin SVG:s, data-URI:in ja `--instui-logo-*` image-tokenain.
- `@pantoken/plugin-prune-custom-props` — PostCSS-plugin (ii leat pantoken-plugin) mii gávdno
  unstallan custom-properties bihtat stylesheeta.
- `@pantoken/plugin-custom-theme-colors` — rebrand-ábmi sivvii birra geavaheapmát attributta
  (`data-pantoken-color`) ovtta 13 palettas, dahje `custom` buot brand-hex:iin. Geavat
  [Theme colors](#theme-colors).
- `@pantoken/plugin-custom-components` — token-backede custom-controls mii leat SegmentedControl
  ja SkeletonLoader.

### Segmented control

Geavahá segmented-control dássideaset guokte–viessu rievdagaid dahje filterain. Buot option leat labellaš nativ radio oktavuođas ovtta namma gruppas; markere ovtta checked almmuhus. Geavahá tabs dahje dropdown muhto datáigalat ii ožžon riikka, ja geavahá button-groups actionain valguin maid ii leat váldiid. `-size-md` style lea default, `-size-sm` ja `-size-lg` leat válddii ja nuorra kontekstta.

Import `@pantoken/plugin-custom-components/segmented-control.css` controla ja overflow
buttonaid. Geavahá `-icon-*` class segment-label:in go segment dovddabuvvo glyph; interaction-helper sáhtá promot-tovat `-icon-*` class nativ input:sta label-painter:in. Dovddabuvvo fieldset:ii deskriptiva `aria-label` dahje visibella legend. Helper preserve-radio-announcema, addit tastatuvrran navigation, ja valjuhuvvo ovdal ovddas segment mainna arrow-press:s. Geavahá lohppi/alkku-controls ja accessible button-labels illud dáhpáhusin:

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

Import `@pantoken/interactions/segmented-control.iife.js` DOM-ready registrerejuvvon, dahje ja `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` `@pantoken/interactions`
ja ja `cleanup()` mii leat čuohppán go sierra. CSS ja nativ radio valinnat leat toimihit ilman JS; overflow-arrowat geavahá behaviore. Valitnut elementta geavahá guokte-layer design-shadow semantic
drop-shadow color:in; das lea eret active-item shadow iiklus `--instui-elevation-*` composite. Overflow-buttonat geavahá upstream elevation3 component tokenaid
duohtava `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

`skeleton-loader.css` subpath stylis ovtta dekoratiivvan Text, Avatar, dahje Image muohttu. Text válddá `-size-xxs` duohta `-size-xxl`; Avatar ja Image lea medium-sized. Buot optional `.skeleton-row`
addit ovtta tekst-rivi sizea ii váldit. CSS shimmer dahká gávdno golgoluovtta gisttut 3 x 1.5-sekunda sweepeat ja stihká stabiila go user preferre reduce motion. Dat toimihit elő JavaScript loada.

Akkat muohttut dan maid content manná query-biras, ii server-bekkal navigasuvnna, filteraid, headinga dahje controls ruovttut. Skeleton ii lea progress-meter dahje action-busy state. Leage existing content visibella background-refreshide gaskkas; geavahá spinner dahje button-busy state actionaide.

Parent application owns loading, loaded, empty, ja error markup. Providea ovtta empty status region per sivva ja eret empty alert in server HTML, buot **outside** busy content region:

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

Kutsuh parent-level behaviore go request-state čuohppá. Mus lea updates `aria-busy` ja guokte
pre-existing announcements, muhto ii replace:e content dahje movtut focus:

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

Jos geavahát per-component interactions bundle direct import:in, dispatch `pantoken:skeleton-state` event `[data-skeleton-region]` element:as `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Delay _showing_
placeholders 200–500 ms fast requests; behavior delay:doa independenttas loading-announcement 400 ms. Pasivala sivva-loadaide, leaves focus mii leat. Lihttii movtut focus juovllat loadde result mii user áigida dát action. Status-node announces results ja empty-states; alert-node announces failures. Don ii galggašat kombine `aria-busy`, `role="status"`, ja
`role="alert"` ovtta elementta.

Lucide Lab registry sáhtá loadet lazily, de geavahá synchroonala token-hook:in:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muitu mii leat boddu plugin:at dál shippešit `@pantoken/components`:ii lea maid komponentaid jurdagiid dat mii dárbbašit otná: elevation-shadows (`--instui-elevation-*`, in `components.css`), focus-outline
ring (in `base.css` — buot focusable gávnná das go pantoken omáhii sivva), ja Instructure brand
fonts (Atkinson Hyperlegible Next: `base.css` applie-r `--instui-font-family-base`; opt-in
`@pantoken/components/fonts.css` load:á `@font-face` woff2s).

## Theme colors {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emits ovtta `[data-pantoken-color="…"]` block per palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Buot block jođii brand-primitives (`--instui-primitive-color-navy-*` ja `-blue-*`)
ovttas davvis palettas. Dat re-deriva brand-surfaces mii upstream flatten:did literal hex:s,
sohkádat geavahá baked alpha duohta `color-mix()`. Semantic status colors, explicit blue accents, ja
elevation-shadows leat ovttas. Geavahá demonstras [swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Custom brand color

Set `data-pantoken-color="custom"` rebrand:it dahje buot hex:in, nugo primár color Canvas admin
typá Theme Editor:in. pantoken derive:á full 10–200 `--instui-primitive-color-custom-*`
scale daga:

1. **Reference curve.** Buot step:in target lightness lea OKLCH lightness average 13
   palettes:s ovttas step, 0 fixerat white ja 210 black. Dáid custom-scale spacing
   matches shipped palettes'.
2. **Anchor.** Input lása step:as mii target lightness lea násttas siiddat, de snappa dát eksakt lightness. `#cccccc` becomes `custom-40` at `#c9c9c9`: doalvvut input, muhto ii luônná identical. "Násttas" mearkkađii násttas step curve:s, ii existing palette color.
3. **Fill.** Buot eará step keep:á input hue. Saturation seuraa palettes' average
   saturation curve relativt anchor:in, ja leat válddán doarbba šat go color manná oater sRGB:sta.

Dán leat barggusat: `#rgb` ja `#rrggbb` leat áiggán; muhto eará allraid throw `TypeError`, nu go hex form:as ii sáhttá inject CSS.

Build-time: emit whole rule meara derived-primitives dihtii deklareredit:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Runtime pick color without shipping whole token-set: precompute curve ja remap-rule build-time:s. De geavahá dependency-free `/scale` entry browser:as, ja settah geavahá ollu 20
derived-primitives:

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

Docs-site theme picker, Canvas theme editor, ja demonstrá ovddas leat toimihit dasvuođas.

Geavahá [API reference](/api/) pluginain exportsain.
