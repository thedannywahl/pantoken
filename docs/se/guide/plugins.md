# Pluggahtat

Pantoken-pluggahta eai dagahan token- dahje CSS-juvvon leat paketii fork­tin mihkke. Dávjá ovttas `definePlugin` boska `@pantoken/plugin-kit`-gii, ja vuolde geavahuvvo `buildTokens` dahje `toCss`.

## Oaidnit pluggahta

Lávvot `definePlugin` hookkat mii leat oaidnamin. Dat boađe vuolá ovttas normála pluggahta, brándahuvvan kapasiteta mii leat vuođđudit dahje hookkat. Pluggahta sáhttá extensiovat IR:n (`tokens`, `icons`), CSS-juvvon (`css`), dahje buot.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapasiteta‑oassin registeret

`buildTokens` ja `toCss` čállit `checkPlugins` plugin­dat mii leat vuolde. Dat varrá — ii háliidačuhttit — go pluggahta ii leat oainnuid hookka mii áiggun registrereaset váldit, nuppástus token‑maid ovttas `toCss` lea skippejuvvon mat čájehusa mas leat čađaid.

## Komposeer pluggahtat

Gávdno juovlla pluggahtan gullet `extendPlugin`-neavttaid, dahje mixat peer­dat `mergePlugin`-in:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Sama‑staga hookkat compose: `tokens` čállá basalt ja dálju, `css` jođá duo­rehit duo contributiona, ja `icons` čállá buot.

## Validere pluggahtan juvvon

Geavat dallát drift‑checks mii leat `@pantoken/utils` plugin­dan ožžojuvvon testas, nu go vásttumiida dahje renamede token cuoŋomuššii fal leat vuolgi:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Bundeavduš pluggahtat

- `@pantoken/plugin-simple-icons` — brand‑ikonat ovttas simple-icons, registrereda gaskkas ikon‑tokena.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonat, registrereda geatnega `--instui-icon-*` image‑tokena.
- `@pantoken/plugin-logos` — Instructure‑produktas logoa SVG:na, data URI:na, ja `--instui-logo-*` image‑tokena.
- `@pantoken/plugin-prune-custom-props` — PostCSS pluggahta (ii lea pantoken‑pluggahta) mii gávdno vuođđudit
  ii geavahit custom properties Čállingi mas.
- `@pantoken/plugin-custom-theme-colors` — rebrand‑it sidju ovddas hállat nuppi attributta
  (`data-pantoken-color`) muhto ovttas 13 palettea­in, dahje `custom` main brand hex. Oaidna
  [Theme colors](#theme-colors).

Lucide Lab registrija sáhttá load:et lazila, dahje vuolde paserat sín synchrono­se token‑hooktiin:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Muhtun­min leat pluggahtain maid leat dahkan mii dál lean `@pantoken/components` almmuheapmi, go golmma komponenta háliidat dakkár out‑of‑box: elevation‑shadows (`--instui-elevation-*`, `components.css`), focus‑outline ring (in `base.css` — buot fokuserbbárat árvvo dáhko go pantoken ovddid sidju), ja Instructure brand‑fontat (Atkinson Hyperlegible Next: `base.css` aptá `--instui-font-family-base`; opt‑in `@pantoken/components/fonts.css` load:e `@font-face` woff2:t).

## Theme colors

`@pantoken/plugin-custom-theme-colors` gávdno okta `[data-pantoken-color="…"]` blokka palette‑máilbmái
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Buot blokka juhkát brand‑primitivvaid (`--instui-primitive-color-navy-*` ja `-blue-*`)
ahleahkit vuosttažat palette. Dat jus re‑deriva­doo brand‑surfaceat mii upstreamis flat:ada literála hex:ksi,
ja leat bearjad alpha vuostta `color-mix()`. Semantala status‑várdát, ekspliciita buorre sinivuođa accentat, ja elevation‑shadows
sihke golgget. Geavaheapmi demo duovttadit [swatch‑based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Čállit custom brand color

Hállát `data-pantoken-color="custom"` rebrand:dit goččui hex:ta, nugo primár color mii Canvas admin
gáibida Theme Editor:s. pantoken derivra buot 10–200 `--instui-primitive-color-custom-*`
scale:na dán:

1. **Reference curve.** Buot step:iin target lightness lea OKLCH lightness average 13
   palettea­in step:s, 0 fiksalaš vuođđun valge ja 210 fiksalaš vuođđun čáhci. Nuppástus custom scale:s rūmmet
   match:it šaddan paletteaide.
2. **Anchora.** Input lascha step:in mii target lightness lea najnjárlaš sua diva, dađistaga dáppe
   dahkat exact lightness. `#cccccc` lea `custom-40` at `#c9c9c9`: njuolga input:ii, muhto ii
   olbmui čállán. "Najnjárlaš" mearkka nearest step curve:s, ii closest existing palette color.
3. **Fill.** Buot muođi step dihtii input:in hue. Saturation suobbadit paletteaide average
   saturation curve:in relativa anchor:in, ja leat boŋkkat jus color čuovvut sRGB:st.

Oonly `#rgb` ja `#rrggbb` leat hyväksyhte; muhto muđui ledje `TypeError`, nu hex form:as
kin dálkke CSS:ii inject:e.

At build time, gávdno buot rule derivahtala primitiva­id čállimušat:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Vallje color runtime:s ilman token‑set:iin shiptonu, precompute:it curve ja remap
rule at build time. Dás geavahuvvo dependency‑free `/scale` entry in browser:s, ja hállát šaddet duvtten 20
derivahta primitiva:

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

Docs site:s theme picker, Canvas theme editor, ja demo maiddái boahtte ovddit dán máŋggabealde.

Oaidna [API reference](/api/) buot pluggahtain exports.
