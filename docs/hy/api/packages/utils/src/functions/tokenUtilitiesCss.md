[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# Function: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցել թոքեն-վարվածական կիրառական դասեր`մեկ դաս մեկ թոքենի համար, այն կիրառելով դրա բնական CSS հատկության վրա: Թոքենի`--instui-`պոչն է դասի անունը, ուստի`--instui-font-weight-body-strong` `font-weight`հատկության վերլուծում տալիս է`.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`: Օգտագործել այն յուրաքանչյուր "մեկ թոքեն → մեկ հատկություն" ընտանիքի համար (font-family/weight, line-height, border-radius, border-width, opacity, box-shadow): Գույն և հեռավորություն պահպանում են իրենց սեփական կառուցողներ` մեկ թոքեն քարտեզ է մի քանի հատկությունների համար: Փոխանցել թոքենային անունները հատկության համար (օր. ֆիլտրված `@pantoken/tokens`-ից):

```demo
self:token-utilities
```

## Parameters

### groups

readonly [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

մեկ [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) CSS հատկության համար:

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returns

`string`

CSS տողը։
