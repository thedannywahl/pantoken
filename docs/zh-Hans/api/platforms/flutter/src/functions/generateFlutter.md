[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# 函数: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## 参数

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## 返回值

`Promise`\<`string`\>

## 示例

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
