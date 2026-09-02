[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funkcja: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametry

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Zwraca

`string`

## Przykład

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
