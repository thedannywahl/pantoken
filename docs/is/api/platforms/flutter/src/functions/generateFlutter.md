[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fall: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Færibreytur

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Skilar

`Promise`\<`string`\>

## Dæmi

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
