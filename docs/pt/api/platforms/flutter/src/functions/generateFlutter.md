[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / generateFlutter

# Função: generateFlutter()

> **generateFlutter**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Flutter Dart for a named theme. Returns the written file path.

## Parâmetros

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retorna

`Promise`\<`string`\>

## Exemplo

```ts
import { generateFlutter } from "@pantoken/flutter";

const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
```
