# Pluginar

Ein pantoken-plugin utvidar token- eller CSS-utdata utan å forke eit pakkje. Bygg han med
`definePlugin` frå `@pantoken/plugin-kit`, og pass han deretter til `buildTokens` eller `toCss`.

## Skriv ein plugin

Gje `definePlugin` krokane (hooks) du implementerer. Det returnerer ein vanleg plugin, merka med
kapabilitetane som blir infererte frå desse krokane. Ein plugin kan utvide IR-en (`tokens`, `icons`), CSS-utdataene
(`css`), eller begge delar.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Kapabilitets-medviten registrering

`buildTokens` og `toCss` køyrer `checkPlugins` over pluginane du sender inn. Det varslar — det kaster aldri —
når ein plugin ikkje har ein matchande krok for det steget han er registrert i, så ein token-only plugin sendt
til `toCss` blir hoppa over med ei merknad i staden for å gjere ingenting stille.

## Komponer pluginar

Bygg ovanpå ein annan plugin med `extendPlugin`, eller kombiner jevnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Krokane for same steg komponerer: `tokens` køyrer basen først og tillegg etterpå, `css` slår saman dei to
bidraga, og `icons` køyrer begge.

## Verifiser pluginens utdatasett

Køyr dei delte drift-sjekkane frå `@pantoken/utils` over pluginens eigne utdata i testen, slik at ein
skrivefeil eller eit omnamna token feilar raskt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Dei bundla pluginane

- `@pantoken/plugin-simple-icons` — merkjer ikonar frå simple-icons som ikon-token.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-ikonar, registrert som `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure-produktlogoar som SVG-ar, data-URI-ar og `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — ein PostCSS-plugin (ikkje ein pantoken-plugin) som fjerner
  ubrukt custom properties frå eit stilark.
- `@pantoken/plugin-custom-theme-colors` — omprofilerer ei side ved å setje eit attributt
  (`data-pantoken-color`) til éin av 13 palettar, eller til `custom` for vilkårleg brand-hex. Sjå
  [Temafargar](#theme-colors).

Lucide Labs register kan lastast latert, og deretter sendast til den synkrone token-kroken:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Ein del ting som tidlegare var pluginar, blir no leverte i `@pantoken/components`, sidan så mange komponentar treng
dei direkte: elevation-skyggar (`--instui-elevation-*`, i `components.css`), focus-outline-ringen (i `base.css` — alle fokusbare får han når pantoken eig sida), og Instructure-brand-fontane (Atkinson Hyperlegible Next: `base.css` gjev `--instui-font-family-base`; det valfrie
`@pantoken/components/fonts.css` lastar dei `@font-face` woff2-ane).

## Tema-fargar {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emitterer ein `[data-pantoken-color="…"]` blokk per palett
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Kvar blokk peikar dei brand-primitiva (`--instui-primitive-color-navy-*` og `-blue-*`)
mot den valde paletten. Han re-deriverer òg dei brand-overflatene som upstream flata ut til literal hex,
og beheld den bake-inne alfaen gjennom `color-mix()`. Semantiske statusfargar, eksplisitte blå aksentar, og
elevation-skyggar blir ståande. Prøv det i
[swatch-baserte theming-demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Eigensinna brand-farge

Set `data-pantoken-color="custom"` for å omprofilere frå ein vilkårleg hex, som primærfargen ein Canvas-admin
skriver inn i Theme Editor. pantoken deriverer ein full 10–200 `--instui-primitive-color-custom-*`
skala frå han:

1. **Referansekurve.** Målet for lysleiken i kvart steg er gjennomsnittleg OKLCH-lysleik for dei 13
   palettane på det steget, med 0 festa til kvit og 210 til svart. Så det tilpassa skalastegsetet har same
   gap som dei leverte palettane.
2. **Anker.** Inndataen landar på det steget med mållysleik nærast sin eigen, og snappar deretter til
   den nøyaktige lysleiken. `#cccccc` blir `custom-40` ved `#c9c9c9`: nær inndataen, men ikkje
   alltid identisk. "Næraste" betyr næraste steg på kurva, ikkje næraste eksisterande palettfarge.
3. **Fyll.** Kvar anna steg held inndataens hue. Mettnaden følgjer palettane sin gjennomsnittlege
   metningskurve relativt til ankaren, og blir redusert berre der ein farge fell utanfor sRGB.

Berre `#rgb` og `#rrggbb` blir aksepterte; alt anna kastar ein `TypeError`, så ei hex frå eit skjema
kan ikkje injisere CSS.

Ved byggetid emitterer ein heile regelen med dei deriverte primitiva allereie deklarerte:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For å plukke fargen ved runtime utan å shippe token-settet, precompute kurva og remap-regelen ved byggetid. Bruk så den avhengigheitsfrie `/scale`-oppføringa i nettlesaren, og set berre dei 20
deriverte primitiva:

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

Dokumentsida sin temaveljar, Canvas theme editor, og demoen over fungerer alle på denne måten.

Sjå [API-referansen](/api/) for kvart plugins eksportar.
