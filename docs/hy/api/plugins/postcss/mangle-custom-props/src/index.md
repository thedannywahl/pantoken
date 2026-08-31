[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-mangle-custom-props` — վերանվանել երկար հատուկ հատկության անունները նվազագույն հաջորդական
հայտացուցակներին:

Տոկեն անունները, ինչպես `--instui-component-alert-border-top-style`, մարդ-ընթեռնելի են, բայց թանկ
կրճատված փաթեթներում: Անունն ինքնին 40+ բայտ է, կրկնվում է սահմանման մեջ, յուրաքանչյուր `var()` զանգ,
և յուրաքանչյուր `@property` գրանցում: Այս խմբակը փոխարինում է յուրաքանչյուր համապատասխան անունը — սահմանումների միջով,
`var()` հղումներ, և `@property` պարամետրեր — նվազագույն հայտացուցակով (`--a`, `--b`, …, `--aa`,
…), կտրելով անունի վճարը ~90%-ով:

Անունները հավաքվում են ամբողջ стилsheet-ից, այբբենական կարգով դասավորվում են կայուն քարտեզագրման համար, այնուհետև հաջորդաբար նշանակվում են: [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) տարբերակը թույլ է տալիս մի քանի առանձին PostCSS անցումներ մեկ հետևողական քարտեզ կիսել, այնպես որ առանձին մշակված CSS ֆայլերը, որոնք միասին կբեռնվեն, կարող են ապահով կերպով մանգլեր անվանել նույն անուններով:

## Example

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## Interfaces

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## Type Aliases

- [MangleMethod](type-aliases/MangleMethod.md)

## Variables

- [mangleCustomProps](variables/mangleCustomProps.md)
