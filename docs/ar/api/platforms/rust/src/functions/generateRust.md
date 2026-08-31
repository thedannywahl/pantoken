[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Function: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

انبعاث ثوابت Rust لموضوع مسمى (باستخدام `@pantoken/tokens` IR المُتاح بالمصدر).

## Parameters

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Returns

`string`

## Example

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
