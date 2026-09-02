[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# تابع: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## پارامترها

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## مقدار بازگشتی

`Promise`\<`string`\>

## نمونه

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
