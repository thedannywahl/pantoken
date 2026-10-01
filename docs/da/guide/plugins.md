# Plugins

En pantoken-plugin udvider token- eller CSS-output uden at forgrene et pakkebibliotek. Den bygges med `definePlugin` fra `@pantoken/plugin-kit`, og sendes derefter til `buildTokens` eller `toCss`.

## Forfat en plugin

Giv `definePlugin` de hooks, du implementerer. Den returnerer en almindelig plugin, mærket med de kapaciteter, der udledes fra disse hooks. En plugin kan udvide IR'en (`tokens`, `icons`), CSS-outputtet (`css`), eller begge dele.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapacitetsbevidst registrering

`buildTokens` og `toCss` kører `checkPlugins` over de plugins, du sender. Den advarer — den kaster aldrig — når en plugin ikke har en matchende hook for det stadium, den er registreret i, så en kun-token plugin, der gives til `toCss`, bliver sprunget over med en note i stedet for stiltiende at intet gøre.

## Sammensæt plugins

Byg videre ovenpå en anden plugin med `extendPlugin`, eller kombiner jævnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks i samme stadium komponeres: `tokens` kører basen og derefter tillægget, `css` merger de to bidrag, og `icons` kører begge.

## Valider plugin'ens output

Kør de delte drift-checks fra `@pantoken/utils` over plugin'ens eget output i dens test, så en stavefejl eller et omdøbt token fejler hurtigt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundtede plugins

- `@pantoken/plugin-simple-icons` — brand-ikoner fra simple-icons, registreret som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registreret som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogoer som SVG'er, data-URIs og `--instui-logo-*` image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin), der fjerner ubrugte custom properties fra et stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrander en side ved at sætte et attribut (`data-pantoken-color`) til en af 13 paletter, eller til `custom` for enhver brand-hex. Se [Theme colors](#theme-colors).
- `@pantoken/plugin-custom-components` — token-drevne custom controls inklusive SegmentedControl og SkeletonLoader.

### Segmenteret kontrol

Brug en segmenteret kontrol til to til fem relaterede visninger eller filtre. Hver mulighed er en mærket native radio i en navngiven gruppe; angiv en som checked initialt. Brug tabs eller en dropdown hvis mulighederne ikke passer komfortabelt, og brug buttongrupper til handlinger i stedet for valg. `-size-md`-stilen er standard, med `-size-sm` og `-size-lg` for tættere og mere fremtrædende kontekster.

Importer `@pantoken/plugin-custom-components/segmented-control.css` for kontrollen og dens overflow-knapper. Brug en `-icon-*`-klasse på et segment-label når segmentet behøver et glyph; interaktionshjælperen promoverer også en `-icon-*`-klasse fra dens native input til label-painten. Giv fieldset et beskrivende `aria-label` eller en synlig legend. Hjælperen bevarer den native radio-annoncering, tilføjer tastaturnavigation, og kan valgfrit afsløre ét afskåret segment per piltryk. Brug logiske start/slut-kontroller og tilgængelige knap-etiketter i begge retninger:

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

Importer `@pantoken/interactions/segmented-control.iife.js` for DOM-klar registrering, eller kald `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` fra `@pantoken/interactions` og kald `cleanup()` ved fjernelse. CSS og native radio-valg virker uden JS; overflow-pile kræver adfærden. Det valgte element bruger det to-lags designskygge fra de semantiske drop-shadow-farver; det er en distinkt active-item-skygge i stedet for et eksisterende `--instui-elevation-*` composite. Overflow-knapper bruger upstream elevation3-komponent-tokens gennem `--pantoken-segmented-overflow-shadow`.

### Skeleton-loading

`skeleton-loader.css`-substien styler én dekorativ Text-, Avatar- eller Image-form. Text accepterer `-size-xxs` gennem `-size-xxl`; Avatar og Image er mellemstore. Hver valgfrie `.skeleton-row` tilføjer en tekstlinje uden at ændre størrelsen. CSS-shimmeren stopper efter tre sweeps på 1,5 sekunder og forbliver statisk når brugeren foretrækker reduceret bevægelse. Den virker inden JavaScript indlæses.

Placer former kun hvor forespørgselsafhængigt indhold vil dukke op, ikke ovenpå server-kendt navigation, filtre, overskrifter eller kontroller. Et skeleton er ikke en progress-meter eller et action-busy-tilstand. Hold eksisterende indhold synligt under baggrundsopdateringer; brug en spinner eller en knap-busy-tilstand til handlinger.

Den overordnede applikation ejer loading-, loaded-, empty- og error-markup. Giv ét empty-statusområde per side og en separat empty-alert i server-HTML'en, begge **udenfor** det travle indholdsområde:

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

Kald forældreniveauets adfærd når request-tilstanden ændrer sig. Den opdaterer `aria-busy` og de to forud-eksisterende annonceringer, men den erstatter aldrig indhold eller flytter fokus:

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

Hvis den per-komponent interaktionsbundle bruges i stedet for direkte import, dispatch et `pantoken:skeleton-state` event på `[data-skeleton-region]`-elementet med `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Forsink _visning_ af placeholders med 200–500 ms for hurtige forespørgsler; adfærden forsinker uafhængigt loading-annonceringen med 400 ms. Ved passive sideindlæsninger, lad fokus blive hvor det er. Flyt kun fokus til et nyindlæst resultat når brugerens egen handling anmodede det. Statusnodet annoncerer resultater og tomme tilstande; alert-nodet annoncerer fejl. Kombiner ikke `aria-busy`, `role="status"`, og `role="alert"` på ét element.

Lucide Labs registry kan indlæses lazy, og derefter sendes til den synkrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Et par ting, som tidligere var plugins, leveres nu i `@pantoken/components`, da så mange komponenter har brug for dem ud af boksen: elevation-skager (`--instui-elevation-*`, i `components.css`), focus-outline-ringen (i `base.css` — hver fokusérbar får den når pantoken ejer siden), og Instructure-brand-fonts (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den opt-in `@pantoken/components/fonts.css` indlæser `@font-face` woff2'erne).

## Tema-farver

`@pantoken/plugin-custom-theme-colors` udsender én `[data-pantoken-color="…"]` blok per palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver blok peger de brand-primitiver (`--instui-primitive-color-navy-*` og `-blue-*`)
mod den valgte palet. Den re-deriverer også de brand-surfacefarver, som upstream havde fladet til litterære hex-værdier, og bevarer deres bagte alpha gennem `color-mix()`. Semantiske statusfarver, eksplicitte blå accenter og elevation-skager forbliver uændrede. Prøv det i [swatch-baseret theming-demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Tilpasset brandfarve

Sæt `data-pantoken-color="custom"` for at rebrande fra enhver hex, som f.eks. primærfarven en Canvas-admin skriver ind i Theme Editor. pantoken udleder en fuld 10–200 `--instui-primitive-color-custom-*`-skala fra den:

1. **Referencekurve.** Hvert trin målte lyshed er den gennemsnitlige OKLCH-lyshed af de 13 paletter ved det trin, med 0 fastsat til hvid og 210 til sort. Så den tilpassede skalaes afstand svarer til de leverede paletters.
2. **Anker.** Inputtet lander på det trin hvis målte lyshed er nærmest dets egen, og snaps derefter til den præcise lyshed. `#cccccc` bliver `custom-40` ved `#c9c9c9`: tæt på inputtet, men ikke altid identisk. "Nærmest" betyder nærmeste trin på kurven, ikke den tætteste eksisterende paletfarve.
3. **Fyld.** Hvert andet trin bevarer inputtets hue. Dens saturation følger paletternes gennemsnitlige saturationkurve relativt til ankeret, og reduceres kun hvor en farve falder uden for sRGB.

Kun `#rgb` og `#rrggbb` accepteres; alt andet kaster en `TypeError`, så en hex fra en formular ikke kan injicere CSS.

Ved build-tid udsend reglen fuldt ud med de afledte primitive allerede deklareret:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For at vælge farven ved runtime uden at sende hele token-sættet, præberegn kurven og remap-reglen ved build-tid. Brug derefter den afhængighedsfrie `/scale`-entry i browseren, og sæt kun de 20 afledte primitiv:

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

Docs-site'ets theme-picker, Canvas theme editor og demoen ovenfor fungerer alle på denne måde.

Se [API reference](/api/) for hver plugins eksport.
