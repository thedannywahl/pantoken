[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# تابع: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## پارامترها

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
