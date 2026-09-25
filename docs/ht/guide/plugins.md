# Plugin

Yon plugin pantoken elaji pwodiksyon token oswa CSS san li pa fè yon fork nan yon pake. Ou kreye youn ak `definePlugin` soti nan `@pantoken/plugin-kit`, epi pase li bay `buildTokens` oswa `toCss`.

## Ekri yon plugin

Bay `definePlugin` hooks ou aplike yo. Li retounen yon plugin nòmal, makonnen ak kapasite yo dedwi soti nan hooks sa yo. Yon plugin ka elaji IR la (`tokens`, `icons`), pwodiksyon CSS la (`css`), oswa tou de.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Enrejistreman ki konnen kapasite

`buildTokens` ak `toCss` kouri `checkPlugins` sou plugins ou pase yo. Li avèti — li pa janm jete — lè yon plugin pa gen okenn hook ki matche pou etap kote li anrejistre, konsa yon plugin sèlman-token pase bay `toCss` sote ak yon nòt olye ke li rete silansye san fè anyen.

## Konpoze plugins

Bati sou yon lòt plugin ak `extendPlugin`, oswa konbine parèy ak `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks menm-etap yo konpoze: `tokens` kouri baz la epi apre sa adisyon an, `css` mare de kontribisyon yo, epi `icons` kouri toude.

## Valide pwodiksyon plugin ou

Kouri chèk drift pataje yo soti nan `@pantoken/utils` sou pwodiksyon pwòp plugin nan nan tès li, konsa yon erè tipografik oswa yon token ki rebay non ap echwe vit epi lokal:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugins pre-anbale yo

- `@pantoken/plugin-simple-icons` — mak icon soti nan simple-icons, anrejistre kòm token icon.
- `@pantoken/plugin-lucide-lab` — icon Lucide Lab, anrejistre kòm `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — logo pwodwi Instructure kòm SVG, URI done, ak `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — yon plugin PostCSS (pa yon plugin pantoken) ki retire
  pwopriyete koutim ki pa itilize yo soti nan yon stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrand yon paj pa mete yon atribi
  (`data-pantoken-color`) sou youn nan 13 palèt, oswa sou `custom` pou nenpòt hex brand. Gade
  [Koulè tèm](#theme-colors).

Rejis Lucide Lab la ka chaje an lazy, epi pase bay hook senkron token la:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kèk bagay ki te konn plugin kounye a lage nan `@pantoken/components`, depi anpil konpozan bezwen yo soti nan bwat la: lonbraj elevation (`--instui-elevation-*`, nan `components.css`), bag focus-outline la (nan `base.css` — chak eleman ki ka resevwa fokus jwenn li lè pantoken posede paj la), ak polis brand Instructure yo (Atkinson Hyperlegible Next: `base.css` aplike `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` chaje `@font-face` woff2s yo).

## Koulè tèm

`@pantoken/plugin-custom-theme-colors` emèt yon blòk `[data-pantoken-color="…"]` pa palèt
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Chak blòk vize primitif brand yo (`--instui-primitive-color-navy-*` ak `-blue-*`)
sou palèt chwazi a. Li tou re-derive sifas brand yo ke upstream te aplati an hex literal,
kenbe alpha yo anrejistre atravè `color-mix()`. Koulè estati semantik, aksan ble eksplisit, ak
lonbraj elevation rete menm jan. Eseye li nan
[demo tèm sou baz swatch la](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Koulè brand koutim

Mete `data-pantoken-color="custom"` pou rebrand soti nan nenpòt hex, tankou koulè prensipal yon admin Canvas
tape nan Theme Editor la. pantoken derive yon echèl konplè 10–200 `--instui-primitive-color-custom-*`
soti ladan li:

1. **Koub referans.** Chak etap vize yon fè nwa (lightness) ki se mwayèn lightness OKLCH 13
   palèt yo nan etap sa a, ak 0 fikse sou blan ak 210 sou nwa. Se konsa espasman echèl koutim nan
   matche ak sa yo palèt ki voye.
2. **Ankr.** Antre a tonbe sou etap ki gen vize lightness ki pi pre pwòp li a, epi li snap nan
   lightness egzak sa a. `#cccccc` vin `custom-40` nan `#c9c9c9`: pre antre a, men pa
   toujou idantik. "Pi pre" vle di etap ki pi pre sou koub la, pa koulè palèt ki egziste ki pi pre a.
3. **Ranpli.** Chak lòt etap kenbe hue antre a. Saturation li swiv koub saturation mwayèn palèt yo relatif
   a ankr la, epi li redwi sèlman kote yon koulè depase espas sRGB.

Sèlman `#rgb` ak `#rrggbb` aksepte; nenpòt lòt bagay jete yon `TypeError`, konsa yon hex soti nan yon fòm
pa ka enjekte CSS.

Nan tan build la, emèt tout règleman an ak primitif derive yo deja deklare:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Pou chwazi koulè a nan runtime san voye ansanm set token yo, precompute koub la ak règle remap la nan tan build. Lè sa a, itilize antre san depandans `/scale` nan navigatè a, epi mete sèlman 20
primitif derive yo:

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

Chwaziè tèm sit dokiman an, editè tèm Canvas la, ak demo ki anwo a tout travay konsa.

Gade [referans API](/api/) pou ekspòtasyon chak plugin.
