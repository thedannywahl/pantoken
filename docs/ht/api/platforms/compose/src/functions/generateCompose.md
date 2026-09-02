[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fonksyon: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Paramèt

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Retounen

`Promise`\<`string`\>

## Egzanp

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
