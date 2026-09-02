[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fall: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Færibreytur

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Skilar

`string`

The overlay CSS string.

## Dæmi

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
