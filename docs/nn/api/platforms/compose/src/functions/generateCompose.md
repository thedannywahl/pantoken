[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funksjon: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametrar

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Returnerer

`Promise`\<`string`\>

## Døme

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
