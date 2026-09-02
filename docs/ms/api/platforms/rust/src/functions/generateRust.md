[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fungsi: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parameter

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Mengembalikan

`string`

## Contoh

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
