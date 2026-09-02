[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fall: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Færibreytur

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Skilar

`string`

## Dæmi

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
