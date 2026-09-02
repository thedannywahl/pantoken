[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funció: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet la superposició CSS fina en temps d'execució: tema les classes compilades de Foundation amb `var(--instui-*)`.

## Paràmetres

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Retorna

`string`

La cadena CSS de superposició.

## Exemple

**Abast de la superposició a un contenidor**

```ts
toFoundationCss({ scope: ".instui" });
```
