[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# 関数: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## パラメーター

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## 戻り値

`string`

The overlay CSS string.

## 例

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
