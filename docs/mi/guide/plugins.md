# Ngā Tārua (Plugins)

He whakawehenga pantoken te tārua e whakawhānui ana i ngā whakamutunga tohu (token) rānei whakaputanga CSS me te kore tukurua i tētahi mōkihi. Hangaia he mea mā `definePlugin` nō `@pantoken/plugin-kit`, katahi ka tuku ki `buildTokens` rānei `toCss`.

## Tuhia he tārua

Homai ki `definePlugin` ngā hoariri (hooks) ka whakatinana koe. Ka whakahokia he tārua noa, kua tohu-whakairohia me ngā āheinga i kitea i ngā hoariri rā. Ka taea e te tārua te whakawhānui i te IR (`tokens`, `icons`), te putanga CSS (`css`), rānei ngā rāua.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rehitatanga mō te mōhio āheinga

`buildTokens` me `toCss` ka whakahaere i `checkPlugins` i runga i ngā tārua e tukuna ana e koe. Ka whakatūpato — kāore e whakakino —
ina kore he hoariri e hāngai ana ki te āhua (stage) kua rehitatia te tārua ki reira, nō reira ka whakarēhia he tārua-mono-toku (token-only) kua tukuna ki `toCss` me tētahi mōhiotanga, kaua ko te kore mahi āngū.

## Whakakotahitia ngā tārua

Whakapakari ake i runga i tētahi atu tārua mā `extendPlugin`, kia whakakotahitia rānei ki ngā hoa mā `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Ka whakakotahi ngā hoariri o taua āhua: ka whakahaere tuatahi te taketake, katahi ko te tāpiritanga mā `tokens`, ka whakakotahi ngā koha mā `css`, ā, ka whakahaere ngā rāua mā `icons`.

## Whakamana i te putanga o tō tārua

Mahia ngā tirohanga rerenga (drift) ā-wāhanga i tukuna mai e `@pantoken/utils` ki runga i ngā putanga o tō tārua i roto i ōna whakamātautau, kia tūpono te hē kupu (typo) rānei te ingoa tohu kua huri ka hē wawe, ā-rohe:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Ngā tārua kua rarangi

- `@pantoken/plugin-simple-icons` — tohu ā-mohiotanga mai i simple-icons, kua rehitatia hei tohu ikon.
- `@pantoken/plugin-lucide-lab` — ngā iko Lucide Lab, kua rehitatia hei `--instui-icon-*` tohu ā-ataata.
- `@pantoken/plugin-logos` — ngā tohu hua Instructure hei SVG, URI raraunga, me ngā `--instui-logo-*`
  tohu ā-ataata.
- `@pantoken/plugin-prune-custom-props` — he tārua PostCSS (ehara i te tārua pantoken) e tangohia ana
  ngā rawa ritenga-kāore i whakamahia i tētahi pepa-kāhua (stylesheet).
- `@pantoken/plugin-custom-theme-colors` — ka whakahōu i te waitohu whārangi mā te tautuhi i tētahi āhuatanga
  (`data-pantoken-color`) ki tētahi o ngā papa tae 13, rānei ki `custom` mō tētahi hex waitohu. Tirohia
  [Ngā tae Kaupapa](/#theme-colors).
- `@pantoken/plugin-custom-components` — ngā whakatikatika ritengakore tautoko-tuhu (token-backed) pērā i SegmentedControl
  me SkeletonLoader.

### Mana wehewehe (Segmented control)

Whakamahia he mana wehewehe mō ngā tirohanga rānei tātari e 2 ki te 5 e hāngai ana. Ko ia tūtohu he reo irirangi (radio) taketake whai tapanga i roto i tētahi rōpū ingoa; tāpaihia kia kotahi te tohua i te timatanga. Whakamahia ngā ripa (tabs) rānei te rārangi taka-iti (dropdown) mēnā kāore ngā kōwhiringa e pai te rahi, ā, whakamahia ngā rōpū pātene mō ngā mahi hei aukati i ngā kōwhiringa. Ko te āhua `-size-md` te taunoa, me `-size-sm` me `-size-lg` mō ngā horopaki ānau me ngā kura ake.

Tāuru mai `@pantoken/plugin-custom-components/segmented-control.css` mō te mana me ōna pātene whakawhāiti. Whakamahia he karaehe `-icon-*` ki runga i tētahi tapanga wāhanga (segment label) ina hiahia te wāhanga ki tētahi tohu; ka whakatairanga hoki te awhina pāhekoheko i tētahi karaehe `-icon-*` mai i tana moni (native input) ki te peita tapanga. Homai he `aria-label` whai whakamārama rānei he tātai kitea ki te fieldset. Ka tiakina e te awhina te pānui reo irirangi taketake, ka tāpirihia te whakatere papapātene (keyboard navigation), ā, ka tukuna rānei kia whakaaturia tētahi wāhanga tapahia ia pātene matau/ringa. Whakamahia ngā mana timatanga/katia ā-tikanga me ngā tapanga pātene mō ngā ara e rua:

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

Tāuru mai `@pantoken/interactions/segmented-control.iife.js` mō te rehitatanga kua rite ki DOM, rānei waea
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` mai i `@pantoken/interactions`
ā, ka waea `cleanup()` ina tangohia. Ka mahi ngā CSS me ngā kōwhiringa reo irirangi taketake me te kore JS; e hiahiatia ana te whanuitanga pātene mō ngā pere whakawhenua. Ko te tūemi kua tohua e whakamahi ana i te hoahoa atahanga kanohi-rua (two-layer design) nō ngā tae huri pango-āro (drop-shadow) ā-aranarangi; he atahanga tūtohu tūnga mahi kē, kāore he rānei
`--instui-elevation-*` composite kua oti. Ko ngā pātene whakawhenua e whakamahi ana i ngā tohu raina-elevation3 o te puna-maru mā `--pantoken-segmented-overflow-shadow`.

### Kawenga Skeleton

Ko te ara-iti `skeleton-loader.css` e whakatauira ana i tētahi āhua Whakaahua (Text), Avatar, rānei Image mō te whakapaipai anake. Ka whakaaetia e Text te `-size-xxs` mā roto i `-size-xxl`; he rahi-waenganui ngā Avatar me Image. Ia `.skeleton-row` kōwhiringa ka tāpiri i tētahi rārangi kuputuhi kotahi me te kore e huri i te rahi. Ka mutu te kōkirī CSS i muri i ngā koropiko e toru o 1.5 hēkona, ā, ka tū tau mēnā e pai ana te kaiwhakamahi ki te whakaheke i te nekehanga. Ka mahi i mua i te uta o JavaScript.

Whakauruhia ngā āhua anake ki ēnā wāhi ka puta ai te ihirangi e urupare ana ki te pātai, kaua i runga i ngā taputapu whakahaere mō te tūhono tūmau, tātari, taitara, rānei mana whakahaere. Ehara te skeleton i te mita ā-ahunga pū (progress meter) rānei he āhua pakari mahi. Kia kitea tonu ngā ihirangi o nāianei i roto i ngā whakahoutanga papamuri; whakamahia he poro huripare (spinner) rānei tētahi āhua pātene pakari mō ngā mahi.

Ko te taupānga matua te mea e mana ana mō ngā tohu uta, kua uta, kau, me te tohu hē. Whakaratohia he wāhi āhua kau kotahi mō ia whārangi me tētahi whakamōhiotanga kau rerekē i te HTML tūmau, ā-katoa **waho** i te rohe ihirangi pā pakari:

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

Waea te whanonga taumata-mātua ina huri te āhua tono. Ka whakahou ia i `aria-busy` me ngā panui e rua i mua, engari kāore ia e whakakapi ihirangi rānei e neke ai te aro:

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

Mēnā e whakamahia ana te pūkete whakawhitinga ā-wāhanga o ngā pāhekoheko kē i te whakauru tika, tukuna he huihuinga
`pantoken:skeleton-state` ki te tūemi `[data-skeleton-region]` me
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Tūaroa te whakaatu īpakanohi (placeholders) mā 200–500ms mō ngā tono tere; ka takitahi te whanonga e tūaroa i te panui uta e 400ms. I runga i ngā uta whārangi taumaha, waiho te aro ki tōna tūranga. Whakakēhia te aro ki tētahi hua hou i te wā i tonoa te mahi e te kaiwhakamahi ake. Ka pānui te pūhiko tūnga (status node) i ngā hua me ngā āhuatanga kau; ka pānui te pūhiko raru (alert node) i ngā hē. Kaua e whakakotahi `aria-busy`, `role="status"`, me
`role="alert"` ki runga i tētahi tūemi kotahi.

Ka taea te uta ā-taunekeneke (lazily) i te rēhitatanga Lucide Lab, katahi ka tukuna ki te hoariri token sync:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

He mea iti e kawea ai i mua i ētahi tārua: kei roto i `@pantoken/components` inā te nui o ngā waahanga e hiahiatia ana e aua waahanga i waho o te pouaka: ngā atahanga atahanga-elevation (`--instui-elevation-*`, i roto i `components.css`), te porowhita arotahi āro (focus-outline ring) (i roto i `base.css` — ka riro mā te pantoken te whiwhi mō ia mea aro-wāhanga), me ngā momo momotuhi waitohu Instructure (Atkinson Hyperlegible Next: `base.css` ka whakamahi i `--instui-font-family-base`; ko te kōwhiringa kōwhiri `@pantoken/components/fonts.css` ka uta i ngā woff2s `@font-face`).

## Ngā tae Kaupapa (Theme colors)

Ka whakaputa e `@pantoken/plugin-custom-theme-colors` tētahi poraka `[data-pantoken-color="…"]` mō ia papa tae
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Ia poraka ka tohu i ngā taketake waitohu (`--instui-primitive-color-navy-*` me `-blue-*`)
ki te papa kua kōwhiria. Ka whakatīria anō hoki ngā mata waitohu i whāia e te puna i roto i ngā hex ā-tinana,
e pupuri ana i ō rātou alpha kua tunua mā `color-mix()`. Ka noho tonu ngā tae tūnga ā-tikanga, ngā āhunga kikorangi mārama, me ngā atahanga arai-elevation. Whakamātauria i te
[whakaaturanga theming whai swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Tae waitohu ritenga (Custom brand color)

Tautuhia `data-pantoken-color="custom"` kia whakahōu i te waitohu mai i tētahi hex, pērā i te tae matua e tuhi ai tētahi kaiwhakahaere Canvas ki te Etita Kaupapa. Ka tīpako a pantoken i tētahi āhua `--instui-primitive-color-custom-*`
katoa 10–200 mai i taua mea:

1. **Whārangi tohutoro.** Ko te whakaata marama (lightness) o ia wāhanga he toharite o te marama OKLCH o ngā papa tae 13 i taua wāhanga, me te 0 tū pakari ki te mā me te 210 ki te pango. Nō reira ka ōrite te wāhanga o te rārangi ritenga ki ngā papa kua tukuna.
2. **Pūtake.** Ka ū te whakaurunga ki te wāhanga e tata ana te marama tūturu o taua wāhanga ki tōna ake, katahi ka tūhurihia ki taua marama tonu. Ka riro `#cccccc` hei `custom-40` i `#c9c9c9`: tata ki te whakaurunga, engari kāore e ōrite i ngā wā katoa. Ko te tikanga o "tata" ko te wāhanga tata rawa atu i runga i te rārangi, ehara i te tae o tētahi papa kua oti kē.
3. **Kī.** Ka pupuri te toenga o ngā wāhanga i te tae huruhuru o te whakaurunga. Ka whai i tona whakaheke ā-tūhono i runga i te toharite kiko ā-papa tae, ā, ka whakaitihitia anake mēnā ka mūrere te tae i waho o te wāhanga sRGB.

Tēnā, ko `#rgb` me `#rrggbb` anake ngā mea e whakaaehia; ka tuku kē atu he `TypeError`, nō reira kāore e āhei tētahi hex i te puka kia tāuru CSS.

I te wā hanga, whakaputa te ture katoa me ngā taketake kua tautuhia kē:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Hei tīpako i te tae i te wā whakahaere (runtime) me te kore e kawe i te pūnaha tohu, whiwhihia te kōrori me te ture remap i te wā hanga. Whakamahia anō te kupenga kore-tūnga `/scale` i te pūtirotiro, ā, tautuhia anake ngā taketake 20 kua tautuhia:

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

Kei pēnei te kaikaipurangi kōwhiri kaupapa o te pae tuhinga, te etita kaupapa Canvas, me te whakaaturanga i runga ake.

Tirohia te [tūtohu API](/api/) mō ngā kaweake o ia tārua.
