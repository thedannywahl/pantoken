[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fušla: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametera

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Gullii / Gávdnat

`string`

The overlay CSS string.

## Exempel

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
