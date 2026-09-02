[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fonksyon: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Paramèt

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Retounen

`string`

## Egzanp

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
