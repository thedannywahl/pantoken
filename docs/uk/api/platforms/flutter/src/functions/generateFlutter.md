[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Функція: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Параметри

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Повертає

`Promise`\<`string`\>

## Приклад

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
