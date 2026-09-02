[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fonksiyon: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametreler

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Döndürür

`Promise`\<`string`\>

## Örnek

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
