[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Функція: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Параметри

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Повертає

`Promise`\<`string`\>

## Приклад

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
