[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Function: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre constants de Rust per a un tema anomenat (utilitzant el `@pantoken/tokens` IR venut).

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
