[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# ฟังก์ชัน: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The **experimental** customizable-select enhancement for `.&lt;prefix&gt;-simple-select`. Everything is
gated behind `@supports (appearance: base-select)` (the CSS Customizable Select model — Chrome 135+,
NOT yet Baseline), so it's pure progressive enhancement: browsers without support keep the plain
`simpleSelectCss` control; supporting browsers get a styled `::picker(select)` panel and styled
`option`s (hover/selected) from the `--instui-component-options-item-*` tokens. Shipped as its own
opt-in `select.css` (like `fonts.css`) rather than folded into `components.css`, precisely because the
feature is experimental — you opt in deliberately.

```demo
self:simple-select
```

## พารามิเตอร์

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## คืนค่า

`string`

The CSS string.

## ตัวอย่าง

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```
