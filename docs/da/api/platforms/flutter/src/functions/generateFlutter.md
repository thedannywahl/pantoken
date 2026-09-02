[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Funktion: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Flutter Dart til et navngivet tema. Returnerer den skrevne filsti.

## Parametre

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returnerer

`Promise`\<`string`\>

## Eksempel

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
