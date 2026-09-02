[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# 函式: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## 參數

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## 回傳

`Promise`\<`string`\>

## 範例

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
