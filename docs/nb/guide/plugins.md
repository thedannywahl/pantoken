# Plugins

En pantoken-plugin utvider token- eller CSS-utdata uten å fork-e et pakke. Den bygges med
`definePlugin` fra `@pantoken/plugin-kit`, og sendes deretter til `buildTokens` eller `toCss`.

## Lag en plugin

Gi `definePlugin` krokene du implementerer. Den returnerer en vanlig plugin, merket med
kapabilitetene som utledes fra disse krokene. En plugin kan utvide IR-en (`tokens`, `icons`), CSS-
utdataene (`css`), eller begge deler.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapabilitetsbevisst registrering

`buildTokens` og `toCss` kjører `checkPlugins` over pluginene du sender inn. Den advarer — den kaster aldri —
når en plugin ikke har en matchende krok for fasen den er registrert i, så en token-only plugin sendt
til `toCss` blir hoppet over med en merknad i stedet for å stille gjøre ingenting uten å si ifra.

## Komponer plugins

Bygg videre på en annen plugin med `extendPlugin`, eller kombiner jevnaldrende med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kroker i samme fase komponeres: `tokens` kjører basen og deretter tillegget, `css` slår sammen de to
bidragene, og `icons` kjører begge.

## Valider pluginens utdata

Kjør de delte drift-sjekkene fra `@pantoken/utils` over pluginens egne utdata i testen, slik at en
slurvefeil eller et omdøpt token feiler raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundlete pluginene

- `@pantoken/plugin-simple-icons` — merkeikoner fra simple-icons, registrert som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrert som `--instui-icon-*` bilde-tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVG-er, data-URIer, og `--instui-logo-*`
  bilde-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin) som fjerner
  ubrukte custom properties fra et stilark.
- `@pantoken/plugin-custom-theme-colors` — rebrander en side ved å sette ett attributt
  (`data-pantoken-color`) til en av 13 paletter, eller til `custom` for vilkårlig brand-hex. Se
  [Tema-farger](#theme-colors).
- `@pantoken/plugin-custom-components` — token-støttede egendefinerte kontrollere inkludert SegmentedControl
  og SkeletonLoader.

### Segmentert kontroll

Bruk en segmentert kontroll for to til fem relaterte visninger eller filtre. Hvert valg er en merket native
radio i en navngitt gruppe; merk ett som valgt initialt. Bruk tabs eller en dropdown hvis valgene ikke passer
komfortabelt, og bruk knappgrupper for handlinger i stedet for valg. `-size-md`-stilen er standard,
med `-size-sm` og `-size-lg` for tettere og mer fremtredende kontekster.

Importer `@pantoken/plugin-custom-components/segmented-control.css` for kontrollen og dens overflow-
knapper. Bruk en `-icon-*`-klasse på et segmentlabel når segmentet trenger et glyph; interaksjonshjelperen
promoterer også en `-icon-*`-klasse fra det native inputet til label-painteren.
Gi fieldsetet en beskrivende `aria-label` eller en synlig legend. Hjelperen bevarer native
radio-annonseringen, legger til tastaturnavigasjon, og kan valgfritt avsløre ett avkuttet segment per piltasttrykk. Bruk logiske start/slutt-kontroller og tilgjengelige knappetiketter i begge retninger:

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

Importer `@pantoken/interactions/segmented-control.iife.js` for DOM-klar registrering, eller kall
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` fra `@pantoken/interactions`
og kall `cleanup()` ved fjerning. CSS og native radiovalg fungerer uten JS; overflow-piler trenger
atferden. Det valgte elementet bruker to-lags design-skygge fra de semantiske
drop-shadow-fargene; det er en distinkt aktiv-element-skygge i stedet for en eksisterende
`--instui-elevation-*`-kompositt. Overflow-knapper bruker upstream elevation3-komponent-tokens
gjennom `--pantoken-segmented-overflow-shadow`.

### Skeleton-lasting

`skeleton-loader.css`-subpathen styler én dekorativ Text-, Avatar- eller Image-form. Text aksepterer
`-size-xxs` gjennom `-size-xxl`; Avatar og Image er medium-størrelse. Hver valgfrie `.skeleton-row`
legger til én tekstlinje uten å endre størrelsen. CSS-shimmeren stopper etter tre 1.5-sekunders sveip og
blir statisk når brukeren foretrekker redusert bevegelse. Den fungerer før JavaScript laster.

Plasser former bare der spørringsavhengig innhold vil dukke opp, ikke over serverkjent navigasjon,
filtre, overskrifter eller kontroller. Et skeleton er ikke en fremdriftsindikator eller en action-busy-tilstand. Behold
eksisterende innhold synlig under bakgrunnsoppdateringer; bruk en spinner eller knapp-busy-tilstand for handlinger.

Den overordnede applikasjonen eier loading-, loaded-, empty- og error-markup. Gi ett tomt statusområde
per side og et separat empty-alert i server-HTML-en, begge **utenfor** det travle innholdsområdet:

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

Kall parent-nivå-oppførselen når forespørselsstatus endres. Den oppdaterer `aria-busy` og de to
forhåndseksisterende annonseringene, men den erstatter aldri innhold eller flytter fokus:

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

Hvis du bruker per-komponent interaksjonsbundle i stedet for direkte import, dispatch en
`pantoken:skeleton-state`-hendelse på `[data-skeleton-region]`-elementet med
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Forsink _visning_ av plassholdere med 200–500 ms for raske forespørsler; atferden forsinker selvstendig loading-
annonseringen med 400 ms. Ved passive sidestarter, la fokus være der det er. Flytt kun fokus til et nylig
lastet resultat når brukerens egen handling ba om det. Status-noden annonserer resultater og tomme
tilstander; alert-noden annonserer feil. Ikke kombiner `aria-busy`, `role="status"` og
`role="alert"` på ett element.

Lucide Labs register kan lastes late, og deretter sendes til den synkrone token-kroken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Noe som tidligere var plugins, leveres nå i `@pantoken/components`, siden så mange komponenter
trenger dem fra boksen: elevasjonsskygger (`--instui-elevation-*`, i `components.css`), fokus-omrislingsringen
(i `base.css` — alle fokusbare får den når pantoken eier siden), og Instructure brand-
fonter (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den opt-in
`@pantoken/components/fonts.css` laster `@font-face` woff2-filene).

## Tema-farger

`@pantoken/plugin-custom-theme-colors` emitterer ett `[data-pantoken-color="…"]`-blokk per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver blokk peker brand-primitivene (`--instui-primitive-color-navy-*` og `-blue-*`)
mot den valgte paletten. Den re-deriverer også brand-surface-verdier som upstream flattet til literal hex,
og beholder deres bakt alpha gjennom `color-mix()`. Semantiske statusfarger, eksplisitte blå aksenter, og
elevasjonsskygger forblir uendret. Prøv det i
[swatch-baserte theming-demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Egendefinert brand-farge

Sett `data-pantoken-color="custom"` for å rebrande fra hvilken som helst hex, for eksempel primærfargen en Canvas-admin
skriver inn i Theme Editor. pantoken utleder en full 10–200 `--instui-primitive-color-custom-*`
skala fra den:

1. **Referansekurve.** Hvert trinns målte lyshet er gjennomsnittlig OKLCH-lyshet av de 13
   palettene ved det trinnet, med 0 fastsatt til hvitt og 210 til svart. Dermed matcher det egendefinerte skalaplasseringen
   de leverte palettenes.
2. **Anker.** Inndataen lander på trinnet hvis målte lyshet er nærmest sin egen, og snappes til
   den eksakte lysheten. `#cccccc` blir `custom-40` ved `#c9c9c9`: nær inputen, men ikke
   alltid identisk. "Nærmest" betyr nærmeste trinn på kurven, ikke nærmeste eksisterende palettfarge.
3. **Fyll.** Hvert annet trinn beholder inputens hue. Dens metning følger palettenes gjennomsnittlige
   metningskurve relativt til ankeren, og reduseres kun der en farge faller utenfor sRGB.

Kun `#rgb` og `#rrggbb` aksepteres; alt annet kaster en `TypeError`, så en hex fra et skjema
kan ikke injisere CSS.

Ved byggetid, emitter hele regelen med de avledede primitive allerede deklarert:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For å velge fargen ved kjøretid uten å sende med token-settet, forhåndsberegn kurven og remap-
regelen ved byggetid. Bruk deretter den avhengighetsfrie `/scale`-oppføringen i nettleseren, og sett bare de 20
avledede primitivene:

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

Doksites tema-plukker, Canvas Theme Editor, og demoen over fungerer alle på denne måten.

Se [API-referansen](/api/) for hver plugins eksport.
