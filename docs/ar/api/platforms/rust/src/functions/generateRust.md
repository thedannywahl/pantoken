[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / generateRust

# دالة: generateRust()

> **generateRust**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تصدير ثوابت Rust لموضوع مسمّى (باستخدام IR المورّدة `@pantoken/tokens`).

## المعلمات

### options?

[`RustOptions`](../interfaces/RustOptions.md) & `object` = `{}`

## القيم المرجعة

`string`

## مثال

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```
