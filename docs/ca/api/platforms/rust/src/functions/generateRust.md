[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funció: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emetre constants de Rust per a un tema anomenat (utilitzant el `@pantoken/tokens` IR venut).

## Paràmetres

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Retorna

`string`

## Exemple

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
