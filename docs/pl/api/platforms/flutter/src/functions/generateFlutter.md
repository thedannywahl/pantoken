[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funkcja: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametry

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Zwraca

`Promise`\<`string`\>

## Przykład

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
