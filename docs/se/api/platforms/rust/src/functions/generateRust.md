[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fušla: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametera

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
