[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funkcija: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametri

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Vrne

`string`

## Primer

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
