[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# 函数: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## 参数

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## 返回值

`string`

The overlay CSS string.

## 示例

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
