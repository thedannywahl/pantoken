[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Ֆունկցիա: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կառուցել իմաստային-գույն օգտական ձևանմուշ. `.&lt;prefix&gt;-bg-&lt;name&gt;` (ֆոն), `.&lt;prefix&gt;-text-&lt;name&gt;` (տեքստի գույն), `.&lt;prefix&gt;-border-&lt;name&gt;` (սահմանի գույն), մեկ իմաստային գույն նիշի համար: `.&lt;prefix&gt;-color-&lt;name&gt;`-ն արտազատվում է `.&lt;prefix&gt;-text-&lt;name&gt;`-ի հետ որպես նմանություն — նույն հայտարարություն, ցանկացած դասի անուն կաշխատի: Անցումային հետևաբար միայն նիշ-վերլուծական են — ոչ նախնական, ոչ կամայական hex: Փոխանցել նիշերի անունները ընտանիքներ (օր. `@pantoken/tokens`), կամ հստակ `[name, token]` զույգ անունից տարբեր նիշից ստացել ընտանիքի սեփական սանդղակից:

```demo
self:color-utilities
```

## Պարամետրեր

### names

[`ColorUtilityNames`](../interfaces/ColorUtilityNames.md)

[ColorUtilityNames](../interfaces/ColorUtilityNames.md).

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Վերադարձվող արժեք

`string`

CSS տողը։
