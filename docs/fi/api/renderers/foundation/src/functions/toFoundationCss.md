[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Funktio: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Parametrit

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Palauttaa

`string`

The overlay CSS string.

## Esimerkki

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
