# Պլագիններ

pantoken պլագինը ընդլայնում է տոկենի կամ CSS-ի արտահանումը առանց փաթեթը ֆորկ անելու։ Պլագին ստեղծվում է `definePlugin`-ով `@pantoken/plugin-kit`-ից, այնուհետև փոխանցվում է `buildTokens`-ին կամ `toCss`-ին։

## Ստեղծել պլագին

Տվեք `definePlugin`-ին այն հուկերը, որոնք իրականացնեք։ Այն վերադարձնում է սովորական պլագին, որը բրենդավորված է այդ հուկերից ենթադրված կարողություններով։ Պլագինը կարող է ընդլայնել IR-ը (`tokens`, `icons`), CSS-ի արտահանումը (`css`), կամ երկուսն էլ։

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Կարողունակությունների գիտակցող գրանցում

`buildTokens`-ն և `toCss`-ն চালում են `checkPlugins` այն պլագինների վրա, որոնք դուք փոխանցում եք։ Դա զգուշացնում է — երբեք չի նետում բացառություն — երբ պլագինի համար չկան համապատասխան հուկեր այն փուլին, որի համար դա գրանցված է, այնպես որ միայն տոկեն-պլագինը, որը փոխանցվել է `toCss`-ին, կբացառվի նշմամբ փոխարենը լռելյայն ոչ մի բան չարելու։

## Շարադրել (Compose) պլագիններ

Շարադրման համար օգտագործեք `extendPlugin`, կամ միացրեք համամասնակից պլագիններ `mergePlugin`-ով՝

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Սակայն նույն փուլի հուկերը համակցվում են՝ `tokens`-ը շարունակում է հիմքը, այնուհետև ավելացվածը, `css`-ը միաձուլում է երկու նպաստները, և `icons`-ը չգրանցված` երկուսն էլ է աշխատացնում։

## Վավերացնել ձեր պլագինի ելքը

Շարադրված drift-չեքերը աշխատեցրեք `@pantoken/utils`-ից ձեր պլագինի սեփական ելքի վրա նրա թեստում, որպեսզի տառասխալը կամ տոկենի անվան փոխումը արագ և տեղայնորեն ձախողվի։

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Փաթեթավորված պլագինները

- `@pantoken/plugin-simple-icons` — simple-icons-ից բրենդային նշաններ, գրանցված որպես icon tokens։
- `@pantoken/plugin-lucide-lab` — Lucide Lab նշաններ, գրանցված որպես `--instui-icon-*` image tokens։
- `@pantoken/plugin-logos` — Instructure արտադրանքի լոգոներ՝ որպես SVG-ներ, data URI-ներ և `--instui-logo-*` image tokens։
- `@pantoken/plugin-prune-custom-props` — PostCSS պլագին (ոչ pantoken պլագին), որը հանում է չկիրառվող custom properties-ը դրոշմագրությունից։

Lucide Lab-ի ռեգիստրի կարելի է լազիորեն բեռնել, ապա փոխանցել սինխրոն տոկեն հукуին։

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Քանի-որ շատ կոմպոնենտներ պահանջում են դրանք տիարից դուրս, մի քանիսը, որոնք նախկինում եղել են պլագիններ, այժմ առաքվում են `@pantoken/components`-ով՝ ներառյալ elevation ստվերներն (`--instui-elevation-*`, `components.css`), ֆոկուսի շրջապատման օղակը (focus-outline՝ `base.css`-ում — յուրաքանչյուր ֆոկուսվողը այն ստանում է, երբ pantoken-ն է էջի տերը), և Instructure բրենդային шрифտերը (Atkinson Hyperlegible Next։ `base.css` կիրառում է `--instui-font-family-base`; ոչ պարտադիր `@pantoken/components/fonts.css` բեռնում է `@font-face` woff2-երը)։

Յուրաքանչյուր պլագինի արտահանումները տես [API reference](/api/) էջում։
