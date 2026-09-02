[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# 함수: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## 매개변수

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## 반환값

`string`

## 예제

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
