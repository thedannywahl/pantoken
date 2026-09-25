# Viðbætur

pantoken-viðbót stækkar token- eða CSS-útganginn án þess að forka pakkann. Hún er byggð með `definePlugin` frá `@pantoken/plugin-kit` og síðan send til `buildTokens` eða `toCss`.

## Ritaðu viðbót

Gefðu `definePlugin` þær krokar sem þú innleiðir. Hún skilar venjulegri viðbót, merkt með þeim eiginleikum sem dregnir eru af þeim krokum. Viðbót getur stækkað IR-ið (`tokens`, `icons`), CSS-útganginn (`css`), eða bæði.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Skráning með vitneskju um getu

`buildTokens` og `toCss` keyra `checkPlugins` yfir þær viðbætur sem þú sendir. Hún gefur viðvörun — hún kastar aldrei — þegar viðbót hefur engan samsvarandi krok fyrir þann áfanga sem hún er skráð í, svo token-eina viðbót sem send er til `toCss` er hoppuð yfir með skráningu frekar en að sitja þegjandi án árangurs.

## Samsetja viðbætur

Byggðu ofan á aðra viðbót með `extendPlugin`, eða sameina jafningja með `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Krokar á sama stigi samsetjast: `tokens` keyrir grunninn og síðan viðbótina, `css` sameinar tvær framlagningar, og `icons` keyrir báða.

## Staðfestu útgang viðbótarinnar

Keyrðu sameiginlegar drift-checks frá `@pantoken/utils` á útgang viðbótarinnar í prófunum hennar, svo stafsetningarvilla eða endurnefnd token bregðast fljótt og innlendis:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Innbyggðar viðbætur

- `@pantoken/plugin-simple-icons` — merkjamerki frá simple-icons, skráð sem icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab tákn, skráð sem `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure vörumerki sem SVG, data-URI og `--instui-logo-*` image-tokens.
- `@pantoken/plugin-prune-custom-props` — PostCSS-viðbót (ekki pantoken-viðbót) sem fjarlægir ónotaðar sérsniðnar eiginleitnir úr stílblaði.
- `@pantoken/plugin-custom-theme-colors` — endurmerkir síðu með því að setja eina eiginleika
  (`data-pantoken-color`) í eitt af 13 litasöfnum, eða í `custom` fyrir hvaða merkis-hex sem er. Sjá
  [Þema-litir](#theme-colors).

Skrá Lucide Lab má hlaða keyrslutímalega (lazily) og síðan senda til samstillta token-kroksins:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nokkur atriði sem áður voru viðbætur eru nú hluti af `@pantoken/components`, þar sem svo margar íhlutir þurfa þær upphaflega: hæðarskuggar (`--instui-elevation-*`, í `components.css`), fókus-útlínuhringurinn (í `base.css` — hver færanlegur hlutur fær hann þegar pantoken á síðuna), og Instructure merkisletur (Atkinson Hyperlegible Next: `base.css` beitir `--instui-font-family-base`; valfrjálsa `@pantoken/components/fonts.css` hleður `@font-face` woff2-skrám).

## Þema-litir

`@pantoken/plugin-custom-theme-colors` sendir út einn `[data-pantoken-color="…"]` kubb fyrir hvert litasafn
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Hver kubbur bendir merkis-grunneindirnar (`--instui-primitive-color-navy-*` og `-blue-*`)
á valda litasafnið. Hann endurleiðir einnig merkis-flötinn sem upstream flataði út í bókstöfum hex, og heldur baktíma-alpha með `color-mix()`. Tákntilits-litir, skýr blá áhersla, og hæðarskuggar haldast óbreyttir. Prófaðu í
[swatch-byggða þemu-dæminu](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Sérsniðið merkislitur

Stilltu `data-pantoken-color="custom"` til að endurmerkja frá hvaða hex sem er, svo sem aðal-litur sem Canvas stjórnandi slær inn í Þema ritstjórann. pantoken afleður fulla 10–200 `--instui-primitive-color-custom-*`
kvarða úr honum:

1. **Tilvísunarkúrfa.** Markmiðs-ljósleiki hvers þreps er meðaltal OKLCH-ljósleika 13 litasafna við það þrep, með 0 föst á hvítu og 210 á svörtu. Þannig passar bilun sérsniðna skalanum við upphaflegu litasöfnin.
2. **Akkeri.** Inntakið lendir á því þrepi sem markmiðs-ljósleikinn er næstur eigin ljósi þess, og smellur á þann nákvæma ljósleika. `#cccccc` verður að `custom-40` við `#c9c9c9`: nálægt inntakinu, en ekki alltaf eins. „Næst“ merkir næsta þrep á kúrfunni, ekki það litnasta í núverandi litasöfnum.
3. **Fylla.** Öll önnur þrep halda litstefnu inntaksins. Mettun þess fylgir meðaltalsmettun kúrfunni frá litasöfnum miðað við akkerið, og er minnkuð aðeins þar sem litur lendir utan sRGB-mælanlegs sviðs.

Aðeins `#rgb` og `#rrggbb` eru viðurkennd; allt annað kastar `TypeError`, svo hex úr formi getur ekki sprautað CSS.

Við byggingu sendu út alla reglu með afleiddum grunn-einingum þegar þær eru þegar lýst:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Til að velja litinn keyrslutíma án þess að senda tokensættið, forreiknaðu kúrfunna og remap-regluna við byggingu. Notaðu síðan háðarleysa `/scale` innsláttinn í vafranum og stilltu aðeins 20
afleiddu grunn-einingarnar:

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

Þema-valmynd skjalsins, Canvas þema ritillinn og dæmið hér að ofan virka öll á þennan hátt.

Sjá [API-tilvísunina](/api/) fyrir útflutning hvers viðbótar.
