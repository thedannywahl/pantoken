[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Função: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Parâmetros

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Retorna

`string`

## Exemplo

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
