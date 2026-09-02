[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Ֆունկցիա: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտանետել Flutter Dart անվանված թեմայի համար: Վերադարձնում է գրված ֆայլի ճանապարհ:

## Պարամետրեր

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`\>

## Օրինակ

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
