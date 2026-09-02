[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# 関数: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## パラメーター

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## 戻り値

`Promise`\<`string`\>

## 例

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
