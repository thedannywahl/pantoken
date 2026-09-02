[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funzione: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametri

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Restituisce

`string`

The overlay CSS string.

## Esempio

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
