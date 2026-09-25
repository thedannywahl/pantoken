# Tāpiritanga

He toronga a tētahi tāpiritanga pantoken i te putanga tapatoru rānei o te CSS me te kore hurihuri i tētahi pūrere. Hangaia he mea mā `definePlugin` i `@pantoken/plugin-kit`, kātahi ka tukuna ki `buildTokens` rānei ki `toCss`.

## Tuhia he tāpiritanga

Tukua ki `definePlugin` ngā tūāpapa e whakatinana ana koe. Ka whakahoki mai ia i tētahi tāpiritanga noa, kua tohu ki ngā pūkenga i tīpakohia mai i aua tūāpapa. Ka taea e tētahi tāpiritanga te whakawhānui i te IR (`tokens`, `icons`), te putanga CSS (`css`), rānei ngā rā e rua.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Rehitatanga mō te mōhio pūkenga

Ka whakahaerea e `buildTokens` me `toCss` te `checkPlugins` i runga i ngā tāpiritanga kua tukuna e koe. Ka whakatūpato — kāore ia e whiua — mēnā kāore he tūāpapa e hāngai ana ki te atamira i rehitatia ai te tāpiritanga, nō reira ka whiwhi ake te tāpiritanga-kore-token i tukuna ki `toCss` ki tētahi tuhipoka kaore i te whakarere i te mahi, kāore e noho puku.

## Whakakotahitia ngā tāpiritanga

Hangaia i runga anō i tētahi atu tāpiritanga mā `extendPlugin`, rānei whakakotahitia ngā hoa mā `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Ka whakakotahitia ngā tūāpapa i te atamira kotahi: ka whakahaere tuatahi te `tokens` i te pūtake katahi ka te tāpiritanga, ka whakakotahi te `css` i ngā koha e rua, me te whakahaere anō i ngā `icons` i ngā wā e rua.

## Whakamanahia te putanga o tō tāpiritanga

Whai i ngā whakamātautau ā-rōpū mai i `@pantoken/utils` i runga i te putanga o tō tāpiritanga i roto i tana whakamātautau, kia tūpono he hapa kupu tautuhi rānei kua hurihia tētahi token kia pakaru wawe, ā-rohe hoki:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Ngā tāpiritanga kua pākahukahu

- `@pantoken/plugin-simple-icons` — tohu ā-mārama mai i simple-icons, i rehitatia hei token e tohu ana i te ata.
- `@pantoken/plugin-lucide-lab` — tohu Lucide Lab, i rehitatia hei `--instui-icon-*` token whakaahua.
- `@pantoken/plugin-logos` — tohu hua Instructure hei SVG, URI raraunga, me ngā token whakaahua `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — tētahi tāpiritanga PostCSS (ehara i te tāpiritanga pantoken) e tangohia ana
  ngā rawa taunoa ritenga kāore i whakamahia i tētahi kāwai tauira.
- `@pantoken/plugin-custom-theme-colors` — ka tautohu anō i tētahi whārangi mā te tautuhi i tētahi āhuatanga
  (`data-pantoken-color`) ki tētahi o ngā taupoki 13, rānei ki `custom` mō tētahi hex waitohu. Tirohia
  [Ngā tae kaupapa](#theme-colors).

Ka taea te uta pōturi i te rēhita o Lucide Lab, kātahi ka tukuna ki te tūāpapa token tūnga:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Ko ētahi mea i mua he tāpiritanga ā, kua whakaurua inaianei ki `@pantoken/components`, nā te nui o ngā wāhanga e hiahiatia ana i te pūkete: ngā atarangi whītanga elevation (`--instui-elevation-*`, i roto i `components.css`), te porowhita ā-roa ā-aro (focus-outline) (i roto i `base.css` — ka riro ki ia mea ka taea te aro), me ngā momotuhi waitohu Instructure (Atkinson Hyperlegible Next: `base.css` ka tono `--instui-font-family-base`; ko te kōwhiri `@pantoken/components/fonts.css` ka uta i ngā woff2 `@font-face`).

## Ngā tae kaupapa {#theme-colors}

Ka whakaputa te `@pantoken/plugin-custom-theme-colors` i tētahi poraka `[data-pantoken-color="…"]` mō ia taupoki
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Ia poraka ka tohu i ngā kaupapa tūāpapa waitohu (`--instui-primitive-color-navy-*` me `-blue-*`)
ki te taupoki kua tīpakohia. Ka whakahōu anō hoki i ngā mata waitohu kua pākia ki ngā hex kī i mua i te ara whakamua,
ā, ka pupuri tonu i tō rātou āpha taketake mā `color-mix()`. Ka noho tonu ngā tae ā-tūnga ā-āhua, ngā tohu kikorangi mārama, me ngā atarangi elevation. Whakamātauria i te
[demo kaupapa ā-swatches](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Tae waitohu ritenga

Tautuhia `data-pantoken-color="custom"` kia tautohu anō mai i tētahi hex, pērā i te tae matua ka tāpiri te kaiwhakahaere Canvas
ki te Tāhuri Kaupapa (Theme Editor). Ka whakaputa pantoken i tētahi rēreti pūnoa `--instui-primitive-color-custom-*`
katoa 10–200 mai i taua mea:

1. **Kōwhiringa whakapānga.** Ko te pāmahana ā-putanga o ia hipa ko te toharite o te marama OKLCH o ngā taupoki 13 i taua hipa, me te 0 kua tūpono ki te mā me te 210 ki te pango. Nō reira ka ōrite te wehenga o te rēreti ritenga ki ngā wehenga o ngā taupoki kua tukuna.
2. **Tāhūnga.** Ka tau te whakauru ki te hipa e tata ana tōna marama tūmanako, kātahi ka pakaru ki tēnei marama tonu. Ka riro te `#cccccc` hei `custom-40` i `#c9c9c9`: tata ki te whakauru, engari kāore i te ōrite tonu. Ko te "tata" he tikanga ko te hipa tata i runga i te rēreti, ehara i te tae tata o tētahi taupoki o nāianei.
3. **Whakakī.** Ka pupuri ia atu hipa i te hū kia rite tonu ki te whakauru. Ko tōna whakakōeke ka whai i te karaehe whakakōeke ā-toharite o ngā taupoki e pā ana ki te tāhūnga, ā, ka whakahekehia noa i ngā wā e puta ai tētahi tae kē atu i te sRGB.

Ko te tango noa i `#rgb` me `#rrggbb` e whakaaetia ana; mēnā he āhua kē ka whakahiato `TypeError`, nō reira kāore e taea e tētahi hex i tētahi tūmomo puka te whakauru CSS.

I te wā hanga, whakaputaina te ture katoa me ngā pūnoa kua tīwae kē i mua i te tautuhinga:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Hei tīpuna i te tae i te wā runtime me te kore e tukunga mai i te huinga token, whēkihia te rēreti me te ture remap i te wā hanga. Kātahi whakamahia te tomo kore-ā-whakapā `/scale` i roto i te kaitirotiro, ā, tautuhia noa ngā 20 pūnoa hua:

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

Ko te kaitīpako kaupapa o te paetukutuku tuhinga, te kaiwhakatika kaupapa Canvas, me te whakaaturanga i runga ake ka mahi i tēnei ara.

Tirohia te [Tuhinga API](/api/) mō ngā kaweake o ia tāpiritanga.
