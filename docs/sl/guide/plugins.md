# Vtičniki

Pantoken vtičnik razširi izhod tokenov ali CSS brez odcepa paketa. Zgradite ga z
`definePlugin` iz `@pantoken/plugin-kit`, nato ga posredujte `buildTokens` ali `toCss`.

## Avtor vtičnika

Podajte `definePlugin` hooke, ki jih implementirate. Vrnilo bo običajen vtičnik, označen z
zmožnostmi, izpeljanimi iz teh hookov. Vtičnik lahko razširi IR (`tokens`, `icons`), CSS
izhoda (`css`), ali oboje.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registracija z upoštevanjem zmožnosti

`buildTokens` in `toCss` poganjata `checkPlugins` čez vtičnike, ki jih posredujete. Opozori — nikoli ne vrže izjeme —
ko vtičnik nima ujemajočega se hooka za fazo, v kateri je registriran, zato je vtičnik samo za tokene, posredovan
`toCss`, preskočen z opombo namesto, da bi tiho nič naredil.

## Sestavljanje vtičnikov

Zgradite na vrhu drugega vtičnika z `extendPlugin`, ali združite enakovredne z `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooki iste faze se sestavljajo: `tokens` zažene osnovnega, potem dodatek, `css` združi oba
prispevka, in `icons` zažene oba.

## Validacija izhoda vašega vtičnika

Zaženite skupne drift preverbe iz `@pantoken/utils` nad izhodom vašega vtičnika v njegovem testu, tako da
tipkarska napaka ali preimenovan token hitro napake lokalno:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Vključenih vtičnikov

- `@pantoken/plugin-simple-icons` — brand ikone iz simple-icons, registrirane kot ikončni tokeni.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikone, registrirane kot `--instui-icon-*` image tokeni.
- `@pantoken/plugin-logos` — Instructure produktne logotipe kot SVG-e, data URI-je in `--instui-logo-*`
  image tokeni.
- `@pantoken/plugin-prune-custom-props` — PostCSS vtičnik (ne pantoken vtičnik), ki odstrani
  neuporabljena custom properties iz stila.
- `@pantoken/plugin-custom-theme-colors` — prebranda stran z nastavitvijo enega atributa
  (`data-pantoken-color`) na eno od 13 palet, ali na `custom` za poljuben brand hex. Oglejte si
  [Barve teme](#theme-colors).

Lucide Lab register se lahko naloži leno, nato pa posreduje sinhronemu token hooku:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nekatere stvari, ki so bile prej vtičniki, zdaj dobavljajo v `@pantoken/components`, saj jih toliko komponent potrebuje,
takoj iz škatle: elevacijski senci (`--instui-elevation-*`, v `components.css`), fokus-obroba
ring (v `base.css` — vsaka fokusabilna dobi to, ko pantoken upravlja stran), in Instructure brand
pisave (Atkinson Hyperlegible Next: `base.css` uporablja `--instui-font-family-base`; opcijski
`@pantoken/components/fonts.css` naloži `@font-face` woff2 datoteke).

## Barve teme

`@pantoken/plugin-custom-theme-colors` odda en `[data-pantoken-color="…"]` blok na paleto
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Vsak blok usmeri brand primitivne vrednosti (`--instui-primitive-color-navy-*` in `-blue-*`)
na izbrano paleto. Prav tako ponovno izpelje brand površine, ki jih je upstream sploščil v literalne hexe,
ohranja njihovo vloženo alfa vrednost preko `color-mix()`. Semantične statusne barve, eksplicitni modri poudarki in
elevacijske sence ostanejo nespremenjeni. Preizkusite v
[temiranju na osnovi vzorcev (swatch)](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Po meri izbrana brand barva

Nastavite `data-pantoken-color="custom"` za rebrand iz poljubnega hexa, na primer primarne barve, ki jo skrbnik Canvas vpiše
v Theme Editor. pantoken iz tega izvede celoten 10–200 `--instui-primitive-color-custom-*`
skalni razpon:

1. **Referenčna krivulja.** Ciljna svetlost za vsak korak je povprečna OKLCH svetlost 13
   palet pri tem koraku, s 0 fiksirano na belo in 210 na črno. Tako razmik po meri ustreza razmiku v priloženih paletah.
2. **Sidro.** Vhod pristane na koraku, katerega ciljna svetlost je najbližja njegovi lastni, nato se pritrdi na
   točno to svetlost. `#cccccc` postane `custom-40` pri `#c9c9c9`: blizu vhoda, a ne
   vedno identična. "Najbližje" pomeni najbližji korak na krivulji, ne najbližjo obstoječo barvo palete.
3. **Izpolnitev.** Vsak drugi korak ohrani vhodov odtenek (hue). Njegova saturacija sledi povprečni
   saturacijski krivulji palet glede na sidro, in se zmanjša le tam, kjer barva pade izven sRGB.

Sprejemljiva sta le `#rgb` in `#rrggbb`; karkoli drugega vrže `TypeError`, zato hex iz obrazca
ne more injicirati CSS.

Med gradnjo oddajte celotno pravilo z že deklariranimi izpeljanimi primitivnimi vrednostmi:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Za izbiro barve ob izvajanju brez dostave kompleta tokenov, predizračunajte krivuljo in remap
pravilo med gradnjo. Nato uporabite odvisnosti-brezplačen `/scale` v brskalniku in nastavite le 20
izpeljanih primitivov:

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

Picker teme na dokumentacijskem spletnem mestu, Canvas Theme Editor in demo zgoraj delujejo na ta način.

Oglejte si [API referenco](/api/) za izvoze posameznega vtičnika.
