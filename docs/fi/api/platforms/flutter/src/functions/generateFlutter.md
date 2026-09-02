[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funktio: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parametrit

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Palauttaa

`Promise`\<`string`\>

## Esimerkki

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
