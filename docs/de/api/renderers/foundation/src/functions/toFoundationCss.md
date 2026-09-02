[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funktion: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parameter

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Rückgabe

`string`

The overlay CSS string.

## Beispiel

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
