[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Functie: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parameters

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Retourneert

`string`

The overlay CSS string.

## Voorbeeld

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
