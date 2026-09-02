[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# 関数: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## パラメーター

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## 戻り値

`string`

## 例

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
