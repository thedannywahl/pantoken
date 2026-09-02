[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funkcija: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametri

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Vrne

`Promise`\<`string`\>

## Primer

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
