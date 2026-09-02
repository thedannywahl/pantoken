[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Συνάρτηση: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Παράμετροι

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
