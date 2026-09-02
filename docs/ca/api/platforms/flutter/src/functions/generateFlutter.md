[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funció: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet Flutter Dart per a un tema anomenat. Retorna la ruta del fitxer escrit.

## Paràmetres

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retorna

`Promise`\<`string`\>

## Exemple

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
