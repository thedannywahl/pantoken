[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fall: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Færibreytur

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Skilar

`Promise`\<`string`\>

## Dæmi

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
