[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# ฟังก์ชัน: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Build the Pendo guide stylesheet.

## พารามิเตอร์

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## คืนค่า

`string`

The composed CSS.

## ตัวอย่าง

**Default rebrand build (scoped, !important, pruned)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**Canvas theme, unscoped, keep the full token set**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```
