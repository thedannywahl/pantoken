[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Función: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parámetros

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Devuelve

`Promise`\<`string`\>

## Ejemplo

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
