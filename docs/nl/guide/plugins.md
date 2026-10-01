# Plugins

Een pantoken-plugin breidt de token- of CSS-output uit zonder een package te fork-en. Bouw er een met
`definePlugin` van `@pantoken/plugin-kit`, en geef het vervolgens door aan `buildTokens` of `toCss`.

## Een plugin schrijven

Geef `definePlugin` de hooks die je implementeert. Het retourneert een normale plugin, gemerkt met de
mogelijkheden die afgeleid zijn van die hooks. Een plugin kan de IR uitbreiden (`tokens`, `icons`), de CSS-output
(`css`), of beide.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Mogelijkheidsbewuste registratie

`buildTokens` en `toCss` voeren `checkPlugins` uit over de plugins die je doorgeeft. Het waarschuwt — het gooit nooit —
als een plugin geen bijpassende hook heeft voor de fase waarin het geregistreerd is, dus een alleen-token plugin die
aan `toCss` wordt doorgegeven wordt overgeslagen met een melding in plaats van stilletjes niets te doen.

## Plugins samenstellen

Bouw voort op een andere plugin met `extendPlugin`, of combineer peers met `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks in dezelfde fase componeren: `tokens` voert eerst de basis en daarna de toevoeging uit, `css` voegt de twee
bijdragen samen, en `icons` voert beide uit.

## Valideer de output van je plugin

Voer de gedeelde drift-checks uit van `@pantoken/utils` over de eigen output van je plugin in zijn test, zodat een
typo of een hernoemde token snel en lokaal faalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De gebundelde plugins

- `@pantoken/plugin-simple-icons` — brand-iconen van simple-icons, geregistreerd als icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-iconen, geregistreerd als `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure productlogo's als SVG's, data-URI's en `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — een PostCSS-plugin (geen pantoken-plugin) die ongebruikte custom properties uit een stylesheet verwijdert.
- `@pantoken/plugin-custom-theme-colors` — rebrandt een pagina door één attribuut in te stellen
  (`data-pantoken-color`) op een van 13 paletten, of op `custom` voor een willekeurige merk-hex. Zie
  [Thema kleuren](#thema-kleuren).
- `@pantoken/plugin-custom-components` — token-ondersteunde custom controls inclusief SegmentedControl
  en SkeletonLoader.

### Gesegmenteerde control

Gebruik een gesegmenteerde control voor twee tot vijf gerelateerde weergaven of filters. Elke optie is een gelabelde native
radio in één benoemde groep; markeer er één aanvankelijk als checked. Gebruik tabs of een dropdown als de opties niet netjes
passen, en gebruik buttongroepen voor acties in plaats van keuzes. De `-size-md` stijl is de
standaard, met `-size-sm` en `-size-lg` voor strakkere en meer prominente contexten.

Importeer `@pantoken/plugin-custom-components/segmented-control.css` voor de control en zijn overflow
knoppen. Gebruik een `-icon-*`-klasse op een segmentlabel wanneer het segment een pictogram nodig heeft; de interactie-helper
promoveert ook een `-icon-*`-klasse van zijn native input naar de label-painter.
Geef het fieldset een beschrijvende `aria-label` of een zichtbare legend. De helper behoudt de native
radio-aankondiging, voegt toetsenbordnavigatie toe, en onthult optioneel één afgesneden segment per pijstoe druk. Gebruik logische start/eind-bedieningselementen en toegankelijke knoplabels in beide richtingen:

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

Importeer `@pantoken/interactions/segmented-control.iife.js` voor DOM-klaar registratie, of roep
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` aan vanuit `@pantoken/interactions`
en roep `cleanup()` aan bij het verwijderen ervan. De CSS en native radio-keuzes werken zonder JS; overflow
pijlen hebben de behavior nodig. Het geselecteerde item gebruikt de twee-laags ontwerpshadow van de semantische
drop-shadow kleuren; het is een aparte active-item shadow in plaats van een bestaande
`--instui-elevation-*` composiet. Overflow-knoppen gebruiken de upstream elevation3 component tokens
via `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Het `skeleton-loader.css` subpad style één decoratieve Text-, Avatar- of Image-vorm. Text accepteert
`-size-xxs` via `-size-xxl`; Avatar en Image zijn medium-groot. Elke optionele `.skeleton-row`
voegt één tekstregel toe zonder de grootte te veranderen. De CSS-shimmer stopt na drie 1,5-seconde slagen en
blijft statisch wanneer de gebruiker gereduceerde beweging prefereert. Het werkt voordat JavaScript laadt.

Plaats vormen alleen waar query-afhankelijke inhoud zal verschijnen, niet over server-bekende navigatie,
filters, koppen of bedieningen. Een skeleton is geen voortgangsmeter of een actie-busy toestand. Houd
bestaande inhoud zichtbaar tijdens achtergrondverversingen; gebruik een spinner of knop-busy toestand voor acties.

De ouderapplicatie bezit loading-, loaded-, empty- en error-markup. Voorzie één leeg statusgebied
per pagina en een aparte lege alert in de server-HTML, beide **buiten** het drukke inhoudsgebied:

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

Roep het parent-level gedrag aan wanneer de request-status verandert. Het werkt `aria-busy` bij en de twee
bestaande aankondigingen, maar het vervangt nooit inhoud of verplaatst focus:

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

Als de per-component interactions-bundel wordt gebruikt in plaats van de directe import, dispatch dan een
`pantoken:skeleton-state` event op het `[data-skeleton-region]` element met
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Stel placeholders _weergeven_ uit met 200–500ms voor snelle requests; het gedrag vertraagt
onafhankelijk de loading-aankondiging met 400ms. Bij passieve paginalaadsessies, laat de focus waar die is. Verplaats alleen focus naar een nieuw geladen resultaat wanneer de gebruiker dit zelf via een actie heeft gevraagd. De statusnode kondigt resultaten en lege staten aan; de alertnode kondigt fouten aan. Combineer niet `aria-busy`, `role="status"`, en
`role="alert"` op één element.

Het register van Lucide Lab kan lui geladen worden, en daarna doorgegeven aan de synchrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Een paar dingen die vroeger plugins waren worden nu meegeleverd in `@pantoken/components`, omdat zoveel componenten
ze uit de doos nodig hebben: elevation-shadows (`--instui-elevation-*`, in `components.css`), de focus-outline
ring (in `base.css` — elke focusable krijgt het wanneer pantoken de pagina beheert), en de Instructure merk
fonts (Atkinson Hyperlegible Next: `base.css` past `--instui-font-family-base` toe; de opt-in
`@pantoken/components/fonts.css` laadt de `@font-face` woff2s).

## Thema kleuren

`@pantoken/plugin-custom-theme-colors` genereert één `[data-pantoken-color="…"]` blok per palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Elk blok wijst de merk-primitieven (`--instui-primitive-color-navy-*` en `-blue-*`)
op het gekozen palet. Het herziet ook de merk-oppervlakken die upstream tot letterlijke hex waren afgevlakt,
en behoudt hun ingebakken alpha via `color-mix()`. Semantische statuskleuren, expliciete blauwe accenten, en
elevation-shadows blijven ongewijzigd. Probeer het in de
[swatch-gebaseerde theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Aangepaste merk kleur

Stel `data-pantoken-color="custom"` in om te rebranden vanaf een willekeurige hex, zoals de primaire kleur die een Canvas-beheerder
in de Theme Editor invoert. pantoken leidt er een volledige 10–200 `--instui-primitive-color-custom-*`
schaal uit af:

1. **Referentiecurve.** De doel-lightness van elke stap is de gemiddelde OKLCH-lightness van de 13
   paletten op die stap, met 0 vastgezet op wit en 210 op zwart. Dus de ruimte tussen stappen van de aangepaste schaal
   komt overeen met die van de meegeleverde paletten.
2. **Anker.** De invoer valt op de stap waarvan de doel-lightness het dichtst bij zijn eigen lichtheid ligt, en sluit dan aan op
   die exacte lightness. `#cccccc` wordt `custom-40` bij `#c9c9c9`: dichtbij de invoer, maar niet
   altijd identiek. "Dichtstbij" betekent de dichtstbijzijnde stap op de curve, niet de dichtstbijzijnde bestaande paletkleur.
3. **Vullen.** Elke andere stap behoudt de hue van de invoer. De verzadiging volgt de gemiddelde
   verzadigingscurve van de paletten relatief aan het anker, en wordt alleen verminderd waar een kleur buiten sRGB valt.

Alleen `#rgb` en `#rrggbb` worden geaccepteerd; iets anders gooit een `TypeError`, dus een hex uit een formulier
kan geen CSS injecteren.

Bij buildtijd, genereer de gehele regel met de afgeleide primitieven al gedeclareerd:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Om de kleur tijdens runtime te kiezen zonder de tokenset te versturen, precomputeer de curve en de remapregel
in de buildtijd. Gebruik daarna de afhankelijkheidsvrije `/scale` entry in de browser, en stel alleen de 20
afgeleide primitieven in:

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

De docs-site theme picker, de Canvas theme editor, en de demo hierboven werken allemaal op deze manier.

Zie de [API reference](/api/) voor de exports van elke plugin.
