[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Mahi: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## Ngā Tawhā

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Whakahokia

`string`

The overlay CSS string.

## Tauira

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
