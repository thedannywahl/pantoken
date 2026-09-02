[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Función: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parámetros

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Devuelve

`string`

## Ejemplo

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
