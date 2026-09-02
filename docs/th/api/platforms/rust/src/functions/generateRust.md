[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# ฟังก์ชัน: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## พารามิเตอร์

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
