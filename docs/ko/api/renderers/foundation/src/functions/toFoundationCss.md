[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# 함수: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## 매개변수

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## 반환값

`string`

The overlay CSS string.

## 예제

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
