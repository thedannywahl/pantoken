[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# 函式: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## 參數

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## 回傳

`string`

The overlay CSS string.

## 範例

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
