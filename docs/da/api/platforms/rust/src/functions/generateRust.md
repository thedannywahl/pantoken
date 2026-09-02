[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Funktion: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udled Rust-konstanter til et navngivet tema (ved hjælp af det medfølgende `@pantoken/tokens` IR).

## Parametre

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Returnerer

`string`

## Eksempel

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
