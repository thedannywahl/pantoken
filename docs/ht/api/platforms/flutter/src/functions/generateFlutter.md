[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fonksyon: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Paramèt

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retounen

`Promise`\<`string`\>

## Egzanp

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
