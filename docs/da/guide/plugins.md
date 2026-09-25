# Plugins

En pantoken-plugin udvider token- eller CSS-output uden at forgrene et package. Den bygges med
`definePlugin` fra `@pantoken/plugin-kit`, og derefter gives den til `buildTokens` eller `toCss`.

## Forfatter en plugin

Giv `definePlugin` de hooks, du implementerer. Den returnerer en normal plugin, mærket med de
kapaciteter, der udledes fra disse hooks. En plugin kan udvide IR'en (`tokens`, `icons`), CSS-outputtet (`css`), eller begge dele.

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

`buildTokens` og `toCss` kører `checkPlugins` over de plugins, du giver dem. Den advarer — den kaster aldrig —
når en plugin ikke har en matchende hook for den fase, den er registreret i, så en token-only plugin givet
til `toCss` bliver sprunget over med en note i stedet for at være lydløst inaktiv.

## Sæt plugins sammen

Byg oven på en anden plugin med `extendPlugin`, eller kombiner jævnbyrdige med `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks i samme fase komponereres: `tokens` kører basen og derefter tilføjelsen, `css` fletter de to
bidrag, og `icons` kører begge.

## Valider dit plugins output

Kør de delte drift-checks fra `@pantoken/utils` over dit plugins eget output i dets test, så en
stavfejl eller et omdøbt token fejler hurtigt og lokalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De bundtede plugins

- `@pantoken/plugin-simple-icons` — brand-ikoner fra simple-icons, registreret som icon tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikoner, registreret som `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — Instructure produktlogoer som SVG'er, data URIs og `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — en PostCSS-plugin (ikke en pantoken-plugin) der fjerner
  ubrugte custom properties fra et stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrander en side ved at sætte et attribut
  (`data-pantoken-color`) til en af 13 palettes, eller til `custom` for et vilkårligt brand-hex. Se
  [Tema-farver](#theme-colors).

Lucide Lab's register kan indlæses lazy, og så gives til den synkrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Et par ting, som tidligere var plugins, leveres nu i `@pantoken/components`, da så mange komponenter
brug for dem direkte: elevation-skugger (`--instui-elevation-*`, i `components.css`), fokus-outline
ringen (i `base.css` — alle fokuserbare får den, når pantoken ejer siden), og Instructure brand-
fonte (Atkinson Hyperlegible Next: `base.css` anvender `--instui-font-family-base`; den opt-in
`@pantoken/components/fonts.css` indlæser `@font-face` woff2'erne).

## Tema-farver {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emitterer ét `[data-pantoken-color="…"]` blok per palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver blok peger brand-primitiverne (`--instui-primitive-color-navy-*` og `-blue-*`)
mod den valgte palette. Den genafleder også brand-flader, som upstream fladede til litterære hex-værdier,
og bevarer deres indbagte alpha via `color-mix()`. Semantiske status-farver, eksplicitte blå accenter og
elevation-skugger forbliver uændrede. Prøv det i
[swatch-baseret theming demoen](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Tilpasset brandfarve

Sæt `data-pantoken-color="custom"` for at rebrande fra et vilkårligt hex, såsom den primære farve en Canvas-admin
indtaster i Theme Editor. pantoken afleder en fuld 10–200 `--instui-primitive-color-custom-*`
skala fra den:

1. **Referencekurve.** Hvert trin's mål-lyshed er gennemsnittet af OKLCH-lysheden for de 13
   palettes ved det trin, med 0 fikseret ved hvid og 210 ved sort. Så den tilpassede skala's afstand
   matcher de leverede palettes'.
2. **Anker.** Inputtet lander på det trin, hvis mål-lyshed er tættest på dens egen, og snaps derefter til
   den præcise lyshed. `#cccccc` bliver `custom-40` ved `#c9c9c9`: tæt på inputtet, men ikke
   altid identisk. "Tættest" betyder nærmeste trin på kurven, ikke den nærmeste eksisterende palette-
   farve.
3. **Fyld.** Hvert andet trin bevarer inputtets hue. Dets saturation følger palettes' gennemsnitlige
   saturation-kurve relativt til ankret, og reduceres kun hvor en farve falder uden for sRGB.

Kun `#rgb` og `#rrggbb` accepteres; alt andet kaster en `TypeError`, så et hex fra et formularfelt
kan ikke injicere CSS.

Ved build-tid emitteres hele reglen med de afledte primitiv allerede erklæret:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

For at vælge farven ved runtime uden at sende token-sættet, præberegn kurven og remap-reglen ved build-tid. Brug så den afhængighedsfrie `/scale` entry i browseren, og sæt kun de 20
afledte primitiv:

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

Docs-sidens theme-picker, Canvas theme editoren, og demoen ovenfor virker alle på denne måde.

Se [API reference](/api/) for hver plugins eksporter.
