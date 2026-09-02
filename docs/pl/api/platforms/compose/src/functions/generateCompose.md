[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Funkcja: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametry

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Zwraca

`Promise`\<`string`\>

## Przykład

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
