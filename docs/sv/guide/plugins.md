# Plugins

En pantoken-plugin utökar token- eller CSS-utdata utan att forka ett paket. Den byggs med
`definePlugin` från `@pantoken/plugin-kit`, och skickas sedan till `buildTokens` eller `toCss`.

## Skapa en plugin

Ge `definePlugin` de hooks du implementerar. Den returnerar en normal plugin, märkt med de
möjligheter som härleds från dessa hooks. En plugin kan utöka IR (`tokens`, `icons`), CSS-utdata (`css`), eller båda.

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

`buildTokens` och `toCss` kör `checkPlugins` över plugins du skickar in. Den varnar — den kastar aldrig —
när en plugin saknar en matchande hook för det skede den registrerats i, så en token-endast plugin som skickas
till `toCss` hoppas över med en notis istället för att tyst göra ingenting.

## Komponera plugins

Bygg ovanpå en annan plugin med `extendPlugin`, eller kombinera jämlikar med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks för samma skede komponerar: `tokens` kör basen och sedan tillägget, `css` slår ihop de två
bidragen, och `icons` kör båda.

## Validera din plugins utdata

Kör de delade drift-kontrollerna från `@pantoken/utils` över din plugins egna utdata i dess test, så ett
typo eller en omdöpt token misslyckas snabbt och lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De inkluderade plugins

- `@pantoken/plugin-simple-icons` — varumärkesikoner från simple-icons, registrerade som ikon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikoner, registrerade som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogotyper som SVG:er, data-URI:er och `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (inte en pantoken-plugin) som tar bort
  oanvända custom properties från ett stylesheet.
- `@pantoken/plugin-custom-theme-colors` — ommärker en sida genom att sätta ett attribut
  (`data-pantoken-color`) till en av 13 paletter, eller till `custom` för vilken varumärkes-hex som helst. Se
  [Temafärger](#temafärger).

Lucide Labs register kan laddas latein, och sedan skickas till den synkrona token-hooken:

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
dem direkt: elevation-skuggor (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — alla fokuserbara får den när pantoken kontrollerar sidan), och Instructure varumärkes
typsnitt (Atkinson Hyperlegible Next: `base.css` tillämpar `--instui-font-family-base`; den opt-in
`@pantoken/components/fonts.css` laddar `@font-face` woff2:orna).

## Temafärger

`@pantoken/plugin-custom-theme-colors` emitterar en `[data-pantoken-color="…"]`-block per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Varje block pekar de varumärkesprimitiverna (`--instui-primitive-color-navy-*` och `-blue-*`)
mot den valda paletten. Det härleder också de varumärkesytor som upstream plattade till litterala hex,
och behåller deras inbakade alfa genom `color-mix()`. Semantiska statusfärger, explicita blå accenter och
elevation-skuggor förblir intakta. Prova det i
[swatch-baserade theming-demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Anpassad varumärkesfärg

Sätt `data-pantoken-color="custom"` för att ommärka från vilken hex som helst, till exempel den primära färgen en Canvas-administratör
skriver in i Theme Editor. pantoken härleder en full 10–200 `--instui-primitive-color-custom-*`
skala från den:

1. **Referenskurva.** Varje stegs mål-ljushet är medelvärdet av OKLCH-ljusheten för de 13
   paletterna vid det steget, med 0 fixerat vid vitt och 210 vid svart. Så den anpassade skalans avstånd
   matchar de levererade paletternas.
2. **Ankare.** Indata hamnar på det steg vars mål-ljushet är närmast dess egen, och snappas sedan till
   den exakta ljusheten. `#cccccc` blir `custom-40` vid `#c9c9c9`: nära indata, men inte
   alltid identisk. "Närmast" betyder närmaste steg på kurvan, inte närmaste befintliga palettfärg.
3. **Fyllning.** Varje annat steg behåller indatans nyans. Dess mättnad följer paletternas genomsnittliga
   mättnadskurva relativt ankaret, och reduceras endast där en färg hamnar utanför sRGB.

Endast `#rgb` och `#rrggbb` accepteras; allt annat kastar en `TypeError`, så en hex från ett formulär
kan inte injicera CSS.

Vid build-tid, emitera hela regeln med de härledda primitiverna redan deklarerade:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

För att välja färgen vid runtime utan att leverera token-setet, förberäkna kurvan och remap-regeln vid build-tid. Använd sedan den beroendefria `/scale`-ingången i webbläsaren, och sätt endast de 20
härledda primitiverna:

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

Docs-sidans tema-väljare, Canvas theme editor och demon ovan fungerar alla på detta sätt.

Se [API-referensen](/api/) för varje plugins exports.
