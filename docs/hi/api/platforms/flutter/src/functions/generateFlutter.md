[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# फंक्शन: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## पैरामीटर

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## वापसी

`Promise`\<`string`\>

## उदाहरण

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
