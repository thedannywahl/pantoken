[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funktion: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametrar

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returnerar

`Promise`\<`string`\>

## Exempel

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
