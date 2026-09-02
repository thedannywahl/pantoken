[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Fonksiyon: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Parametreler

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Döndürür

`Promise`\<`string`\>

## Örnek

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
