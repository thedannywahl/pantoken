[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# ฟังก์ชัน: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## พารามิเตอร์

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## คืนค่า

`Promise`\<`string`\>

## ตัวอย่าง

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
