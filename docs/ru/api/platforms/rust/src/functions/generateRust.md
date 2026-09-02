[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# Функция: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## Параметры

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## Возвращаемое значение

`string`

## Пример

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
