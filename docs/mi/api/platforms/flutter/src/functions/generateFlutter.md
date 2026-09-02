[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Mahi: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Ngā Tawhā

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Whakahokia

`Promise`\<`string`\>

## Tauira

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
