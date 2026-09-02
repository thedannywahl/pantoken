[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fonction: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Paramètres

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Retourne

`string`

## Exemple

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
