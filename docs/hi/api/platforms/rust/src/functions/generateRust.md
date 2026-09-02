[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# फंक्शन: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## पैरामीटर

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## वापसी

`string`

## उदाहरण

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
