[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Функция: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Параметры

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Возвращаемое значение

`Promise`\<`string`\>

## Пример

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
