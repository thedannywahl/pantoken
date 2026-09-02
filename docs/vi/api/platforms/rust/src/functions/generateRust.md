[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Hàm: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Tham số

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Trả về

`string`

## Ví dụ

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
