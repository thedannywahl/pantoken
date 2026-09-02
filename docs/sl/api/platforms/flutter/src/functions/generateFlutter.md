[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funkcija: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametri

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Vrne

`Promise`\<`string`\>

## Primer

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
