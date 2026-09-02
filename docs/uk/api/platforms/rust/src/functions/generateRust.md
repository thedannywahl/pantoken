[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Функція: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Параметри

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Повертає

`string`

## Приклад

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
