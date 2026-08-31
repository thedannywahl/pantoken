[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# Function: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կիրառել հատուկ-հատկության մինիֆիկացման փոխակերպումները թերթի տողի վրա:

Կառուցում է PostCSS պլագինի զանգված `options`-ից և այն գործարկում համաժամանակ: Պլագինի հերթականություն:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`: Վերադարձնում է մուտքը անփոփոխ, երբ
հաստատված են ոչ մի ընտրանքներ:

## Parameters

### css

`string`

Փոխակերպել թերթի տողը:

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## Returns

`string`

Փոխակերպված CSS տողը:

## Example

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
