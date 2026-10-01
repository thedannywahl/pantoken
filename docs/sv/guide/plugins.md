# Plugins

En pantoken-plugin utökar token- eller CSS-utdata utan att forka ett paket. Den byggs med
`definePlugin` från `@pantoken/plugin-kit`, och skickas sedan till `buildTokens` eller `toCss`.

## Skapa en plugin

Ge `definePlugin` de hooks du implementerar. Den returnerar en normal plugin, märkt med de
kapaciteter som härleds från dessa hooks. En plugin kan utöka IR (`tokens`, `icons`), CSS-utdata (`css`), eller båda.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapacitetsmedveten registrering

`buildTokens` och `toCss` kör `checkPlugins` över de plugins du skickar in. Den varnar — den kastar aldrig —
när en plugin saknar matchande hook för det steg den registrerats i, så en token-endast-plugin som skickas
till `toCss` hoppas över med en notis istället för att tyst göra ingenting.

## Sammansätt plugins

Bygg ovanpå en annan plugin med `extendPlugin`, eller kombinera jämlikar med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hookar för samma steg komponerar: `tokens` kör basen och sedan tillägget, `css` slår ihop de två
bidragen, och `icons` kör båda.

## Validera pluginens utdata

Kör de delade driftkontrollerna från `@pantoken/utils` över din plugins egna utdata i dess test, så ett
stavefel eller en omlagd token misslyckas snabbt och lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundlade plugins

- `@pantoken/plugin-simple-icons` — brandikoner från simple-icons, registrerade som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrerade som `--instui-icon-*` bildtokens.
- `@pantoken/plugin-logos` — Instructure-produktlogotyper som SVG, data-URI och `--instui-logo-*`
  bildtokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (inte en pantoken-plugin) som tar bort
  oanvända custom properties från ett stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrandar en sida genom att sätta ett attribut
  (`data-pantoken-color`) till en av 13 paletter, eller till `custom` för valfri brand-hex. Se
  [Temafärger](#theme-colors).
- `@pantoken/plugin-custom-components` — tokenstödda anpassade kontroller inklusive SegmentedControl
  och SkeletonLoader.

### Segmenterad kontroll

Använd en segmenterad kontroll för två till fem relaterade vyer eller filter. Varje alternativ är ett etiketterat native
radio i en namngiven grupp; markera ett som valt initialt. Använd flikar eller en dropdown om alternativen inte får plats
bekvämt, och använd buttongrupper för åtgärder snarare än val. Stilen `-size-md` är
standard, med `-size-sm` och `-size-lg` för tightare och mer framträdande kontexter.

Importera `@pantoken/plugin-custom-components/segmented-control.css` för kontrollen och dess overflow
knappar. Använd klassen `-icon-*` på en segments etikett när segmentet behöver en glyph; interaktionshjälparen
promoverar också en `-icon-*` klass från dess nativera input till etikettens painter.
Ge fieldset ett beskrivande `aria-label` eller en synlig legend. Hjälparen bevarar den native
radioannonseringen, lägger till tangentbordsnavigering, och visar valfritt ett clipat segment per piltangenttryck. Använd logiska start-/slutkontroller och tillgängliga knappetiketter i båda riktningarna:

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

Importera `@pantoken/interactions/segmented-control.iife.js` för DOM-klar registrering, eller anropa
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` från `@pantoken/interactions`
och anropa `cleanup()` när den tas bort. CSS och native radio-val fungerar utan JS; overflow-
pilar behöver beteendet. Det valda objektet använder den tvålagrade designskuggan från de semantiska
drop-shadow-färgerna; det är en distinkt aktiv-objekt-skugga snarare än en befintlig
`--instui-elevation-*` komposit. Overflow-knappar använder upstream elevation3-komponentens tokens
genom `--pantoken-segmented-overflow-shadow`.

### Skeleton-laddning

`skeleton-loader.css` subpath stylar en dekorativ Text-, Avatar- eller Image-form. Text accepterar
`-size-xxs` genom `-size-xxl`; Avatar och Image är medium-storlek. Varje valfri `.skeleton-row`
lägger till en textrad utan att ändra storleken. CSS-shimmern stoppar efter tre 1.5-sekunders svepningar och
förblir statisk när användaren föredrar minskad rörelse. Den fungerar innan JavaScript laddats.

Placera former endast där förfrågningsberoende innehåll kommer att visas, inte över server-känd navigation,
filter, rubriker eller kontroller. Ett skeleton är inte en progressmätare eller ett action-busy-tillstånd. Behåll
befintligt innehåll synligt under bakgrundsuppdateringar; använd en spinner eller knapp-busy-tillstånd för åtgärder.

Moderapplikationen äger loading-, loaded-, empty- och error-markupen. Tillhandahåll en tom statusregion
per sida och en separat tom alert i server-HTML:en, båda **utanför** den upptagna innehållsregionen:

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

Anropa parent-nivåbeteendet när request-status ändras. Det uppdaterar `aria-busy` och de två
för-existerande annonseringarna, men ersätter aldrig innehåll eller flyttar fokus:

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

Om per-komponent interactions-buntet används istället för direkt import, dispatcha ett
`pantoken:skeleton-state` event på `[data-skeleton-region]`-elementet med
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Fördröj _visning_ av placeholders med 200–500 ms för snabba förfrågningar; beteendet fördröjer
självt laddningsannonseringen med 400 ms. Vid passiva sidladdningar, lämna fokus där det är. Flytta endast fokus till ett nyinläst resultat när användarens egen åtgärd begärde det. Statusnoden annonserar resultat och tomma tillstånd; alert-noden annonserar fel. Kombinera inte `aria-busy`, `role="status"`, och
`role="alert"` på samma element.

Lucide Labs register kan laddas lazy, och sedan skickas till den synkrona token-hooken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Några saker som tidigare var plugins levereras nu i `@pantoken/components`, eftersom så många komponenter behöver
dem ur lådan: elevationsskuggor (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — varje fokusbar får den när pantoken äger sidan), och Instructure-brand
typsnitten (Atkinson Hyperlegible Next: `base.css` tillämpar `--instui-font-family-base`; den opt-in
`@pantoken/components/fonts.css` laddar `@font-face` woff2-filerna).

## Temafärger {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emitterar ett `[data-pantoken-color="…"]` block per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Varje block pekar de brand-primitiverna (`--instui-primitive-color-navy-*` och `-blue-*`)
mot den valda paletten. Det återderiverar också de brandytor som upstream plattade till litteral hex,
och bevarar deras bakade alfa genom `color-mix()`. Semantiska statusfärger, explicita blå accenter och
elevationsskuggor förblir oförändrade. Testa i
[swatch-baserat theming-demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Anpassad brandfärg

Sätt `data-pantoken-color="custom"` för att rebranda från vilken hex som helst, såsom primärfärgen en Canvas-admin
skriver in i Theme Editor. pantoken härleder en full 10–200 `--instui-primitive-color-custom-*`
skala från den:

1. **Referenskurva.** Varje stegs mål-ljusstyrka är den genomsnittliga OKLCH-ljusstyrkan av de 13
   paletterna vid det steget, med 0 fixerad vid vitt och 210 vid svart. Så den anpassade skalans avstånd
   matchar de levererade paletternas.
2. **Ankare.** Ingångsvärdet hamnar på det steg vars mål-ljusstyrka är närmast dess egen, och snappas sedan till
   den exakta ljusstyrkan. `#cccccc` blir `custom-40` vid `#c9c9c9`: nära ingången, men inte
   alltid identisk. "Närmast" betyder närmsta steg på kurvan, inte den närmaste befintliga palettfärgen.
3. **Fyllning.** Varje annat steg behåller ingångens hue. Dess mättnad följer paletternas genomsnittliga
   mättnadskurva relativt ankarpunkten, och reduceras endast där en färg hamnar utanför sRGB.

Endast `#rgb` och `#rrggbb` accepteras; allt annat kastar ett `TypeError`, så en hex från ett formulär
kan inte injicera CSS.

Vid build-tid, emittera hela regeln med de härledda primitivernas redan deklarerade:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

För att välja färgen vid runtime utan att leverera token-setet, förberäkna kurvan och remap-regeln vid build-tid. Använd sedan den beroendefria `/scale`-ingången i webbläsaren, och sätt endast de 20
härledda primitiva:

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

Docs-site:ens theme picker, Canvas Theme Editor och demon ovan fungerar alla på detta sätt.

Se [API-referensen](/api/) för varje plugins exports.
