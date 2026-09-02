[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Feidhm: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Paraiméadair

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Tuairisceáin

`string`

The overlay CSS string.

## Sampla

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
