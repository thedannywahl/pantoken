[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Function: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udled Rust-konstanter til et navngivet tema (ved hjælp af det medfølgende `@pantoken/tokens` IR).

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
