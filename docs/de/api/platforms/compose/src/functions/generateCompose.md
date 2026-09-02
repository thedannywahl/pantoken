[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funktion: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parameter

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Rückgabe

`Promise`\<`string`\>

## Beispiel

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
