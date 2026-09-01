# Պլագիններ

pantoken պլագինը ընդլայնում է token կամ CSS ելքը՝ առանց փաթեթը ֆորք անելու: Այն կառուցում եք
`definePlugin`-ով `@pantoken/plugin-kit`-ից, հետո փոխանցում `buildTokens`-ին կամ `toCss`-ին:

## Պլագին հեղինակել

Տվեք `definePlugin` այն hooks-ները, որոնք իրականացնում եք: Այն վերադարձնում է սովորական պլագին, որը մարկավորվում է այն
կարողություններով, որոնք ստացվում են այդ hooks-ներից: Պլագինը կարող է ընդլայնել IR-ն (`tokens`, `icons`), CSS
ելքը (`css`) կամ երկուսը միաժամանակ:

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Կարողունակություն-խնայող գրանցում

`buildTokens`-ը և `toCss`-ը կատարում են `checkPlugins`-ը այն պլագինների վրա, որոնք փոխանցում եք: Այն զգուշացնում է — երբեք չգցում է բացառություն —
երբ պլագինը չունի համապատասխան hook այն փուլում, որտեղ գրանցվել է, այնպես որ միայն token-ների համար նախատեսված պլագինը, որը փոխանցվում է
`toCss`-ին, կգերազերծվի նշումով՝ ոչ թե լուռ ոչինչ չանելով:

## Պլագինների կոմպոզիցիա

Շարունակեք մյուս պլագինի վրա `extendPlugin`-ով, կամ միացրեք հավասարները `mergePlugin`-ով:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Մի փուլում գտնվող hooks-ները կոմպոզում են. `tokens`-ը իրականացնում է base-ը, ապա addition-ը, `css`-ը համախմբում է երկու
դիմացկունները, և `icons`-ը երկուսը էլ փորձում է:

## Պլագինի ելքի վավերացում

Ընթացքում միացրեք ընդհանուր drift ստուգումները `@pantoken/utils`-ից ձեր պլագինի սեփական ելքի վրա իր թեստում, որպեսզի
տառասխալը կամ վերանվանված token-ը անհետաձգելիորեն խախտվի տեղում:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Բունդլացված պլագինները

- `@pantoken/plugin-simple-icons` — նշանավորում է icons-ները simple-icons-ից, գրանցված որպես icon tokens:
- `@pantoken/plugin-logos` — Instructure արտադրանքի լոգոներ՝ որպես SVG-ներ, data URI-ներ և `--instui-logo-*`
  image tokens:
- `@pantoken/plugin-prune-custom-props` — PostCSS պլագին (ոչ pantoken պլագին), որը հեռացնում է
  չկիրառված custom properties-ը stylesheet-ից:

Մի քանի բան, որոնք նախկինում եղել են պլագիններ, հիմա ներմուծվում են `@pantoken/components`-ում, քանի որ շատ կոմպոնենտներ դրանք անհրաժեշտ են
դուրսի դեպքում՝ elevation ստվերներ (`--instui-elevation-*`, `components.css`-ում), focus-outline
ring (__`base.css`-ում — ամեն focusable էլ դա ստանում է, երբ pantoken ղեկավարվում է էջով), և Instructure-ի բրենդային
տառատեսակները (Atkinson Hyperlegible Next: `base.css` կիրառում է `--instui-font-family-base`; պարտադիր չլինող
`@pantoken/components/fonts.css` բեռնում է `@font-face` woff2-ները):

Տես [API reference](/api/) յուրաքանչյուր պլագինի экспорт-ների համար:
