# Viðbætur (Plugins)

Pantoken-viðbót stækkar token- eða CSS-úttak án þess að afkvæmast pakkann. Búa má hana með
`definePlugin` frá `@pantoken/plugin-kit`, og síðan senda hana til `buildTokens` eða `toCss`.

## Skrifa viðbót

Gefðu `definePlugin` þau hooks sem þú útfærir. Hún skilar venjulegri viðbót sem ber vörumerki byggt á
getum sem dregnar eru af þessum hooks. Viðbót getur stækkað IR-ið (`tokens`, `icons`), CSS-úttakið
(`css`), eða bæði.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Skráning með vitneskju um getu

`buildTokens` og `toCss` keyra `checkPlugins` yfir þær viðbætur sem þú sendir. Það gefur viðvörun — það kastar aldrei —
ef viðbót hefur engan samsvarandi hook fyrir stigið sem hún er skráð í, þannig að token-ein viðbót sem send er
til `toCss` er hoppuð með skýrslu í stað þess að gera ekkert hljóðlaust.

## Samsetja viðbætur

Byggðu ofan á annarri viðbót með `extendPlugin`, eða sameina jafningja með `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook fyrir sama stig samsetjast: `tokens` keyrir grunninn og síðan viðbótina, `css` sameinar tvær
framlagningar, og `icons` keyrir báða.

## Staðfestu úttak viðbótarinnar

Keyrðu sameiginlegu drift-prófanirnar frá `@pantoken/utils` yfir úttak viðbótarinnar í prófi hennar, svo stafsetningarvilla eða endurnefnd token
brestur hraðar og staðbundið:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Innbyggðu viðbæturnar

- `@pantoken/plugin-simple-icons` — merkjavörur (brand icons) frá simple-icons, skráðar sem icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikon, skráð sem `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure vörumerkjamerki sem SVG, data-URI, og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — PostCSS-viðbót (ekki pantoken-viðbót) sem fjarlægir
  ónotaðar sérsniðnar breytur úr stílblaði.
- `@pantoken/plugin-custom-theme-colors` — umbreytir útliti síðu með því að setja eitt attribute
  (`data-pantoken-color`) í eitt af 13 litasöfnum, eða í `custom` fyrir sérhverja merkja-hex. Sjá
  [Þemu-litir](#theme-colors).
- `@pantoken/plugin-custom-components` — token-studd sérsniðin stjórntæki þar á meðal SegmentedControl
  og SkeletonLoader.

### Skipta-stýring (Segmented control)

Notaðu skipta-stýring fyrir tvær til fimm tengdar sýningar eða síur. Hver valmöguleiki er merktur innfæddur
radio í einu nafngreindu hópi; merkja einn sem valinn upphaflega. Notaðu flipaflokka (tabs) eða valmynd (dropdown)
ef valkostirnir passa ekki þægilega, og notaðu hnappahópa fyrir aðgerðir frekar en val. Stíllinn `-size-md` er
sjálfgefið, með `-size-sm` og `-size-lg` fyrir þrengri og áberandi samhengi.

Flytja inn `@pantoken/plugin-custom-components/segmented-control.css` fyrir stýringuna og overflow
hnappana. Notaðu `-icon-*` flokki á merkimiða (segment label) þegar segment þarf tákn; hjálparvirkni
kveikir einnig á `-icon-*` flokki frá innfæddu inputi yfir í label-málninguna. Gefðu fieldset lýsandi `aria-label` eða sýnilegt legend. Hjálparinn varðveitir innfædda
radio-tilkynningu, bætir við lyklaborðsleiðsögn og afhjúpar valkvætt einn skornan hluta fyrir hverja ör-ýtingu.
Notaðu rökrétt start/end stýringar og aðgengileg hnappamerki í báðar áttir:

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

Flytja inn `@pantoken/interactions/segmented-control.iife.js` fyrir DOM-tilbúna skráningu, eða kalla
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` frá `@pantoken/interactions`
og kalla `cleanup()` þegar fjarlægt er. CSS og innfæddir radio-valkostir virka án JS; overflow
örvarnir þurfa hegðunina. Valinn hlutur notar tvílaga skugga úr merkingar-droppum (semantic drop-shadow) litunum; hann er sérstakur virkur-hlutar skuggi frekar en núverandi
`--instui-elevation-*` samsetning. Overflow-hnappar nota upstream elevation3 component tokens
gegnum `--pantoken-segmented-overflow-shadow`.

### Skeleton-loading

`skeleton-loader.css` undirleiðinn stilar eina skrautlega Text-, Avatar- eða Image-lögun. Text tekur við
`-size-xxs` í gegnum `-size-xxl`; Avatar og Image eru meðalstórar. Hver valkvæð `.skeleton-row`
bætir einni textalínu án þess að breyta stærð. CSS-glansið (shimmer) stöðvast eftir þrjár 1.5 sekúndna sveiflur og
verður kyrrt þegar notandi kýs minni hreyfingu. Það virkar áður en JavaScript hleðst.

Settu form (shapes) aðeins þar sem fyrirspurnartengd efni mun birtast, ekki yfir vefþekkt siglingu,
síur, fyrirsagnir eða stjórnþætti. Skeleton er ekki framvindumælir eða upptekinn-ástand fyrir aðgerð. Haltu
tilvist efnis sýnilegri meðan bakgrunnsupprifjun fer fram; nota snúningshjól (spinner) eða hnappaupptekna stöðu fyrir aðgerðir.

Yfirforritið á ábyrgð á loading, loaded, empty, og error markup. Útbúðu eitt tómt status-svæði
fyrir hverja síðu og sérstaka tóma viðvörun í þjóns-HTML, bæði **utan** uppteknu efnissvæðisins:

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

Kallaðu foreldra-stigs hegðun þegar beiðni breytist. Hún uppfærir `aria-busy` og þær tvær
fyrirliggjandi tilkynningar, en hún skiptir aldrei út efni né flytur fókus:

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

Ef nota á per-component interactions pakka í stað beininnflutnings, sendu þá
`pantoken:skeleton-state` atburð á `[data-skeleton-region]` elementið með
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Seinka sýningu (showing_)
skuggamynda (placeholders) um 200–500 ms fyrir hraðar beiðnir; hegðunin seinkar sjálfstætt loading-
tilkynningunni um 400 ms. Á óvirkum síðuhleðslum, skildu fókus þar sem það er. Flyttu fókus aðeins á nýhlaðinn niðurstöðu þegar notandinn sjálfur bað um það. Status-nóða tilkynnir niðurstöður og tóm
ástand; alert-nóða tilkynnir bilanir. Ekki sameina `aria-busy`, `role="status"`, og
`role="alert"` á sama elementinu.

Skráning Lucide Lab má hlaða letilega (lazily), og síðan senda í samstillta token-hookinn:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Fyrirbæri sem áður voru viðbætur eru nú í `@pantoken/components`, þar sem svo margir hlutir þurfa
það upp úr kassanum: elevation-skuggar (`--instui-elevation-*`, í `components.css`), focus-outline
hringurinn (í `base.css` — hvert fókus-hæft fær hann þegar pantoken á síðuna), og Instructure vörumerkja
leturgerðir (Atkinson Hyperlegible Next: `base.css` beitir `--instui-font-family-base`; valfrjálsi
`@pantoken/components/fonts.css` hleður `@font-face` woff2-skrám).

## Þemu-litir (Theme colors)

`@pantoken/plugin-custom-theme-colors` gefur eitt `[data-pantoken-color="…"]` blokk fyrir hvert litasafn
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver blokk vísar vörumerkjaprimitífunum (`--instui-primitive-color-navy-*` og `-blue-*`)
á valið litasafn. Hún endurreiknar einnig vörumerkjayfirborðin sem upstream breytti í fastan hex,
og heldur þeirra bakaða alfa gegnum `color-mix()`. Merkingarstaðaflitir, skýrt bláar áherslur, og
elevation-skuggar haldast óbreyttir. Prófaðu það í
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Sérsniðið vörumerki-litur (Custom brand color)

Settu `data-pantoken-color="custom"` til að endurmerkja frá hvaða hex sem er, til dæmis ef aðal-litur sem Canvas stjórnandi
slær inn í Theme Editor. pantoken leiðir fulla 10–200 `--instui-primitive-color-custom-*`
kvarða úr því:

1. **Tilvísunarkúrva.** Hver skref-marklýsingarljómi (target lightness) er meðalljósleikinn (OKLCH lightness) hjá 13
   litasöfnum á því skrefi, með 0 fest við hvítt og 210 við svart. Svo rýmd aðlögun sérsniðins kvarða samsvarar
   bili shipped litasafna.
2. **Akkeri.** Inntakið lendir á þeim skrefi sem markljósleiki þess er næstur, og smellur síðan á
   þann nákvæma ljósmagn. `#cccccc` verður `custom-40` við `#c9c9c9`: nálægt inntakinu, en ekki
   alltaf eins. „Næst“ þýðir næst á kúrfunni, ekki nálgast núverandi liti í einhverju litasafni.
3. **Fylla.** Öll önnur skref varðveita hue inntaksins. Mettun þess fylgir meðaltalsmettunarkúrvu litasafna miðað við akkerið, og er skorin aðeins þar sem litur lendir utan sRGB.

Aðeins `#rgb` og `#rrggbb` eru samþykkt; allt annað kastar `TypeError`, svo hex úr formi
getur ekki sprautað CSS.

Í byggingatíma, útbúðu heildarröðina með afleiddu primitívunum þegar þau eru þegar lýst:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Til að velja litinn við keyrslutíma án þess að senda token-settið, forreiknaðu kúrfunni og remap-
regluna við byggingu. Notaðu þá ósjálfstæða `/scale` innsláttinn í vafranum, og settu aðeins 20
afleiddu primitívana:

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

Þema-válkostir skjalsins, Canvas theme editor, og sýnidæmið hér að ofan vinna öll svona.

Sjá [API reference](/api/) fyrir útflutninga hverrar viðbótar.
