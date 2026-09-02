[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Συνάρτηση: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Παράμετροι

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Επιστρέφει

`Promise`\<`string`\>

## Παράδειγμα

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
