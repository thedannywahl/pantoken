[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funzione: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametri

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Restituisce

`Promise`\<`string`\>

## Esempio

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
