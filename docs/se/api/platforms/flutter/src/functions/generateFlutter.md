[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fušla: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametera

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Gullii / Gávdnat

`Promise`\<`string`\>

## Exempel

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
