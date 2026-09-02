[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funksjon: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametere

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returnerer

`Promise`\<`string`\>

## Eksempel

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
