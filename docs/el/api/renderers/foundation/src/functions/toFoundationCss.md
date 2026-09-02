[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Συνάρτηση: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Παράμετροι

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Επιστρέφει

`string`

The overlay CSS string.

## Παράδειγμα

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
