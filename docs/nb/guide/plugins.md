# Plugins

En pantoken-plugin utvider token- eller CSS-utdata uten å forke et pakke. Bygg en med
`definePlugin` fra `@pantoken/plugin-kit`, og gi den deretter til `buildTokens` eller `toCss`.

## Lag en plugin

Gi `definePlugin` krokene du implementerer. Den returnerer en normal plugin, merket med
kapabiliteter avledet fra disse krokene. En plugin kan utvide IR (`tokens`, `icons`), CSS-utdataene
(`css`), eller begge deler.

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

`buildTokens` og `toCss` kjører `checkPlugins` over pluginene du passerer. Den advarer — den kaster aldri —
når en plugin ikke har en matchende krok for stadiet den er registrert i, så en token-only plugin sendt
til `toCss` blir hoppet over med en merknad i stedet for å gjøre ingenting stille.

## Komponer plugins

Bygg videre på en annen plugin med `extendPlugin`, eller kombiner jevnaldrende med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Kroker i samme stadium komponeres: `tokens` kjører basen først og så tillegg, `css` slår sammen de to
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

## De bundlende pluginene

- `@pantoken/plugin-simple-icons` — merke ikoner fra simple-icons, registrert som icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrert som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVGer, data-URIer og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin) som fjerner
  ubrukte custom properties fra et stylesheet.
- `@pantoken/plugin-custom-theme-colors` — ommerker en side ved å sette ett attributt
  (`data-pantoken-color`) til en av 13 paletter, eller til `custom` for hvilken som helst brand-hex. Se
  [Tema-farger](#theme-colors).

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

Noe som tidligere var plugins leveres nå i `@pantoken/components`, siden så mange komponenter trenger
dem ferdig ut av boksen: elevasjonsskygger (`--instui-elevation-*`, i `components.css`), focus-outline
ringen (i `base.css` — hver fokusbar får den når pantoken eier siden), og Instructure-brand
fontene (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den valgfrie
`@pantoken/components/fonts.css` laster `@font-face` woff2-ene).

## Tema-farger {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emitterer ett `[data-pantoken-color="…"]` blokk per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver blokk peker de brand-primitivene (`--instui-primitive-color-navy-*` og `-blue-*`)
mot den valgte paletten. Den avleder også brand-surface-verdier som upstream flattet til bokstavelig hex,
og bevarer deres innbakte alfa gjennom `color-mix()`. Semantiske statusfarger, eksplisitte blå aksenter, og
elevasjonsskygger forblir uendret. Prøv det i
[swatch-baserte theming-demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Egendefinert brand-farge

Sett `data-pantoken-color="custom"` for å ommerke fra en hvilken som helst hex, slik som primærfargen en Canvas-administrator
skriver inn i Theme Editor. pantoken avleder en full 10–200 `--instui-primitive-color-custom-*`
skala fra den:

1. **Referansekurve.** Hver stegs mål-lyshet er gjennomsnittet av OKLCH-lysheten for de 13
   palettene på det steget, med 0 festet til hvitt og 210 til svart. Så den egendefinerte skalas avstand
   matcher de leverte palettenes.
2. **Anker.** Inndata lander på steget hvis mål-lyshet er nærmest sin egen, og snapper deretter til
   den eksakte lysheten. `#cccccc` blir `custom-40` ved `#c9c9c9`: nær inndata, men ikke
   alltid identisk. "Nærmest" betyr nærmeste steg på kurven, ikke nærmeste eksisterende palettfarge.
3. **Utfylling.** Hvert annet steg beholder inndatas fargetone. Dens metning følger palettenes gjennomsnittlige
   metningskurve relativt til ankeren, og reduseres bare der en farge faller utenfor sRGB.

Kun `#rgb` og `#rrggbb` aksepteres; alt annet kaster en `TypeError`, så en hex fra et skjema
kan ikke injisere CSS.

Ved byggtid, emitter hele regelen med de avledede primitivene allerede deklarert:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For å plukke fargen ved runtime uten å levere token-settet, preberegn kurven og remap-regelen ved byggtid. Bruk så den avhengighetsfrie `/scale`-oppføringen i nettleseren, og sett kun de 20
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

Dokumentnettstedets tema-plukker, Canvas theme editor, og demoen over fungerer alle på denne måten.

Se [API-referansen](/api/) for hver plugins eksport.
