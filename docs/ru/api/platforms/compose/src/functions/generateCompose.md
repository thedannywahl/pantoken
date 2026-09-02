[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / generateCompose

# Функция: generateCompose()

> **generateCompose**(`options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit Compose Kotlin for a named theme. Returns the written file path.

## Параметры

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Возвращаемое значение

`Promise`\<`string`\>

## Пример

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
```
