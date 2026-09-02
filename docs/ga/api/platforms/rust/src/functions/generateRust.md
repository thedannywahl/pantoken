[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Feidhm: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Paraiméadair

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Tuairisceáin

`string`

## Sampla

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
