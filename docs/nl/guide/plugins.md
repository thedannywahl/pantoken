# Plugins

Een pantoken-plugin breidt de token- of CSS-uitvoer uit zonder een pakket te forksen. Bouw er één met
`definePlugin` van `@pantoken/plugin-kit`, en geef deze vervolgens door aan `buildTokens` of `toCss`.

## Een plugin schrijven

Geef `definePlugin` de hooks die je implementeert. Het retourneert een normale plugin, gebrandmerkt met de
capabilities die uit die hooks worden afgeleid. Een plugin kan de IR uitbreiden (`tokens`, `icons`), de CSS
uitvoer (`css`), of beide.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Capability-aware registratie

`buildTokens` en `toCss` voeren `checkPlugins` uit over de plugins die je doorgeeft. Het waarschuwt — het gooit nooit —
wanneer een plugin geen bijpassende hook heeft voor de fase waarin het geregistreerd is, dus een alleen-token-plugin die
aan `toCss` wordt doorgegeven wordt overgeslagen met een melding in plaats van stilletjes niets te doen.

## Plugins samenstellen

Bouw voort op een andere plugin met `extendPlugin`, of combineer peers met `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks in dezelfde fase composeren: `tokens` voert eerst de basis en daarna de toevoeging uit, `css` voegt de twee
bijdragen samen, en `icons` voert beide uit.

## Valideer de uitvoer van je plugin

Voer de gedeelde drift-controles van `@pantoken/utils` uit over de eigen uitvoer van je plugin in zijn test, zodat een
typefout of een hernoemde token snel en lokaal faalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De meegeleverde plugins

- `@pantoken/plugin-simple-icons` — brandicons van simple-icons, geregistreerd als icon tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-icoontjes, geregistreerd als `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure productlogo's als SVG's, data-URI's, en `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — een PostCSS-plugin (geen pantoken-plugin) die ongebruikte custom properties uit een stylesheet verwijdert.
- `@pantoken/plugin-custom-theme-colors` — rebrandt een pagina door één attribuut
  (`data-pantoken-color`) in te stellen op één van 13 paletten, of op `custom` voor een willekeurige brand-hex. Zie
  [Themakleuren](#theme-colors).

Het register van Lucide Lab kan lui geladen worden en vervolgens worden doorgegeven aan de synchrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Een paar dingen die vroeger plugins waren, worden nu meegeleverd in `@pantoken/components`, omdat zoveel componenten
ze standaard nodig hebben: elevation-shadows (`--instui-elevation-*`, in `components.css`), de focus-outline
ring (in `base.css` — elke focusable krijgt deze wanneer pantoken de pagina beheert), en de Instructure merkfonts
(Atkinson Hyperlegible Next: `base.css` past `--instui-font-family-base` toe; de opt-in
`@pantoken/components/fonts.css` laadt de `@font-face` woff2-bestanden).

## Themakleuren

`@pantoken/plugin-custom-theme-colors` genereert één `[data-pantoken-color="…"]` blok per palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Elk blok wijst de brand-primitieven (`--instui-primitive-color-navy-*` en `-blue-*`)
naar het gekozen palet. Het leidt ook de brand-oppervlakken die upstream naar letterlijke hexwaarden waren afgevlakt opnieuw af,
en behoudt hun ingebakken alpha via `color-mix()`. Semantische statuskleuren, expliciete blauwe accenten en
elevationschaduwen blijven ongewijzigd. Probeer het in de
[swatch-gebaseerde theming-demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Aangepaste merk kleur

Stel `data-pantoken-color="custom"` in om te rebranden vanuit een willekeurige hex, zoals de primaire kleur die een Canvas-beheerder
in de Theme Editor typt. pantoken deriveert daaruit een volledige 10–200 `--instui-primitive-color-custom-*`
schaal:

1. **Referentiecurve.** De doel-lightness van elke stap is het gemiddelde OKLCH-lightness van de 13
   paletten op die stap, met 0 vastgezet op wit en 210 op zwart. Dus de afstandsindeling van de aangepaste schaal
   komt overeen met die van de meegeleverde paletten.
2. **Anker.** De invoer valt op de stap waarvan de doel-lightness het dichtst bij die van de invoer ligt, en klikt vervolgens vast op
   die exacte lightness. `#cccccc` wordt `custom-40` op `#c9c9c9`: dichtbij de invoer, maar niet
   altijd identiek. "Dichtst" betekent de dichtstbijzijnde stap op de curve, niet de dichtstbijzijnde bestaande paletkleur.
3. **Vulling.** Iedere andere stap behoudt de hue van de invoer. De verzadiging volgt de gemiddelde
   verzadigingscurve van de paletten ten opzichte van het anker, en wordt alleen verminderd waar een kleur buiten sRGB valt.

Alleen `#rgb` en `#rrggbb` worden geaccepteerd; alles anders gooit een `TypeError`, dus een hex uit een formulier
kan geen CSS-injectie uitvoeren.

Tijdens buildtijd, emit het volledige regelwerk met de afgeleide primitieven al gedeclareerd:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Om de kleur bij runtime te kiezen zonder de token-set te versturen, precomputeer de curve en de remap-regel tijdens buildtijd. Gebruik dan de dependency-vrije `/scale` entry in de browser, en stel enkel de 20
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

De theme-picker op de docsite, de Canvas theme editor en de demo hierboven werken allemaal op deze manier.

Zie de [API reference](/api/) voor de exports van elke plugin.
