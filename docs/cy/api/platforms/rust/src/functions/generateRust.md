[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Swyddogaeth: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Paramedrau

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Yn dychwelyd

`string`

## Enghraifft

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
