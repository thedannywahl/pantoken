[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funzione: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametri

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Restituisce

`Promise`\<`string`\>

## Esempio

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
