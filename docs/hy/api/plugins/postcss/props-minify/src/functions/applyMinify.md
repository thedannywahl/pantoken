[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# Ֆունկցիա: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կիրառել հատուկ-հատկության մինիֆիկացման փոխակերպումները թերթի տողի վրա:

Կառուցում է PostCSS պլագինի զանգված `options`-ից և այն գործարկում համաժամանակ: Պլագինի հերթականություն:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`: Վերադարձնում է մուտքը անփոփոխ, երբ
հաստատված են ոչ մի ընտրանքներ:

## Պարամետրեր

### css

`string`

Փոխակերպել թերթի տողը:

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## Վերադարձվող արժեք

`string`

Փոխակերպված CSS տողը:

## Օրինակ

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
