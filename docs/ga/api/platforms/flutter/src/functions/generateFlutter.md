[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Feidhm: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Paraiméadair

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Tuairisceáin

`Promise`\<`string`\>

## Sampla

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
