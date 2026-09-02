[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# 函数: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## 参数

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## 返回值

`string`

## 示例

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
