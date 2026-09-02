[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# ฟังก์ชัน: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Create a pantoken plugin that emits layout composition rules.

## พารามิเตอร์

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## คืนค่า

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## ตัวอย่าง

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
