[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# Funktion: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg token-drevne utility-klasser: én klasse pr. token, anvend det på dets naturlige CSS-egenskab. Token'ets `--instui-` hale er klassenavn, så `--instui-font-weight-body-strong` under egenskab
`font-weight` giver
`.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. Brug det til
hver "en token → en egenskab" familie (font-family/weight, line-height, border-radius, border-width,
opacity, box-shadow). Farve og spacing beholder deres egne builders — et token kortlægges til adskillige
egenskaber der. Transmit token-navnene pr. egenskab (f.eks. filtreret fra `@pantoken/tokens`).

```demo
self:token-utilities
```

## Parametre

### groups

readonly [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

en [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) pr. CSS-egenskab.

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Returnerer

`string`

CSS-strengen.
