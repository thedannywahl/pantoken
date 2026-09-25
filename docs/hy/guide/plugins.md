# Սեղմումներ (Plugins)

pantoken պլագինը երկարացնում է token-ը կամ CSS ելքը առանց փաթեթը ֆինանսավորելու։ Դու դրա համար կառուցում ես `definePlugin`-ը `@pantoken/plugin-kit`-ից, այնուհետև փոխանցում `buildTokens`-ին կամ `toCss`-ին։

## Պլագին հեղինակել

Տալ `definePlugin` այն hooks-երը, որոնք կատարվում են։ Այն վերադարձնում է սովորական պլագին, նշանագրված capability-ներով, որոնք ենթադրվում են այդ hooks-երից։ Պլագին կարող է երկարացնել IR-ը (`tokens`, `icons`), CSS ելքը (`css`), կամ երկուսն էլ։

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Սահմանված կարողությունների գրանցում

`buildTokens`-ն և `toCss`-ը աշխատացնում են `checkPlugins`-ը փոխանցված պլագինների վրա։ Այն զգուշացնում է — երբեք չի քշում — երբ պլագինն այդ փուլում գրանցվելու համար համապատասխան hook- չունի, այնպես որ token-միայն պլագին, որը փոխանցվել է `toCss`-ին, չի իրականացվի լռությամբ, այլ՝ նշումով կդարձվի:");

## Պլագիններ կոմպոզիցիա

Աշխատացնելու համար մեկ պլագինի վրա `extendPlugin`-ը, կամ միացնել ութերը `mergePlugin`-ով։

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Նույն փուլի hooks-երը կոմպոզացվում են՝ `tokens`-ը կատարում է բազայինը, հետո հավելումը, `css`-ը մերճում է երկու ներդրումները, և `icons`-ը աշխատացնում է երկուսն էլ։

## Ստուգել պլագինի ելքը

Կատարիր այս ընդհանուր drift ստուգումները `@pantoken/utils`-ից՝ պլագինի սեփական թեստում, որպեսզի տիպոգրաֆիան կամ անունով վերանվանված token-ը արագ և տեղայնորեն ձախողվի։

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Պարունակված պլագինները

- `@pantoken/plugin-simple-icons` — simple-icons-ից բրենդ-պատկերակներ, գրանցված որպես icon tokens։
- `@pantoken/plugin-lucide-lab` — Lucide Lab պատկերներ, գրանցված որպես `--instui-icon-*` image tokens։
- `@pantoken/plugin-logos` — Instructure արտադրանքի լոգոնները որպես SVG-եր, data URI-ներ և `--instui-logo-*` image tokens։
- `@pantoken/plugin-prune-custom-props` — PostCSS պլագին (ոչ pantoken պլագին), որը հեռացնում է չկիրառվող custom properties-ը stylesheet-ից։
- `@pantoken/plugin-custom-theme-colors` — վերաբրենդավորում է էջը՝ մեկ attribute (`data-pantoken-color`) կարգելով այն 13 palette-ներից մեկի կամ `custom`-ի համար ցանկացած բրենդ hex-ի։ Տես [Թեմայի գույները](#theme-colors)։

Lucide Lab-ի registry-ն կարելի է լազիրվել բեռնել, ապա փոխանցել synchronous token hook-ին։

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Որոշ բաներ, որոնք նախկինում եղել են պլագիններ, հիմա դառնում են մաս `@pantoken/components`-ի, քանի որ շատ կոմպոնենտներ դրանք պահանջում են ըստ տուփից. բարձրության ստվերներ (`--instui-elevation-*`, `components.css`-ում), focus-outline օղակը (`base.css`-ում — յուրաքանչյուր ֆոկուսացվող ստանում է այն, երբ pantoken-ը Վերահսկում է էջը), և Instructure բրենդի տառատեսակները (Atkinson Hyperlegible Next: `base.css` կիրառվում է `--instui-font-family-base`-ը; օպտ-ին `@pantoken/components/fonts.css` բեռնում է `@font-face` woff2-երը)։

## Թեմայի գույները

`@pantoken/plugin-custom-theme-colors`-ը յուրաքանչյուր palette-ի համար արտածում է մեկ `[data-pantoken-color="…"]` բլոկ
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`)։ Յուրաքանչյուր բլոկը ուղղված է բրենդի primitives-ներին (`--instui-primitive-color-navy-*` և `-blue-*`) ընտրված palette-ի վրա։ Այն նույնպես վերա-հաշվում է բրենդի մակերեսները, որոնք upstream-ը ենթարկեց հաստատուն hex-երի, պահելով դրանց baked alpha-ն `color-mix()`-ի միջոցով։ Semantic status գույները, հստակ կապույտ ակցենտները և բարձրության ստվերները չեն փոխվում։ Փորձիր դա [swatch-ապահովված theming demo]-ում (https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)։

```html
<html data-pantoken-color="sea"></html>
```

### Ցանկացած բրենդի գույն

Կարգիր `data-pantoken-color="custom"`՝ վերաբարենդավորելու համար ցանկացած hex-ից, օրինակ այն primary գույնը, որը Canvas ադմինը գրում է Theme Editor-ում։ pantoken-ը ածանցում է ամբողջ 10–200 `--instui-primitive-color-custom-*` սանդղակը նրանից՝

1. **Հղման կոր.** Յուրաքանչյուր քայլի նպատակ lightness-ը միջին OKLCH lightness-ն է 13 palette-ների այդ քայլում, որտեղ 0-ը գրեթե սպիտակն է և 210-ը՝ սև։ Այսպիսով, custom սանդղակի տարածումը համընկնում է առաքված palette-ների հետ։
2. **Աղեղ.** Մուտքը տեղադրվում է այն քայլում, որի նպատակ lightness-ը մոտն է իր սեփականին, ապա նետվում է այդ նույն lightness-ի։ `#cccccc` դառնում է `custom-40` `#c9c9c9`-ում՝ մոտին մուտքին, բայց ոչ միշտ նույնը։ «Մոտ» նշանակում է մոտիկ քայլը կորի վրա, ոչ թե ամենամոտ գոյական palette գույնը։
3. **Լրացնել.** Ամեն այլ քայլ պահում է մուտքի hue-ը։ Նրա սատուրացիան հետևում է palette-ների միջին սատուրացիայի կորին anchor-ի համեմատ և միայն նվազեցվում է այնտեղ, որտեղ գույնը դուրս է sRGB-ի սահմաններից։

Ընդունվում են միայն `#rgb` և `#rrggbb`; ցանկացած այլ բան նետում է `TypeError`-ը, այնպես որ ֆորմից ստացված hex-ը չի կարող CSS ինջեկտ անել։

Համակարգման ժամանակ արտածիր ամբողջ կանոնը նախապես հաշվարկված derived primitives-ներով։

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Որպեսզի ընտրել runtime-ում գույնը առանց token սետը ուղարկել, նախահաշվիր կորը և remap կանոնները build ժամանակ։ Այնուհետև օգտագործիր dependency-free `/scale` մուտքը բրաուզերում և սահմանիր միայն 20 derived primitives-ները։

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

Docs կայքի theme picker-ը, Canvas theme editor-ը և վերևի demo-ն բոլորը աշխատում են այս եղանակով։

Տես [API reference](/api/) յուրաքանչյուր պլագինի exports-ների համար։
