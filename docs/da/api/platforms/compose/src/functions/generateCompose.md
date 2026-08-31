[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Function: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend Compose Kotlin til et navngivet tema. Returnerer den skrevne filsti.

## Parameters

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Returns

`Promise`\<`string`\>

## Example

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
