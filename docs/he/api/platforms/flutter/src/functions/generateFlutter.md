[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# פונקציה: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## פרמטרים

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## מחזיר

`Promise`\<`string`\>

## דוגמה

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
