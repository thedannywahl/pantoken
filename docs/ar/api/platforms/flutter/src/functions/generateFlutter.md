[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# دالة: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

يصدر Flutter Dart لسمة مسمّاة. يعيد مسار الملف المكتوب.

## المعلمات

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## القيم المرجعة

`Promise`\<`string`\>

## مثال

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
