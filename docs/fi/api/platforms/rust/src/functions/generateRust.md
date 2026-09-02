[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funktio: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametrit

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Palauttaa

`string`

## Esimerkki

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
