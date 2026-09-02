[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Hàm: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Tham số

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Trả về

`Promise`\<`string`\>

## Ví dụ

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
