[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Swyddogaeth: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Paramedrau

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Yn dychwelyd

`string`

The overlay CSS string.

## Enghraifft

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
