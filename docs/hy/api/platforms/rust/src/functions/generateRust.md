[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Ֆունկցիա: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտանետել Rust հաստատունները անվանված թեմայի համար (օգտագործելով վաճառականացված `@pantoken/tokens` IR):

## Պարամետրեր

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
