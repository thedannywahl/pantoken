# Plugin

Yon plugin pantoken elaji sòti token oswa pwodiksyon CSS san kreye yon pakè nouvo. Ou bati youn ak
`definePlugin` soti nan `@pantoken/plugin-kit`, epi pase li bay `buildTokens` oswa `toCss`.

## Ekri yon plugin

Bay `definePlugin` krochi (hooks) ou aplike yo. Li retounen yon plugin nòmal, make ak
kapasite yo dedui soti nan krochi sa yo. Yon plugin ka elaji IR la (`tokens`, `icons`), pwodiksyon CSS la
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

## Enskripsyon ki konnen kapasite

`buildTokens` ak `toCss` kouri `checkPlugins` sou plugins ou pase yo. Li avèti — li pa janm jete eksepsyon —
lè yon plugin pa gen krochi ki matche ak etap kote li anrejistre, konsa yon plugin sèlman-token pase
bay `toCss` pral eskli ak yon nòt olye pou l pa fè anyen san son.

## Konpoze plugins

Bati sou yon lòt plugin ak `extendPlugin`, oswa konbine parèy ak `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Krochi menm-etap konpoze: `tokens` kouri baz la epi apre sa adisyon an, `css` melanje de
kontribisyon yo, epi `icons` kouri toulede.

## Valide pwodiksyon plugin ou

Kouri tchek drift pataje yo soti nan `@pantoken/utils` sou pwodiksyon pwòp plugin ou nan tès li, konsa yon
erè tipografik oswa yon token ki chanje non echwe rapidman ak lokalman:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugins entegre yo

- `@pantoken/plugin-simple-icons` — make ikon soti nan simple-icons, anrejistre kòm token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, anrejistre kòm token imaj `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo pwodwi Instructure kòm SVG, data URI, ak token imaj `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — yon plugin PostCSS (pa yon plugin pantoken) ki retire
  pwopriyete koutim ki pa itilize nan yon stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrand yon paj pa mete yon atribi
  (`data-pantoken-color`) sou youn nan 13 palèt, oswa sou `custom` pou nenpòt hex mak. Gade
  [Koulè tèm](#theme-colors).
- `@pantoken/plugin-custom-components` — kontwòl koutim soutni pa token ki enkli SegmentedControl
  ak SkeletonLoader.

### Kontwòl segmante

Sèvi ak yon kontwòl segmante pou de a senk vi oswa filtè ki gen rapò. Chak opsyon se yon radio natif natal etikete nan yon gwoup nonmen; make youn tcheke inisyalman. Sèvi ak onglet oswa yon dropdown si opsyon yo pap anfòm konfòtabman, epi itilize gwoup bouton pou aksyon olye pou chwa. Estil `-size-md` la se default la, ak `-size-sm` ak `-size-lg` pou kontèks ki pi sere ak pi pwoeminen.

Enpòte `@pantoken/plugin-custom-components/segmented-control.css` pou kontwòl la ak bouton debòde li yo. Itilize yon klas `-icon-*` sou yon etikèt segman lè segman an bezwen yon glif; èd entèraksyon an pèmèt tou yon klas `-icon-*` soti nan input natif natal la rive sou penti etikèt la. Bay fieldset la yon `aria-label` deskriptif oswa yon lejand vizib. Èd la prezève anonse radio natif natal la, ajoute navigasyon klavye, epi opsyonèlman revele youn segman koupe pa peze flèch. Sèvi ak kontwòl kòmansman/fen lojik ak etikèt bouton aksesib nan toude direksyon:

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

Enpòte `@pantoken/interactions/segmented-control.iife.js` pou enskripsyon lè DOM la pare, oswa rele
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` soti nan `@pantoken/interactions`
epi rele `cleanup()` lè w retire li. CSS la ak chwa radio natif natal yo mache san JS; flèch debòde bezwen konpòtman an. Atik chwazi a itilize lonbraj konsepsyon de-kouch nan koulè semantic drop-shadow yo; li se yon lonbraj atik-aktif distenk olye yon konpoze `--instui-elevation-*` ki egziste deja. Bouton debòde yo itilize token elemasyon elevation3 orijin nan
atravè `--pantoken-segmented-overflow-shadow`.

### Chajman eskeleton

Subchemen `skeleton-loader.css` la stile yon sèl fòm dekoratif Text, Avatar, oswa Image. Text aksepte
`-size-xxs` atravè `-size-xxl`; Avatar ak Image yo gwosè mwayen. Chak `.skeleton-row` opsyonèl
ajoute yon liy tèks san chanje gwosè a. Shimmer CSS la sispann apre twa pasaj 1.5-segonn epi rete estatik lè itilizatè a prefere mouvman redwi. Li mache anvan JavaScript chaje.

Plase fòm sèlman kote kontni depandan sou demann pral parèt, pa sou navigasyon, filtè, tit, oswa kontwòl ki deja konnen sou sèvè a. Yon eskeleton se pa yon mezi pwogrè oswa yon eta okipe pa aksyon. Kenbe kontni ki egziste vizib pandan rafrechisman an dèyè; itilize yon spinner oswa yon eta bouton okipe pou aksyon.

Aplikasyon paran an posede markup loading, loaded, empty, ak error. Bay yon sèl rejyon estati vid pa paj ak yon alèt vid apa nan HTML sèvè a, toulede **DEYÒ** rejyon kontni okipe a:

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

Rele konpòtman nivo-paran an lè eta demann lan chanje. Li mete ajou `aria-busy` ak de
anonse deja egzistan yo, men li pa janm ranplase kontni oswa deplase konsantrasyon:

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

Si w ap itilize pake entèraksyon pou chak konpozan olye enpòtasyon dirèk, voye yon evènman
`pantoken:skeleton-state` sou eleman `[data-skeleton-region]` avèk
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Rete tann anvan montre
placeholders pa 200–500ms pou demann rapid; konpòtman an anndan li retade anonse loading lan pa 400ms. Sou chaj paj pasif, kite konsantrasyon kot li ye. Sèlman deplase konsantrasyon sou yon rezilta ki fèk chaje lè aksyon itilizatè a te mande li. Nœud estati a anonse rezilta ak eta vid; nœud alèt la anonse echèk. Pa konbine `aria-busy`, `role="status"`, ak
`role="alert"` sou yon sèl eleman.

Rejis Lucide Lab la ka chaje pa demand, epi pase nan krochi token senkron:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Kèk bagay ki te konn yon fwa plugin kounye a voye nan `@pantoken/components`, paske anpil konpozan bezwen yo soti nan bwat la: lonbraj elevasyon (`--instui-elevation-*`, nan `components.css`), bag limit-fokal la (nan `base.css` — chak eleman kapab jwenn li lè pantoken posede paj la), ak polis mak Instructure yo (Atkinson Hyperlegible Next: `base.css` aplike `--instui-font-family-base`; opt-in
`@pantoken/components/fonts.css` chaje `@font-face` woff2s yo).

## Koulè tèm

`@pantoken/plugin-custom-theme-colors` emèt yon blòk `[data-pantoken-color="…"]` pa palèt
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Chak blòk vize primitiv mak la (`--instui-primitive-color-navy-*` ak `-blue-*`)
sou palèt chwazi a. Li re-derive tou sifas mak yo ke orijin te platifye kòm hex literal,
kenbe alfa yo deja kwit atravè `color-mix()`. Koulè estati semantik, aksan ble eksplisit, ak
lonbraj elevasyon rete an plas. Eseye li nan
[demo theming ki baze sou swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Koulè mak koutim

Mete `data-pantoken-color="custom"` pou rebrand soti nan nenpòt hex, tankou koulè prensipal yon administratè Canvas
tape nan Editè Tèm nan. pantoken derive yon echèl konplè 10–200 `--instui-primitive-color-custom-*`
soti ladan li:

1. **Koub referans.** Chak etap sib limyè li se mwayèn limyè OKLCH 13
   palèt yo nan etap sa a, ak 0 fikse sou blan ak 210 sou nwa. Konsa espas echèl koutim la
   matche ak espas palèt yo anbake.
2. **Ankr.** Antre a aterri sou etap ki gen limyè sib ki pi pre pwòp li, epi li kole sou
   limyè sa a egzak. `#cccccc` vin `custom-40` nan `#c9c9c9`: pre antre a, men pa
   toujou idantik. "Pi pre" vle di etap ki pi pre sou koub la, pa koulè palèt ki deja egziste ki pi pre.
3. **Ranpli.** Chak lòt etap kenbe hue antre a. Saturasyon li swiv koub saturasyon mwayèn palèt yo relativman ak ankr la, epi li redwi sèlman kote yon koulè soti deyò sRGB.

Sèlman `#rgb` ak `#rrggbb` aksepte; nenpòt lòt bagay jete yon `TypeError`, konsa yon hex ki soti nan yon fòm pa ka enjekte CSS.

Lè konstriksyon, emèt règ antye a ak primitiv derive yo deja deklare:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Pou chwazi koulè a nan tan-kouri san voye seri token yo, precompute koub la ak règ remap la lè konstriksyon. Lè sa a itilize antre san depandans `/scale` nan navigatè a, epi mete sèlman 20
primitiv derive yo:

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

Picker tèm sit dokiman an, editè tèm Canvas la, ak demo ki anlè a tout mache konsa.

Gade [Referans API](/api/) pou ekspòt chak plugin.
