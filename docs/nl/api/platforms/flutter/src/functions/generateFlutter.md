[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Functie: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parameters

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retourneert

`Promise`\<`string`\>

## Voorbeeld

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
