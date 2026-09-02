[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Functie: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parameters

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Retourneert

`string`

## Voorbeeld

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
