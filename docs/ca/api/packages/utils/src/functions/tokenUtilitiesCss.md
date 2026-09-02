[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / tokenUtilitiesCss

# Funció: tokenUtilitiesCss()

> **tokenUtilitiesCss**(`groups`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix classes d'utilitat dirigides per tokens: una classe per token, aplicant-la a la seva propietat CSS natural. La cua `--instui-` del token és el nom de la classe, així que `--instui-font-weight-body-strong` sota la propietat
`font-weight` produeix
`.&lt;prefix&gt;-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. Utilitza-la per a
cada família "un token → una propietat" (font-family/weight, line-height, border-radius, border-width,
opacity, box-shadow). El color i l'espaiat mantenen els seus propis constructors — un token es mapeja a diverses
propietats allà. Passa els noms de tokens per propietat (p. ex. filtrats de `@pantoken/tokens`).

```demo
self:token-utilities
```

## Paràmetres

### groups

només lectura [`TokenUtilityGroup`](../interfaces/TokenUtilityGroup.md)[]

un [TokenUtilityGroup](../interfaces/TokenUtilityGroup.md) per propietat CSS.

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Retorna

`string`

La cadena CSS.
