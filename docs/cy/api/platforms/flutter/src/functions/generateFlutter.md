[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Swyddogaeth: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Paramedrau

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Yn dychwelyd

`Promise`\<`string`\>

## Enghraifft

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
