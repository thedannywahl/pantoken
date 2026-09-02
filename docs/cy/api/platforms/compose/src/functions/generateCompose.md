[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Swyddogaeth: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Paramedrau

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Yn dychwelyd

`Promise`\<`string`\>

## Enghraifft

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
