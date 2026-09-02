[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# ฟังก์ชัน: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.

## พารามิเตอร์

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## คืนค่า

`string`

The overlay CSS string.

## ตัวอย่าง

**Scope the overlay to a container**

```ts
toFoundationCss({ scope: ".instui" });
```
