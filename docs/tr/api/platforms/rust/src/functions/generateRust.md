[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Fonksiyon: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametreler

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Döndürür

`string`

## Örnek

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
