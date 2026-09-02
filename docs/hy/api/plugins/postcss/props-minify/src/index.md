[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/plugin-props-minify` — կազմել pruneի, flatten-ի և mangle-ի փոխակերպումները
`--instui-*` հատուկ հատկությունների համար միայն [applyMinify](functions/applyMinify.md) հեռավորության միջոցով:

CSS-ը արտանետող յուրաքանչյուր pipeline (մեծ scripts, որսորդներ) օգտագործում է `applyMinify`-ը համահունչ
մինիֆիկացման մակերեսի համար առանց PostCSS-ի ուղղակի կախվածության ընդունելու:

**Prune + mangle-ը ապահով են միայն ինքն-կնքված փաթեթների համար**, որտեղ բոլոր `var(--instui-*)` հղումները
և դրանց սահմանումները ապրում են նույն արդյունքում: Առանձին ֆայլի սպառողների համար (`@pantoken/css` +
`@pantoken/components` բեռնված ինքնուրույն), կիրառել `{ flatten: true }`-ը միայն:

**Մանգլեր ֆայլային սահմաններ ընդհանրապես**: փոխանցեք նույն `Map` օրինակը որպես
`mangle.sharedManifest` `applyMinify`-ի յուրաքանչյուր կանչ, որը մշակում է միասին բեռնված CSS ֆայլերը:
Առաջինը մշակել մեկնիշի թերթը (այն սերմնում է ցուցակը), այնուհետև բաղադրիչի թերթերը:

## Օրինակներ

**Կիրառել բոլոր երեք փոխակերպումները ինքն-կնքված փաթեթի վրա**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**Միայն հարթեցնել (ապահով առանձին ֆայլի սպառողների համար)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**Մանգլեր երկու ֆայլերը նույն քարտեզով**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## Ինտերֆեյսներ

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## Տիպային հոմանիշներ

- [MangleMethod](type-aliases/MangleMethod.md)

## Փոփոխականներ

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## Ֆունկցիաներ

- [applyMinify](functions/applyMinify.md)
