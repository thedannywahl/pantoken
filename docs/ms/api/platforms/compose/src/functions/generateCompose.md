[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fungsi: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parameter

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Mengembalikan

`Promise`\<`string`\>

## Contoh

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
