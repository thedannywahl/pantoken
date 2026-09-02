[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# 函式: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## 參數

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## 回傳

`string`

## 範例

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
