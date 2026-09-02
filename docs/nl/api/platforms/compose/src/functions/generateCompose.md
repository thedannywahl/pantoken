[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Functie: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parameters

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Retourneert

`Promise`\<`string`\>

## Voorbeeld

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
