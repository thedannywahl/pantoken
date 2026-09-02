[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Fonction: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Paramètres

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Retourne

`string`

The overlay CSS string.

## Exemple

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
