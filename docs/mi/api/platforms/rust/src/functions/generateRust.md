[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Mahi: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Ngā Tawhā

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Whakahokia

`string`

## Tauira

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
