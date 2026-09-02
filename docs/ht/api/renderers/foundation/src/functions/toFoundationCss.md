[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fonksyon: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Paramèt

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Retounen

`string`

The overlay CSS string.

## Egzanp

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
