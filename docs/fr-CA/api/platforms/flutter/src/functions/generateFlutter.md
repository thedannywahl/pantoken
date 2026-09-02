[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Fonction: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Paramètres

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retourne

`Promise`\<`string`\>

## Exemple

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
