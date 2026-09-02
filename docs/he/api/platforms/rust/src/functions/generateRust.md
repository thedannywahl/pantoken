[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# פונקציה: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit Rust constants for a named theme (using the vendored `@pantoken/tokens` IR).

## פרמטרים

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## מחזיר

`string`

## דוגמה

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
