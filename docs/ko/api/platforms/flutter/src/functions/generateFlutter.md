[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# 함수: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## 매개변수

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## 반환값

`Promise`\<`string`\>

## 예제

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
