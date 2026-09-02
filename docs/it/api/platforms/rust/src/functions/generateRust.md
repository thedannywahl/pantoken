[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funzione: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametri

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Restituisce

`string`

## Esempio

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
