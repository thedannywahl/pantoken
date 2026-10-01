# Plugins

Ein pantoken-plugin utvidar token- eller CSS-utdata utan å forke ein pakke. Bygg ei med
`definePlugin` frå `@pantoken/plugin-kit`, og send ho deretter til `buildTokens` eller `toCss`.

## Forfatt ein plugin

Gje `definePlugin` krokane du implementerer. Ho returnerer ein normal plugin, merka med
evnene som blir utleia frå desse krokane. Ein plugin kan utvide IR-en (`tokens`, `icons`), CSS-
utdataene (`css`), eller begge delar.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Evne-medviten registrering

`buildTokens` og `toCss` køyrer `checkPlugins` over pluginane du sender inn. Det varslar — det kastar aldri —
når ein plugin ikkje har ein matchande krok for steget ho er registrert i, så ein token-berre plugin sendt
til `toCss` blir hoppa over med ei merknad i staden for å stille og gjere ingenting.

## Komponer pluginar

Bygg vidare på toppen av ein annan plugin med `extendPlugin`, eller kombiner jamgode med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Krokar i same steg komponerer: `tokens` køyrer basisen og deretter tillegg, `css` slår saman dei to
bidraga, og `icons` køyrer begge.

## Valider utdataene frå pluginen din

Køyr dei delte drift-sjekkane frå `@pantoken/utils` over pluginens eigne utdata i testen, så ein
typo eller eit omnamna token feilar raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dei bundla pluginane

- `@pantoken/plugin-simple-icons` — brand-ikon frå simple-icons, registrerte som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikon, registrerte som `--instui-icon-*` bilde-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogoar som SVG-ar, data-URI-ar, og `--instui-logo-*`
  bilde-tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-plugin (ikkje ein pantoken-plugin) som fjernar
  ubrukte custom properties frå eit stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrandar ein side ved å setje ein attributt
  (`data-pantoken-color`) til ein av 13 palettar, eller til `custom` for kva som helst brand-hex. Sjå
  [Tema-fargar](#theme-colors).
- `@pantoken/plugin-custom-components` — token-støtta eigne kontrollar inkludert SegmentedControl
  og SkeletonLoader.

### Segmentert kontroll

Bruk ei segmentert kontroll for to til fem relaterte visningar eller filter. Kvar valmoglegheit er ein merka native
radio i éin namngjeven gruppe; marker éin som vald initialt. Bruk tabs eller ein dropdown om vala ikkje får plass
komfortabelt, og bruk knappegrupper for handlingar i staden for val. Stilen `-size-md` er
standard, med `-size-sm` og `-size-lg` for trangare og meir framståande kontekstar.

Importer `@pantoken/plugin-custom-components/segmented-control.css` for kontrollen og hans overflow-
knappar. Bruk ein `-icon-*`-klasse på ein segment-etikett når segmentet treng eit glyph; interaksjonshjelparen
promoterer òg ein `-icon-*`-klasse frå det native inputet til etikett-paintaren.
Gje fieldset eit beskrivande `aria-label` eller ei synleg legend. Hjelparen beheld den native
radio-annonseringa, legg til tastaturnavigasjon, og avslører valfritt eit avkorta segment per piltasttrykk. Bruk logiske start-/end-kontrollar og tilgjengelege knappetekstar i begge retningar:

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

Importer `@pantoken/interactions/segmented-control.iife.js` for DOM-klare registrering, eller kall
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` frå `@pantoken/interactions`
og kall `cleanup()` når du fjernar han. CSS og native radio-val fungerar utan JS; overflow-pilar treng åtferda.
Det valde elementet brukar den todelte designskuggen frå dei semantiske drop-shadow-fargane; det er ein særskild aktiv-element-skugge snarare enn ein eksisterande
`--instui-elevation-*` samansett. Overflow-knappar bruker dei oppstrøms elevation3-komponent-tokenane
gjennom `--pantoken-segmented-overflow-shadow`.

### Skeleton-lastevising

`skeleton-loader.css`-substien styliserer éin dekorativ Text-, Avatar- eller Image-form. Text tek imot
`-size-xxs` via `-size-xxl`; Avatar og Image er mediumstore. Kvar valfri `.skeleton-row`
legg til éi tekstlinje utan å endre storleiken. CSS-shimmeren stoppar etter tre sweep på 1.5 sekund og
blir statisk når brukaren føretrekkjer redusert animasjon. Den verkar før JavaScript lastar.

Plasser former berre der innhald avhengig av spørring vil dukke opp, ikkje over server-kjend navigasjon,
filter, overskrifter, eller kontroller. Ein skeleton er ikkje eit framdriftsmålar eller ein action-busy-tilstand. Behold
eksisterande innhald synleg under bakgrunnsoppdateringar; bruk ein spinner eller knapp-busy-tilstand for handlingar.

Foreldre-applikasjonen eig markup for loading, loaded, empty, og error. Gje éin tom status-region
per side og ein separat empty-alert i server-HTML-en, begge **UTANFOR** det travle innhaldsområdet:

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

Kall foreldre-nivå åtferda når request-tilstanden endrar seg. Den oppdaterer `aria-busy` og dei to
førehands-eksisterande annonseringane, men den erstattar aldri innhald eller flyttar fokus:

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

Om ein bruker per-komponent interaksjonspakka i staden for direkte import, dispatch ei
`pantoken:skeleton-state`-hendelse på `[data-skeleton-region]`-elementet med
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Forsink å _vise_
plassarhaldarar med 200–500 ms for raske førespurnader; åtferda forsinkar sjølvstendig loading-
annonseringa med 400 ms. På passive sidelastar, la fokuset vera der det er. Flytt berre fokus til eit nyleg
last resultat når brukarens eigen handling ba om det. Status-noden annonserer resultat og tomme
tilstandar; alert-noden annonserer feil. Kombiner ikkje `aria-busy`, `role="status"`, og
`role="alert"` på eitt element.

Lucide Labs register kan lastast late, for så å bli sendt til den synkrone token-kroken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Eit par ting som tidlegare var pluginar blir no leverte i `@pantoken/components`, sidan så mange komponentar treng
dei ut av boksen: elevation-skuggar (`--instui-elevation-*`, i `components.css`), focus-outline
ringen (i `base.css` — kvar fokusérbar får ho når pantoken eig sida), og Instructure-brand-
fontane (Atkinson Hyperlegible Next: `base.css` brukar `--instui-font-family-base`; den valfrie
`@pantoken/components/fonts.css` lastar `@font-face` woff2-ane).

## Tema-fargar {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emitterer éin `[data-pantoken-color="…"]`-blokk per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Kvar blokk peikar dei brand-primitiva (`--instui-primitive-color-navy-*` og `-blue-*`)
mot den valde paletten. Ho re-deriverer òg brand-overflatene som oppstrøms flata ut til literal hex,
og beheld deira bakt-in alpha gjennom `color-mix()`. Semantiske statusfargar, eksplisitte blå aksentar, og
elevation-skuggar blir verande. Prøv det i
[swatch-baserte theming-demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Eigenskapt brand-farge

Set `data-pantoken-color="custom"` for å rebrande frå kva for eit hex som helst, slik som primærfargen ein Canvas-admin
skriver inn i Theme Editor. pantoken avleder ein full 10–200 `--instui-primitive-color-custom-*`
skala frå han:

1. **Referansekurve.** Kvar steg sitt mål-lysheit er gjennomsnittleg OKLCH-lysheit for dei 13
   palettane på det steget, med 0 festa til kvit og 210 til svart. Så den eigenskapsskalaens avstand
   samsvarar med dei leverte palettane.
2. **Anker.** Inndataen landar på steget dersom mål-lysheita er nærast eigen, og snappar deretter til
   den eksakte lysheita. `#cccccc` blir `custom-40` ved `#c9c9c9`: nær den inndataen, men ikkje
   alltid identisk. "Næraste" betyr næraste steg på kurva, ikkje næraste eksisterande palettfarge.
3. **Fyll.** Kvar anna steg held inndataen sin hue. Saturasjonen følgjer palettane sin gjennomsnittlege
   saturasjonskurve relativt til ankaret, og blir redusert berre der ein farge fell utanfor sRGB.

Kun `#rgb` og `#rrggbb` blir akseptert; anna input kastar ein `TypeError`, så ein hex frå eit skjema
kan ikkje injisere CSS.

Ved byggetid, emitter heile regelen med dei avleiande primitiva allereie deklarerte:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For å plukke fargen ved kjøretid utan å sende tokensettet, prekomputer kurva og remap-regelen ved byggetid. Bruk deretter den avhengige-frie `/scale`-opninga i nettlesaren, og sett berre dei 20
avleiande primitiva:

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

Doksites tema-plukkar, Canvas theme editor, og demonstrasjonen over fungerer alle på denne måten.

Sjå [API-referansen](/api/) for kvar plugins eksportar.
