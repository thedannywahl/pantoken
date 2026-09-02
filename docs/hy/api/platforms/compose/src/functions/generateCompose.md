[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Ֆունկցիա: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արձակել Compose Kotlin անվանված թեմայի համար: Վերադարձնում է գրված ֆայլի ուղին:

## Պարամետրեր

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`\>

## Օրինակ

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
