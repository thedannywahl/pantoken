[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fungsi: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parameter

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Mengembalikan

`Promise`\<`string`\>

## Contoh

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
