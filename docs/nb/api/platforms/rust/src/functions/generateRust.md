[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funksjon: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametere

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Returnerer

`string`

## Eksempel

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
