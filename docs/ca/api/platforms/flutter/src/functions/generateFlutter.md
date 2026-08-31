[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Function: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet Flutter Dart per a un tema anomenat. Retorna la ruta del fitxer escrit.

## Parameters

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returns

`Promise`\<`string`\>

## Example

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
