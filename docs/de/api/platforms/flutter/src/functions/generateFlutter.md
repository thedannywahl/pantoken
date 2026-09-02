[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funktion: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parameter

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Rückgabe

`Promise`\<`string`\>

## Beispiel

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
