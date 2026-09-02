[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funkcija: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametri

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Vrne

`string`

The overlay CSS string.

## Primer

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
