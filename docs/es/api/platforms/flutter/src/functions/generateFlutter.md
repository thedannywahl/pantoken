[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Función: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parámetros

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Devuelve

`Promise`\<`string`\>

## Ejemplo

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
