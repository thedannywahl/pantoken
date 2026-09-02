[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fušla: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametera

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Gullii / Gávdnat

`Promise`\<`string`\>

## Exempel

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
